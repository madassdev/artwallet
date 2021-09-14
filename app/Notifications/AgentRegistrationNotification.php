<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AgentRegistrationNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public $user;
    public $context;
    public function __construct(User $user, $context = 'user')
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
        if ($this->context === 'user') {
            return (new MailMessage)
                ->subject('Agent Application Received')
                ->greeting('Hello')
                ->line('Your application to become an Artwallet agent has been received and is now being reviewed.')
                ->line('You will receive a notification about your application status after we review it.')
                ->action('View Application', url('/dashboard/agent-registration'))
                ->line('Thank you for using our application!');
        }
        if ($this->context === 'admin') {
            return (new MailMessage)
                ->subject('Agent Application Received')
                ->line('New Agent application has submitted by '.$this->user->email)
                ->line('Thank you for using our application!');
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
