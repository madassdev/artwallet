<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'type' => "required|in:airtime,data",
            'amount' => 'required_if:type,airtime|numeric|min:0',
            "plan_id" => 'required_if:type,data|exists:plans,id',
            "destination" => 'required'
        ]);
        $user = auth()->user();
        $plan = Plan::findOrFail($request->plan_id);
        $amount = 0;
        if ($request->type === "data") {
            if ($user->balance < $plan->price) {
                return response()->json([
                    "success" => false,
                    "message" => "User does no have enough balance to purchase this plan"
                ], 403);
            }
            $amount = $plan->price;
        }
        if ($request->type === "airtime") {
            if ($user->balance < $request->amount) {
                return response()->json([
                    "success" => false,
                    "message" => "User does no have enough balance to purchase this amount"
                ], 403);
            }
            $amount = $request->amount;
        }
        $user->balance -= $amount;
        $user->save();

        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $amount,
            "destination" => $request->destination,
            "reference" => Order::uniqueRef(),
        ]);

        $transaction = $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id' => $order->id,
            'creditable_type' => Order::class,
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


    public function transfer(Request $request)
    {
        $request->validate([
            'type' => "required|in:transfer",
            'amount' => 'required|numeric|min:0',
            "recipient" => 'required|exists:users,mobile'
        ]);
        $recipient = User::whereMobile($request->recipient)->first();
        // return $recipient;
        $user = auth()->user();
        // if ($user->balance < $request->amount) {
        //     return response()->json([
        //         "success" => false,
        //         "message" => "User does no have enough balance to purchase this amount"
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
            'amount' => $request->amount,
            'type' => $request->type,
            'status' => 'complete',
        ]);

        return response()->json([
            "success" => true,
            "message" => "Funds transferred successfully",
            "data" => [
                "transaction" => $transaction
            ],
        ]);
        // $user
    }
}
