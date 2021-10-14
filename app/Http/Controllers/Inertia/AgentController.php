<?php

namespace App\Http\Controllers\Inertia;

use App\Events\AgentRegistration;
use App\Events\DepositSuccess;
use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function index()
    {
    }

    public function showApply()
    {

        if (auth()->user()->agent) {
            return redirect()->route('agent.show');
        }
        return inertia("Agent/Index");
    }

    public function showApplication()
    {
        if (!auth()->user()->agent) {
            return redirect()->route('agent.apply');
        }

        auth()->user()->load('agent');
        return inertia("Agent/Show");
    }

    public function submitApplication(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            "business_cac" => "required|file|mimes:jpg,bmp,png,jpeg"
        ]);
        $path = "/";
        if ($request->hasFile('business_cac')) {
            $path = time() . 'user-' . $user->uniqid . '-cac.' . $request->business_cac->getClientOriginalExtension();
            $request->business_cac->move(public_path('/images/business_cacs'), $path);
            $image_url =  asset('/images/business_cacs/' . $path);
        }

        $agent = Agent::updateOrCreate(["user_id" => $user->id], $request->except(["business_cac"]) + ["business_cac" => $image_url]);
        event(new AgentRegistration($user));
        return redirect(route('dashboard.index'))->withSuccess("Agent Application submitted successfully");
        return response()->json([
            "success" => true,
            "message" => "Agent details saved successfully!",
            "data" => [
                "user" => $user->load('agent')
            ]
        ]);
    }

    public function agentPayment(Request $request)
    {
        // return $request->intent ?? "deposit";
        mock_buy();
        $request->validate([
            "amount" => "required|numeric|min:100",
            "reference" => "required|string",
            "intent" => "required|string",
        ]);
        $user = auth()->user();
        if (Payment::whereRef($request->reference)->count()) {

            return response()->json([
                "success" => false,
                "message" => "Payment reference has already been used."
            ], 403);
        }
        // $tr = PaymentService::verifyPaystack($request->reference, true);
        $tr = PaymentService::verifyPaystack($request->reference);
        if ($tr["status"]) {
            // $expected_amount = calculatePaystackCharges($request->amount) + $request->amount;
            $expected_amount = 10000;
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

            $user->agent->amount_paid += $amount_paid;
            $user->agent->has_paid = true;
            $user->agent->status = 'success';

            $user->agent->save();
            $user->assignRole('agent');

            $transaction = $user->agent->credits()->create([
                "user_id" => $user->id,
                'debitable_id' => $payment->id,
                'debitable_type' => User::class,
                'debit_data' => $user,
                'credit_data' => $user->agent->fresh(),
                'recipient' => "agent",
                'amount' => $amount_paid,
                'type' => 'agent-activation',
                'status' => 'complete',
            ]);

            DepositSuccess::dispatch($user, $payment, 'agent');


            return redirect(route('dashboard.index'))->withSuccess('Your agency payment was received succesfully!');
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
