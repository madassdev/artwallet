<?php

namespace App\Listeners;

use App\Events\OrderFailed;
use App\Models\User;
use App\Notifications\AccountVerifiedNotification;
use App\Notifications\OrderFailedNotification;
use App\Notifications\OrderSuccessfulNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendOrderFailedNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  OrderFailed  $event
     * @return void
     */
    public function handle(OrderFailed $event)
    {
        $admins = User::role('admin')->get();
        Notification::send($admins, new OrderFailedNotification($event->user, $event->order, 'admin'));
    }
}
