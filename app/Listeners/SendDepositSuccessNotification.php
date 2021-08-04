<?php

namespace App\Listeners;

use App\Events\DepositSuccess;
use App\Models\User;
use App\Notifications\DepositSuccessfulNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendDepositSuccessNotification
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
     * @param  DepositSuccess  $event
     * @return void
     */
    public function handle(DepositSuccess $event)
    {
        $admins = User::role('admin')->get();
        Notification::send($admins, new DepositSuccessfulNotification($event->user, $event->payment, 'admin'));
        Notification::send($event->user, new DepositSuccessfulNotification($event->user, $event->payment, 'user'));
    }
}
