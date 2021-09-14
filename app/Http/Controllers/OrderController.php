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
use Throwable;

class OrderController extends Controller
{
    public function data(Request $request)
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
        $amount = data_price($plan, $user);
        // $order = Order::wherePlanId($plan->id)->first();
        // return compact('amount', 'plan', 'charges');
        // return $amount;

        if ($user->balance < $amount + data_charges()) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this plan"
            ], 403);
        }
        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => $reference,
            "type" => $type
        ]);
        // return $order;
        // return $plan->provider->plans;
        $txn = MobileAirtimeService::buyClubData($plan->provider->slug, $order->recipient, $plan, $order->reference);
        $order->order_data = $txn;
        $order->save();
        if ($txn['success']) {
            $order_success = true;
            $status = "complete";
            $charges = data_charges();
            $user->balance -= $amount + $charges;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $charges = 0;
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

        if ($charges) {
            $transaction = $user->debits()->create([
                "user_id" => $user->id,
                'creditable_id' => $order->id,
                'creditable_type' => Order::class,
                'debit_data' => $user,
                'credit_data' => $order->load('plan.provider.service'),
                'recipient' => "Artwallet",
                'amount' => $charges,
                'type' => "service-charge",
                'status' => "success",
            ]);
        }

        return response()->json([
            "success" => true,
            "order_success" => $order_success,
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order->load('credit'),
            ],
        ]);
    }

    public function cableTv(Request $request)
    {
        $type = "cable-tv";
        $charges = 0;
        $request->validate([
            'type' => "required|in:cable-tv",
            "plan_id" => 'required|exists:plans,id',
            "recipient" => 'required'
        ]);
        $user = auth()->user()
            ?? User::find(1);


        if (!Hash::check($request->pin, $user->pin)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }

        $plan = Plan::findOrFail($request->plan_id);
        // $order = Order::whereReference('ORD-BXJNZM')->first();
        // $plan = Plan::findOrFail($order->plan_id);

        $amount = cable_tv_price($plan, $user);

        // return compact('amount', 'plan', 'charges');

        if ($user->balance < $amount + cable_tv_charges()) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this plan"
            ], 403);
        }

        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
            "type" => $type
        ]);


        $txn = MobileAirtimeService::buyClubCable($plan->provider->slug, $order->recipient, $plan, $order->reference);
        // return $txn;
        if ($txn['success']) {
            $order_success = true;
            $status = "complete";
            $charges = cable_tv_charges();
            $user->balance -= $amount + $charges;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $charges = 0;
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

        if ($charges) {
            $transaction = $user->debits()->create([
                "user_id" => $user->id,
                'creditable_id' => $order->id,
                'creditable_type' => Order::class,
                'debit_data' => $user,
                'credit_data' => $order->load('plan.provider.service'),
                'recipient' => "Artwallet",
                'amount' => $charges,
                'type' => "service-charge",
                'status' => "success",
            ]);
        }

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



    public function internet(Request $request)
    {
        $type = "internet";
        $charges = 0;
        $request->validate([
            'type' => "required|in:internet",
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
        $amount = internet_price($plan, $user);
        // return compact('amount', 'plan', 'charges');

        if ($user->balance < $amount + internet_charges()) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this plan"
            ], 403);
        }

        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
            "type" => $type
        ]);


        $txn = MobileAirtimeService::buyClubInternet($plan->provider->slug, $order->recipient, $plan, $order->reference);
        if ($txn['success']) {
            $order_success = true;
            $status = "complete";
            $charges = internet_charges();
            $user->balance -= $amount + $charges;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $charges = 0;
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

        if ($charges) {
            $transaction = $user->debits()->create([
                "user_id" => $user->id,
                'creditable_id' => $order->id,
                'creditable_type' => Order::class,
                'debit_data' => $user,
                'credit_data' => $order->load('plan.provider.service'),
                'recipient' => "Artwallet",
                'amount' => $charges,
                'type' => "service-charge",
                'status' => "success",
            ]);
        }

        return response()->json([
            "success" => true,
            "order_success" => $order_success,
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order->load('credit'),
            ],
        ]);
    }

    public function airtime(Request $request)
    {
        $type = "airtime";
        $charges = 0;
        $user = auth()->user()
            ?? User::find(1);
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

        if ($request->amount < minimum_airtime()) {
            return response()->json([
                "success" => false,
                "message" => "Minimum of " . naira(minimum_airtime()) . " is required.",
            ], 403);
        }

        $amount = airtime_price($request->amount, $user);
        // return compact('amount', 'plan', 'charges');
        if ($user->balance < $amount + airtime_charges()) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this amount"
            ], 403);
        }
        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
            "type" => $type
        ]);
        // $order = Order::wherePlanId($plan->id)->first();
        $txn = MobileAirtimeService::buyClubAirtime($plan->provider->slug, $order->recipient, $order->amount, $order->reference);
        if ($txn['success']) {
            $order_success = true;
            $charges = airtime_charges();
            $status = "complete";
            $user->balance -= $amount + $charges;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $charges = 0;
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

        if ($charges) {
            $transaction = $user->debits()->create([
                "user_id" => $user->id,
                'creditable_id' => $order->id,
                'creditable_type' => Order::class,
                'debit_data' => $user,
                'credit_data' => $order->load('plan.provider.service'),
                'recipient' => "Artwallet",
                'amount' => $charges,
                'type' => "service-charge",
                'status' => "success",
            ]);
        }

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
        $type = "electricity";
        $charges = 0;
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


        $amount = airtime_price($request->amount, $user);
        if ($request->amount < minimum_electricity()) {
            return response()->json([
                "success" => false,
                "message" => "Minimum of " . naira(minimum_electricity()) . " is required.",
            ], 403);
        }

        if ($user->balance < $amount + electricity_charges()) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this amount"
            ], 403);
        }
        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
            "type" => $type
        ]);

        // $order = Order::wherePlanId($plan->id)->first();

        $txn = MobileAirtimeService::buyClubElectricity($plan->provider->slug, $order->recipient, $request->meter_type, $request->amount, $order->reference);
        if ($txn['success']) {
            $order_success = true;
            $status = "complete";
            $charges = electricity_charges();
            $user->balance -= $amount + $charges;
            $user->save();
            OrderSuccess::dispatch($user, $order);
        } else {
            $charges = 0;
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

        if ($charges) {
            $transaction = $user->debits()->create([
                "user_id" => $user->id,
                'creditable_id' => $order->id,
                'creditable_type' => Order::class,
                'debit_data' => $user,
                'credit_data' => $order->load('plan.provider.service'),
                'recipient' => "Artwallet",
                'amount' => $charges,
                'type' => "service-charge",
                'status' => "success",
            ]);
        }

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
                "message" => "Test Electricity User"
            ];

            return response()->json([
                "success" => true,
                "recipient" => $valid_response["message"]
            ]);
        } else {
            $plan = Plan::findOrFail($request->plan_id);
            try {

                $response = MobileAirtimeService::verifyClubElectricity($plan->provider->slug, $request->recipient);
                return response()->json([
                    "success" => $response['success'],
                    "message" => $response['message'],
                    "recipient" => @$response['recipient'],
                    "api_response" => $response['api_response']
                ], $response['success'] ? 200 : 403);
            } catch (Throwable $th) {
                return response()->json([
                    "success" => false,
                    "message" => "UNABLE TO VERIFY RECIPIENT",
                    "recipient" => "UNABLE TO VERIFY RECIPIENT",
                    "api_response" => "ERROR"
                ], 403);
            }
        }
    }

    public function verifyCable(Request $request)
    {
        if (strtolower($request->recipient) == "valid") {

            $valid_response = [
                "code" => 100,
                "message" => "Test Cable Tv User"
            ];

            return response()->json([
                "success" => true,
                "recipient" => $valid_response["message"]
            ]);
        } else {
            $plan = Plan::findOrFail($request->plan_id);
            try {

                $response = MobileAirtimeService::verifyClubCable($plan->provider->slug, $request->recipient);
                return response()->json([
                    "success" => $response['success'],
                    "message" => $response['message'],
                    "recipient" => @$response['recipient'],
                    "api_response" => $response['api_response']
                ], $response['success'] ? 200 : 403);
            } catch (Throwable $th) {
                return response()->json([
                    "success" => false,
                    "message" => "UNABLE TO VERIFY RECIPIENT",
                    "recipient" => "UNABLE TO VERIFY RECIPIENT",
                    "api_response" => "ERROR"
                ], 403);
            }
        }
    }

    public function verifyInternet(Request $request)
    {
        if (strtolower($request->recipient) == "valid") {

            $valid_response = [
                "code" => 100,
                "message" => "Test Internet User"
            ];

            return response()->json([
                "success" => true,
                "recipient" => $valid_response["message"]
            ]);
        } else {
            $plan = Plan::findOrFail($request->plan_id);

            try {

                $response = MobileAirtimeService::verifyClubInternet($plan->provider->slug, $request->recipient);
                return response()->json([
                    "success" => $response['success'],
                    "message" => $response['message'],
                    "recipient" => @$response['recipient'],
                    "api_response" => $response['api_response']
                ], $response['success'] ? 200 : 403);
            } catch (Throwable $th) {
                return response()->json([
                    "success" => false,
                    "message" => "UNABLE TO VERIFY RECIPIENT",
                    "recipient" => "UNABLE TO VERIFY RECIPIENT",
                    "api_response" => "ERROR"
                ], 403);
            }
        }
    }



    public function transfer(Request $request)
    {

        $user = auth()->user();
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

        if ($recipient->id = $user->id) {
            return response()->json([
                "success" => false,
                "message" => "You cannot transfer to yourself!",
                "code" => "CANNOT_TRANSFER_TO_SELF"
            ], 403);
        }

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
}
