<?php

namespace App\Listeners;

use App\Events\OrderSuccess;
use App\Models\User;
use App\Notifications\OrderSuccessfulNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendOrderSuccessNotification
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
     * @param  OrderSuccess  $event
     * @return void
     */
    public function handle(OrderSuccess $event)
    {
        $admins = User::role('admin')->get();
        Notification::send($admins, new OrderSuccessfulNotification($event->user, $event->order, 'admin'));
        Notification::send($event->user, new OrderSuccessfulNotification($event->user, $event->order, 'user'));
    }
}
