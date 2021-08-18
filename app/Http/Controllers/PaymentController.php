<?php

namespace App\Http\Controllers;

use App\Events\DepositSuccess;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        // return $request->intent ?? "deposit";
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

            if($expected_amount < $amount_paid-5)
            {
                return response()->json([
                    "success" => false,
                    "message" => "Amount paid lower than expected amount. Expected ".naira($expected_amount)." for ".naira($request->amount).", but received ".naira($amount_paid)
                ],403);
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


            return response()->json([
                "success" => true,
                "message" => "Payment verified successfully",
                "data" => [
                    "payment" => $payment->load('debit'),
                    "transaction" => $transaction,
                ],
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => @$tr['message']
            ], 403);
        }



        return response()->json($tr);

        // AR1625555091744
    }
}
