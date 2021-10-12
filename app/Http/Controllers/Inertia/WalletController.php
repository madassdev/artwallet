<?php

namespace App\Http\Controllers\Inertia;

use App\Events\DepositSuccess;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function __construct()
    {
        mock_buy();
    }
    
    public function index()
    {
        return inertia('Wallet/Index');
    }

    public function fund()
    {
        return inertia('Wallet/Fund');
    }

    public function transfer()
    {
        return inertia('Wallet/Transfer');
    }

    public function history()
    {
        return inertia('Wallet/History');
    }

    public function verifyPaystack(Request $request)
    {
        $request->validate([
            "amount" => "required|numeric|min:100",
            "reference" => "required|string"
        ]);
        $user = auth()->user();
        if (Payment::whereRef($request->reference)->count()) {

            return response()->json([
                "success" => false,
                "message" => "Payment reference has already been used."
            ], 403);
        }
        $tr = PaymentService::verifyPaystack($request->reference);
        if ($tr["status"]) {
            $expected_amount = calculatePaystackCharges($request->amount) + $request->amount;
            // return $tr['data'];
            $amount_paid = $tr['data']['amount'] / 100;
            // return [
            //     "amount" => $request->amount,
            //     "expected" => $expected_amount,
            //     "paid" => $amount_paid
            // ];

            if ($expected_amount < $amount_paid - 5) {
                return response()->json([
                    "success" => false,
                    "message" => "Amount paid lower than expected amount. Expected " . naira($expected_amount) . " for " . naira($request->amount) . ", but received " . naira($amount_paid)
                ], 403);
            }
            $payment = $user->payments()->create([
                "ref" => $request->reference,
                "amount" => $amount_paid,
                "intent" => $request->intent ?? "deposit",
                "method" => $request->method ?? "paystack",
                "status" => "success",
                "payment_data" => $tr['data']
            ]);

            $user->balance += $request->amount;

            $user->save();

            $transaction = $user->credits()->create([
                "user_id" => $user->id,
                'debitable_id' => $payment->id,
                'debitable_type' => Payment::class,
                'recipient' => "wallet",
                'amount' => $request->amount,
                'type' => 'deposit',
                'status' => 'complete',
            ]);

            DepositSuccess::dispatch($user, $payment);


            return redirect(route('dashboard.index'))->withSuccess('Wallet funded successfully');
        } else {
            return response()->json([
                "success" => false,
                "message" => @$tr['message']
            ], 403);
        }
    }
}
