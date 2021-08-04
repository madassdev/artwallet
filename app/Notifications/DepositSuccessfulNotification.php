<?php

namespace App\Notifications;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DepositSuccessfulNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, Payment $payment, $context = "user")
    {
        $this->user = $user;
        $this->payment = $payment;
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
        if ($this->context === 'admin') {
            return (new MailMessage)
                ->subject("{$this->user->email} made a deposit of ₦" . number_format($this->payment->amount))
                ->greeting('Payment was made')
                ->line("A new payment of **₦" . number_format($this->payment->amount) . "** was recieved from **{$this->user->email}** via **{$this->payment->method}**")
                // ->action('Notification Action', url('/'))
                // ->line('Thank you for using our application!')
            ;
        }
        if ($this->context === 'user') {
            return (new MailMessage)
                ->subject("Your deposit of ₦" . number_format($this->payment->amount) . " was successful!")
                ->greeting('Hello')
                ->line("We are glad to inform you that your deposit of **₦" . number_format($this->payment->amount) . "** was processed and received successfully!")
                ->line("Your Artwallet balance has now been credited with **₦" . number_format($this->payment->amount) . "**")
                ->line("Your current Artwallet balance is **₦" . number_format($this->user->balance) . "**")
                ->action('Buy something', url('/dashboard/buy'))
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
