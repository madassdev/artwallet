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

    public function cableTv(Request $request)
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


        $txn = MobileAirtimeService::buyClubCable($plan->provider->slug, $order->recipient, $plan, $order->reference);
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
        $charges = 50;
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


        $txn = MobileAirtimeService::buyClubInternet($plan->provider->slug, $order->recipient, $plan, $order->reference);
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

        $txn = MobileAirtimeService::buyClubElectricity($plan->provider->slug, $order->recipient, $request->meter_type, $request->amount, $order->reference);
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
}
