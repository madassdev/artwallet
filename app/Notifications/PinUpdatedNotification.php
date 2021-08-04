<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PinUpdatedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */

    public function __construct(User $user, $context = "update")
    {
        $this->user = $user;
        $this->context = $context;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        if ($this->context === 'update') {

            return (new MailMessage)
                ->subject('Your PIN has been updated.')
                ->greeting('Account Update')
                ->line('Hello ' . $this->user->name . ', Your PIN was updated')
                ->action('Go to dashboard', url('/dashboard'))
                // ->line('Thank you for using our application!')
                ;
        }
        if($this->context === 'new') {
            return (new MailMessage)
                ->subject('Your 4 digit PIN has been created.')
                ->greeting('Security Update')
                ->line('Your 4 digit pin was successfully saved')
                ->action('Go to dashboard', url('/dashboard'))
                ->line('Thank you for using Artwallet!');
        }
        if($this->context === 'password') {
            return (new MailMessage)
            ->subject('Your password has been updated.')
            ->greeting('Account Update')
            ->line('Hello ' . $this->user->name . ', Your password was updated')
            ->action('Go to dashboard', url('/dashboard'))
            // ->line('Thank you for using our application!')
            ;
        }
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
