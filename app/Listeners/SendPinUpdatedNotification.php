<?php

namespace App\Listeners;

use App\Events\PinUpdated;
use App\Models\User;
use App\Notifications\PinUpdatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendPinUpdatedNotification
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
     * @param  PinUpdated  $event
     * @return void
     */
    public function handle(PinUpdated $event)
    {
            // $admins = User::role('admin')->get();
            // Notification::send($admins, new PinUpdatedNotification($event->user));
            Notification::send($event->user, new PinUpdatedNotification($event->user, 'update'));
    }
}
