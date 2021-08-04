<?php

namespace App\Notifications;

use App\Models\Order;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderFailedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, Order $order, $context = "admin")
    {
        $this->user = $user;
        $this->order = $order;
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
        $type = strtoupper(@$this->order->credit->type ?? request()->type);
        if ($this->context === 'admin') {
            return (new MailMessage)
                ->subject("Failed {$type} Order from {$this->user->email}")
                ->greeting('Order Failed')
                ->line("{$type} order of ₦{$this->order->amount} which was made by {$this->user->email} failed.")
                ->line('The transaction details are:')
                ->line('Type: ' . "**{$type}**")
                ->line('Plan: ' . "**{$this->order->plan->title}**")
                ->line('Recipient: ' . "**{$this->order->recipient}**")
                ->line('Amount: ' . "**₦" . number_format($this->order->amount) . "**")
                ->line('Error code: ' . "**" . @$this->order->order_data['code'] . "**")
                ->line('Error Message: ' . "**" . @$this->order->order_data['message'] . "**")
                // ->action('Notification Action', url('/'))
                // ->line('Thank you for using our application!')
            ;
        }
        if ($this->context === 'user') {
            return (new MailMessage)
                ->subject("Your {$type} Order of ₦{$this->order->amount} was successful!")
                ->greeting('Hello')
                ->line("We are glad to inform you that your {$type} order of ₦{$this->order->amount} was processed and completed successfully")
                ->line("Your current Artwallet balance is ₦{$this->user->balance}.")
                // ->action('Buy something', url('/dashboard/buy'))
                ->line('Thank you for using Artwallet!');
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
