<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

use App\Models\Plan;
use App\Models\Provider;
use App\Models\Service;
use App\Models\Transaction;
use App\Models\User;
use App\Services\MobileAirtimeService;
use Illuminate\Support\Facades\Hash;

class DashboardController extends Controller
{
    public function index()
    {
        // return MobileAirtimeService::buyAirtime('mtn', '08136051712', 10, Order::uniqueRef());
        // return MobileAirtimeService::verifyElectricity('ibsedc', '9987657');
        $services = Service::with('providers')->get();
        $providers = Provider::with('service', 'plans')->get();
        $plans = Plan::with('provider.service')->get();
        // $transactions = Transaction::whereUserId(auth()->user()->id)->latest()->get();
        // return $transactions;
        $app_services = [
            "services" => $services,
            "providers" => $providers,
            "plans" => $plans,
        ];
        return view('dashboard.index', compact('app_services'));
    }

    public function otpView()
    {
        $otp = rand(999, 9999);
        $time = time();
        auth()->user()->otp = $otp;
        auth()->user()->otp_requested_at = $time;
        return view('auth.request-otp');
        return $otp;
    }

    public function updatePin(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            "old_pin" => "required|numeric|digits:4",
            "pin" => "required|numeric|digits:4"
        ]);
        if (!Hash::check($request->old_pin, $user->pin)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }
        // return $request;
        $user->pin = bcrypt($request->pin);
        $user->save();
        return response()->json([
            "success" => true,
            "message" => "PIN updated successfully",
        ],);
    }
}
