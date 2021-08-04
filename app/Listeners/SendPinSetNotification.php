<?php

namespace App\Listeners;

use App\Events\PinSet;
use App\Notifications\PinUpdatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendPinSetNotification
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
     * @param  PinSet  $event
     * @return void
     */
    public function handle(PinSet $event)
    {
        Notification::send($event->user, new PinUpdatedNotification($event->user, 'new'));
        
    }
}
