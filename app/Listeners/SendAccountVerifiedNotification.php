<?php

namespace App\Listeners;

use App\Events\AccountVerified;
use App\Models\User;
use App\Notifications\AccountVerifiedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendAccountVerifiedNotification
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
     * @param  AccountVerified  $event
     * @return void
     */
    public function handle(AccountVerified $event)
    {
        Notification::send($event->user, new AccountVerifiedNotification($event->user));
    }
}
