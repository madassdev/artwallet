<?php

namespace App\Http\Controllers;

use App\Events\OrderFailed;
use App\Events\OrderSuccess;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Provider;
use App\Models\User;
use App\Services\MobileAirtimeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class OrderController extends Controller
{
    public function data(Request $request)
    {
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
            "reference" => $reference
        ]);
        // return $order;
        // return $plan->provider->plans;
        $txn = MobileAirtimeService::buyClubData($plan->provider->slug, $order->recipient, $plan, $order->reference);
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

        return response()->json([
            "success" => true,
            "order_success" => $order_success,
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order->load('credit'),
                "transaction" => $transaction
            ],
        ]);
    }

    public function airtime(Request $request)
    {
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

        if($request->amount < 50)
        {
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
        ]);
        // $order = Order::wherePlanId($plan->id)->first();
        $txn = MobileAirtimeService::buyClubAirtime($plan->provider->slug, $order->recipient, $order->amount, $order->reference);
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

        $order->order_data = $txn;
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

        return response()->json([
            "success" => true,
            "order_success" => $order_success,
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order,
            ],
        ]);
    }

    public function electricity(Request $request)
    {
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
        
        if($request->amount < 50)
        {
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
        ]);

        // $order = Order::wherePlanId($plan->id)->first();

        $txn = MobileAirtimeService::buyClubElectricity($plan->provider->slug, $order->recipient, $request->meter_type, $request->amount, $order->reference);
        if ($txn['success']) {
            $order_success = true;
            $status = "complete";
            $user->balance -= $request->amount;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $order_success = false;
            $status = "failed";
            OrderFailed::dispatch($user, $order, $txn);
        }

        $order->order_data = $txn;
        $order->status = $status;
        $order->save();
        $user->balance -= $request->amount;
        $user->save();

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

        return response()->json([
            "success" => true,
            "order_success" => $order_success,
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order->load('credit'),
                "transaction" => $transaction
            ],
        ]);
    }

    public function verifyElectricity(Request $request)
    {
        if (strtolower($request->recipient) == "valid") {

            $valid_response = [
                "code" => 100,
                "message" => "Test User"
            ];

            return response()->json([
                "success" => true,
                "recipient" => $valid_response["message"]
            ]);
        } else {
            $plan = Plan::findOrFail($request->plan_id);
            $txn = MobileAirtimeService::verifyClubElectricity($plan->provider->slug, $request->recipient);

            return response()->json([
                "success" => $txn['success'],
                "message" => $txn['message'],
            ], $txn['success'] ? 200 : 403);
        }
    }

    public function verifyCable(Request $request)
    {
        if (strtolower($request->recipient) == "valid") {

            $valid_response = [
                "code" => 100,
                "message" => "Test User"
            ];

            return response()->json([
                "success" => true,
                "recipient" => $valid_response["message"]
            ]);
        } else {
            $plan = Plan::findOrFail($request->plan_id);
            $txn = MobileAirtimeService::verifyClubCable($plan->provider->slug, $request->recipient);
            return response()->json([
                "success" => $txn['success'],
                "message" => $txn['message'],
            ], $txn['success'] ? 200 : 403);
        }
    }



    public function transfer(Request $request)
    {

        $request->validate([
            'type' => "required|in:transfer",
            'amount' => 'required|numeric|min:0',
            "recipient" => 'required'
        ]);


        $recipient = User::whereMobile($request->recipient)->first();
        if (!$recipient) {
            return response()->json([
                "success" => false,
                "message" => "Recipient Not Found",
                "code" => "RECIPIENT_NOT_FOUND"
            ], 403);
        }

        $user = auth()->user();
        if (!Hash::check($request->pin, $user->pin)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }

        if ($user->balance < $request->amount) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this amount"
            ], 403);
        }

        $amount = $request->amount;
        $user->balance -= $amount;
        $user->save();
        $recipient->balance += $amount;
        $recipient->save();

        $transaction = $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id' => $recipient->id,
            'creditable_type' => User::class,
            'debit_data' => $user,
            'credit_data' => $recipient,
            'amount' => $request->amount,
            'type' => $request->type,
            'recipient' => $request->recipient,
            'status' => 'complete',
        ]);

        $recipient->credits()->create([
            "user_id" => $recipient->id,
            'debitable_id' => $user->id,
            'debitable_type' => User::class,
            'debit_data' => $user,
            'credit_data' => $recipient,
            'recipient' => $user->mobile,
            'amount' => $request->amount,
            'type' => 'credit',
            'status' => 'complete',
        ]);

        // Send Mail

        return response()->json([
            "success" => true,
            "message" => "Funds transferred successfully",
            "data" => [
                "transaction" => $transaction
            ],
        ]);
    }

    public function cableTv(Request $request)
    {
        $request->validate([
            'type' => "required|in:cable-tv",
            "plan_id" => 'required|exists:plans,id',
            "recipient" => 'required'
        ]);
        $user = auth()->user()
            ?? User::find(1)
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
        $user->balance -= $amount;
        $user->save();

        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
        ]);

        // $order = Order::wherePlanId($plan->id)->first();

        $txn = MobileAirtimeService::buyClubCable($plan->provider->slug, $order->recipient, $plan, $order->reference);
        
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

        $order->status = $status;
        $order->save();

        $transaction = $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id' => $order->id,
            'creditable_type' => Order::class,
            'amount' => $order->amount,
            'recipient' => $request->recipient,
            'type' => $request->type,
            'status' => 'complete',
        ]);

        return response()->json([
            "success" => true,
            "order_success" => $order_success,
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order->load('credit'),
                "transaction" => $transaction
            ],
        ]);

    }
}
