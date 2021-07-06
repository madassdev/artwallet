<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Plan;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();
        $plan = Plan::findOrFail($request->plan_id);
        // if($user->balance < $plan->price)
        // {
        //     return response()->json([
        //         "success" => false,
        //         "message" => "User does no have enough balance to purchase this plan"
        //     ], 403);
        // }
        $user->balance -= $plan->price;
        $user->save();
        $order = $user->orders()->create([
            "plan_id" => $request->plan_id,
            "amount" => $plan->price,
            "reference" => Order::uniqueRef(),
        ]);
        
        $user->debits()->create([
            "user_id" => $user->id,
            'creditable_id'=>$order->id,
            'creditable_type'=>Order::class,
            'amount'=>$order->amount,
            'type' => 'order',
            'status' => 'complete',
        ]);

        return response()->json([
            "success" => true,
            "message" => "Order placed successfully",
            "data" => [
                "order" => $order->load('credit'),
                "user" => $user->load('orders', 'transactions', 'credits', 'debits')
            ],
        ]);
        // $user
    }
}
