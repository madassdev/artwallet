<?php

namespace App\Http\Controllers\Inertia;

use App\Events\OrderFailed;
use App\Events\OrderSuccess;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Plan;
use App\Services\MobileAirtimeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class OrderController extends Controller
{

    public function buyAirtime(Request $request)
    {
        $type = "airtime";
        $charges = 0;
        $user = auth()->user()
            // ?? User::find(1)
        ;
        $request->validate([
            'type' => "required|in:airtime",
            'amount' => 'required|numeric|min:0',
            "plan_id" => 'required|exists:plans,id',
            "recipient" => 'required'
        ]);

        if (!Hash::check($request->pin, $user->pin)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }

        $plan = Plan::findOrFail($request->plan_id);

        if ($request->amount < 50) {
            return response()->json([
                "success" => false,
                "message" => "Minimum of ₦50 is required.",
            ], 403);
        }

        if ($user->balance < $request->amount) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this amount"
            ], 403);
        }
        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $request->amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
            "type" => $type
        ]);
        // $order = Order::wherePlanId($plan->id)->first();
        $txn = MobileAirtimeService::buyClubAirtime($plan->provider->slug, $order->recipient, $order->amount, $order->reference, true);
        $amount = $request->amount;
        if ($txn['success']) {
            $order_success = true;
            $status = "complete";
            $user->balance -= $amount;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $order_success = false;
            $status = "failed";
            OrderFailed::dispatch($user, $order, $txn);
        }

        $order->order_data = ["api_data" => $txn, "plan" => $plan->load('provider.service')];
        $order->status = $status;
        $order->save();

        $transaction = $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id' => $order->id,
            'creditable_type' => Order::class,
            'amount' => $order->amount,
            'debit_data' => $user,
            'recipient' => $order->recipient,
            'credit_data' => $order->load('plan.provider.service'),
            'type' => $request->type,
            'status' => $order->status,
        ]);
        return redirect(route('dashboard.index'))->withSuccess('Airtime order placed successfully');
    }

    public function buyData(Request $request)
    {
        $type = "data";
        $charges = 0;
        $user = auth()->user()
            // ?? User::find(1)
        ;

        $request->validate([
            'type' => "required|in:data",
            "plan_id" => 'required_if:type,data|exists:plans,id',
            "recipient" => 'required'
        ]);
        $reference = Order::uniqueRef();
        if (!Hash::check($request->pin, $user->pin)) {
            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }
        $plan = Plan::findOrFail($request->plan_id)->load('provider');
        if ($user->balance < $plan->price) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this plan"
            ], 403);
        }
        $amount = $plan->price;
        // $order = Order::wherePlanId($plan->id)->first();

        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => $reference,
            "type" => $type
        ]);
        // return $order;
        // return $plan->provider->plans;
        $txn = MobileAirtimeService::buyClubData($plan->provider->slug, $order->recipient, $plan, $order->reference, true);
        $order->order_data = $txn;
        $order->save();
        if ($txn['success']) {
            $order_success = true;
            $status = "complete";
            $user->balance -= $amount;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $order_success = false;
            $status = "failed";
            OrderFailed::dispatch($user, $order, $txn);
        }

        $order->order_data = ["api_data" => $txn, "plan" => $plan->load('provider.service')];
        $order->status = $status;
        $order->save();


        $transaction = $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id' => $order->id,
            'creditable_type' => Order::class,
            'debit_data' => $user,
            'credit_data' => $order->load('plan.provider.service'),
            'recipient' => $request->recipient,
            'amount' => $order->amount,
            'type' => $request->type,
            'status' => $order->status,
        ]);
        return redirect(route('dashboard.index'))->withSuccess('Data order placed successfully');
    }

    public function buyCableTv(Request $request)
    {
        $type = "cable-tv";
        $charges = 50;
        $request->validate([
            'type' => "required|in:cable-tv",
            "plan_id" => 'required|exists:plans,id',
            "recipient" => 'required'
        ]);
        $user = auth()->user()
            // ?? User::find(1)
        ;


        if (!Hash::check($request->pin, $user->pin)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }

        $plan = Plan::findOrFail($request->plan_id);
        $amount = 0;
        if ($user->balance < $plan->price) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this plan"
            ], 403);
        }
        $amount = $plan->price;
        // $order = Order::wherePlanId($plan->id)->first();

        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
            "type" => $type
        ]);


        $txn = MobileAirtimeService::buyClubCable($plan->provider->slug, $order->recipient, $plan, $order->reference, false);
        if ($txn['success']) {
            $order_success = true;
            $status = "complete";
            $user->balance -= $amount + $charges;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $order_success = false;
            $status = "failed";
            OrderFailed::dispatch($user, $order, $txn);
        }

        $order->order_data = ["api_data" => $txn, "plan" => $plan->load('provider.service')];
        $order->status = $status;
        $order->save();

        $transaction = $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id' => $order->id,
            'creditable_type' => Order::class,
            'debit_data' => $user,
            'credit_data' => $order->load('plan.provider.service'),
            'recipient' => $request->recipient,
            'amount' => $order->amount,
            'type' => $request->type,
            'status' => $order->status,
        ]);

        return redirect(route('dashboard.index'))->withSuccess('Cable Tv order placed successfully');
    }

    public function buyElectricity(Request $request)
    {
        $type = "electricity";
        $charges = 50;
        $user = auth()->user()
            // ?? User::find(1)
        ;
        $request->validate([
            'type' => "required|in:electricity",
            'amount' => 'required|numeric|min:0',
            "plan_id" => 'required|exists:plans,id',
            "recipient" => 'required',
            "meter_type" => 'required|in:prepaid,postpaid'
        ]);

        if (!Hash::check($request->pin, $user->pin)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }

        $plan = Plan::findOrFail($request->plan_id);

        if ($request->amount < 50) {
            return response()->json([
                "success" => false,
                "message" => "Minimum of ₦50 is required.",
            ], 403);
        }

        if ($user->balance < $request->amount) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this amount"
            ], 403);
        }
        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $request->amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
            "type" => $type
        ]);

        // $order = Order::wherePlanId($plan->id)->first();

        $txn = MobileAirtimeService::buyClubElectricity($plan->provider->slug, $order->recipient, $request->meter_type, $request->amount, $order->reference, true);
        if ($txn['success']) {
            $order_success = true;
            $status = "complete";
            $user->balance -= $request->amount + $charges;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $order_success = false;
            $status = "failed";
            OrderFailed::dispatch($user, $order, $txn);
        }

        $order->order_data = ["api_data" => $txn, "plan" => $plan->load('provider.service')];
        $order->status = $status;
        $order->save();
        $transaction = $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id' => $order->id,
            'creditable_type' => Order::class,
            'amount' => $order->amount,
            'debit_data' => $user,
            'recipient' => $request->recipient,
            'credit_data' => $order->load('plan.provider.service'),
            'type' => $request->type,
            'status' => $order->status,
        ]);

        return redirect(route('dashboard.index'))->withSuccess('Electricity order placed successfully');
    }
}
