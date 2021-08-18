<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Plan;
use App\Models\PlanMeta;
use App\Models\Provider;
use App\Models\Service;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;


class SubAdminController extends Controller
{
    public function index()
    {
        return inertia('Admin/Index');
    }

    

    public function test()
    {
        //  return Order::all()
            // ->map(function ($order) {
            //     $api_data = $order->order_data;
            //     if (@$order->order_data['txn']) {
            //         $api_data = $order->order_data['txn'];
            //     } else {
            //         if (@$order->order_data['api_data']) {

            //             $api_data = $order->order_data['api_data'];
            //         }
            //     }
            //     $order->order_data = [
            //         "api_data" => $api_data,
            //         "plan" => $order->plan->load('provider.service')
            //     ];
            //     $order->save();
            //     return $order->order_data;
            // })
        ;
        

        // return Transaction::whereCreditableType(Order::class)->get()->map(function($t){
        //     $t->credit_data = $t->creditable;
        //     $t->save();
        //     return $t;
        // });
        return "golden silence";
    }
}
