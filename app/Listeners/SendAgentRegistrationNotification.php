<?php

namespace App\Listeners;

use App\Events\AgentRegistration;
use App\Models\User;
use App\Notifications\AgentRegistrationNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendAgentRegistrationNotification
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
     * @param  AgentRegistration  $event
     * @return void
     */
    public function handle(AgentRegistration $event)
    {
        $user = $event->user;
        $admins = User::role('admin')->get();
        Notification::send($user, new AgentRegistrationNotification($user, 'user'));
        Notification::send($admins, new AgentRegistrationNotification($user, 'admin'));

    }
}
