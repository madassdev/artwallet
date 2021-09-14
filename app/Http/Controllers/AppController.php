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
use Spatie\Permission\Models\Role;

class AppController extends Controller
{
    public function status()
    {
        ini_set('max_execution_time', 1000);
        // Artisan::call('migrate:fresh', [
        //     '--seed' => true,
        //     '--force' => true
        // ]);

        return dd(Artisan::output());
    }

    public function migrate(Request $request)
    {
        abort_unless($request->password === 'inter123...', 403, 'Unauthorized App Action');
        ini_set('max_execution_time', 1000);
        Artisan::call('migrate', [
            '--force' => true
        ]);

        return dd(Artisan::output());
    }

    public function tesst()
    {
        Artisan::call('migrate:status', []);

        return dd(Artisan::output());
    }

    public function test(Request $request)
    {
        return 1;
        return ["file"=>$request->business_cac->path(), "req" => $request->all()];
        $admins = User::role('admin')->get();
        $order = Order::latest()->first();
        OrderSuccess::dispatch($order->user, $order);
        OrderFailed::dispatch($order->user, $order);
        return $order;
    }

    public function seed(Request $request)
    {
        abort_unless($request->password === 'inter123...', 403, 'Unauthorized App Action');
        Artisan::call('db:seed', [
            "--class" => "AgentRoleSeeder"
        ]);

        return dd(Artisan::output());
    }
}
