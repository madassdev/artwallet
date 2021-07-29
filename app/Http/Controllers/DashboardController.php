<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

use App\Models\Plan;
use App\Models\Provider;
use App\Models\Service;
use App\Models\SiteConfig;
use App\Models\Transaction;
use App\Models\User;
use App\Services\MobileAirtimeService;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DashboardController extends Controller
{
    public function index()
    {
        // User::find(1)->assignRole('super_admin');
        $services = Service::with('providers')->get();
        $providers = Provider::with('service', 'plans')->get();
        $plans = Plan::with('provider.service')->get();
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
        // return $request;
        if (!Hash::check($request->old_pin, $user->pin)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect PIN",
                "code" => "PIN_INCORRECT"
            ], 403);
        }
        $user->pin = bcrypt($request->pin);
        $user->pin_set = true;
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "PIN updated successfully",
        ],);
    }

    public function updatePassword(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            "old_password" => "required|string|min:4",
            "password" => "required|string|min:4"
        ]);
        if (!Hash::check($request->old_password, $user->password)) {

            return response()->json([
                "success" => false,
                "message" => "Incorrect Password",
                "code" => "PASSWORD_INCORRECT"
            ], 403);
        }
        $user->password = bcrypt($request->password);

        $user->save();
        
        //Dispatch event
        return response()->json([
            "success" => true,
            "message" => "Password updated successfully",
        ],);
    }
}
