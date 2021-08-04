<?php

namespace App\Http\Controllers;

use App\Events\OrderFailed;
use App\Events\OrderSuccess;
use App\Models\Order;
use App\Models\User;
use App\Notifications\OrderFailedNotification;
use App\Notifications\OrderSuccessfulNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Notification;

class AppController extends Controller
{
    public function status()
    {
        ini_set('max_execution_time', 1000);
        Artisan::call('migrate:fresh', [
            '--seed' => true,
            '--force' => true
        ]);

        return dd(Artisan::output());
    }

    public function tesst()
    {
        Artisan::call('migrate:status', []);

        return dd(Artisan::output());
    }

    public function test()
    {
        // return 1;
        $admins = User::role('admin')->get();
        $order = Order::latest()->first();
        OrderSuccess::dispatch($order->user, $order);
        OrderFailed::dispatch($order->user, $order);
        return $order;
    }
}
