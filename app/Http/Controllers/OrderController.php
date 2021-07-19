<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'type' => "required|in:airtime,data",
            'amount' => 'required_if:type,airtime|numeric|min:0',
            "plan_id" => 'required_if:type,data|exists:plans,id',
            "recipient" => 'required'
        ]);
        $user = auth()->user();
        if (!Hash::check($request->pin, $user->pin)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }
        $plan = Plan::findOrFail($request->plan_id);
        $amount = 0;
        if ($request->type === "data") {
            if ($user->balance < $plan->price) {
                return response()->json([
                    "success" => false,
                    "message" => "User does not have enough balance to purchase this plan"
                ], 403);
            }
            $amount = $plan->price;
        }
        if ($request->type === "airtime") {
            if ($user->balance < $request->amount) {
                return response()->json([
                    "success" => false,
                    "message" => "User does not have enough balance to purchase this amount"
                ], 403);
            }
            $amount = $request->amount;
        }
        $user->balance -= $amount;
        $user->save();

        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
        ]);

        $transaction = $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id' => $order->id,
            'creditable_type' => Order::class,
            'debit_data' => $user,
            'credit_data' => $order->load('plan.provider.service'),
            'recipient' => $request->recipient,
            'amount' => $order->amount,
            'type' => $request->type,
            'status' => 'complete',
        ]);

        return response()->json([
            "success" => true,
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order->load('credit'),
                "transaction" => $transaction
            ],
        ]);
        // $user
    }

    public function electricity(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'type' => "required|in:electricity",
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
        $amount = 0;

        if ($user->balance < $request->amount) {
            return response()->json([
                "success" => false,
                "message" => "User does not have enough balance to purchase this amount"
            ], 403);
        }
        $amount = $request->amount;
        $user->balance -= $amount;
        $user->save();

        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "recipient" => $request->recipient,
            "reference" => Order::uniqueRef(),
        ]);

        $transaction = $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id' => $order->id,
            'creditable_type' => Order::class,
            'amount' => $order->amount,
            'debit_data' => $user,
            'recipient' => $request->recipient,
            'credit_data' => $order->load('plan.provider.service'),
            'type' => $request->type,
            'status' => 'complete',
        ]);

        return response()->json([
            "success" => true,
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order->load('credit'),
                "transaction" => $transaction
            ],
        ]);
        // $user
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
        // return $recipient;
        $user = auth()->user();
        if (!Hash::check($request->pin, $user->pin)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }
        // if ($user->balance < $request->amount) {
        //     return response()->json([
        //         "success" => false,
        //         "message" => "User does not have enough balance to purchase this amount"
        //     ], 403);
        // }
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
        // $user
    }

    public function cableTv(Request $request)
    {
        $request->validate([
            'type' => "required|in:cable-tv",
            "plan_id" => 'required|exists:plans,id',
            "recipient" => 'required'
        ]);
        $user = auth()->user();
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
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order->load('credit'),
                "transaction" => $transaction
            ],
        ]);
    }
}
