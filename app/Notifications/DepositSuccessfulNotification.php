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
    public function __construct(User $user, Payment $payment, $context = "user", $deposit_context = "deposit")
    {
        $this->user = $user;
        $this->payment = $payment;
        $this->context = $context;
        $this->deposit_context = $deposit_context;
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
        if ($this->deposit_context === 'deposit') {
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
        }if ($this->deposit_context === 'agent') {
            if ($this->context === 'admin') {
                return (new MailMessage)
                    ->subject("{$this->user->email} paid an Agent Fee of ₦" . number_format($this->payment->amount))
                    ->greeting('Agent fee was paid')
                    ->line("A new agent fee of **₦" . number_format($this->payment->amount) . "** was recieved from **{$this->user->email}** via **{$this->payment->method}**")
                    // ->action('Notification Action', url('/'))
                    // ->line('Thank you for using our application!')
                ;
            }
            if ($this->context === 'user') {
                return (new MailMessage)
                    ->subject("Your Agent Registration Fee of ₦" . number_format($this->payment->amount) . " was processed successfully!")
                    ->greeting('Hello')
                    ->line("We are glad to inform you that your agent registration fee of **₦" . number_format($this->payment->amount) . "** was processed and received successfully!")
                    ->line("You are now a fully validated Artwallet Agent")
                    ->action('Buy something cheaper', url('/dashboard/buy'))
                    ->line('Thank you for using Artwallet!');
            }
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
