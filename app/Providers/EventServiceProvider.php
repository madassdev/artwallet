<?php

namespace App\Providers;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        PasswordReset::class => [
            \App\Listeners\SendPasswordUpdatedNotification::class
        ],
        \App\Events\AccountVerified::class => [
            \App\Listeners\SendAccountVerifiedNotification::class,
        ],
        \App\Events\PinSet::class => [
            \App\Listeners\SendPinSetNotification::class
        ],
        \App\Events\PinUpdated::class => [
            \App\Listeners\SendPinUpdatedNotification::class
        ],
        \App\Events\PasswordUpdated::class => [
            \App\Listeners\SendPasswordUpdatedNotification::class
        ],
        \App\Events\OrderSuccess::class => [
            \App\Listeners\SendOrderSuccessNotification::class,
        ],
        \App\Events\OrderFailed::class => [
            \App\Listeners\SendOrderFailedNotification::class,
        ],
        \App\Events\DepositSuccess::class => [
            \App\Listeners\SendDepositSuccessNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
