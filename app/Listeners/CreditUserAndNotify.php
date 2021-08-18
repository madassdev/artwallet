<?php

namespace App\Listeners;

use App\Notifications\CreditUserBalanceNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class CreditUserAndNotify
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
     * @param  Registered  $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $event->user->balance = onboardBalance();
        $event->user->save();
        Notification::send($event->user, new CreditUserBalanceNotification($event->user));
    }
}
