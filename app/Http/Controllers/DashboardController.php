<?php

namespace App\Http\Controllers;

use App\Events\AgentRegistration;
use App\Events\PasswordUpdated;
use App\Events\PinSet;
use App\Events\PinUpdated;
use App\Models\Agent;
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
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class DashboardController extends Controller
{
    public function index()
    {
        // auth()->user()->email_verified_at = null;
        // auth()->user()->save();

        $user = auth()->user()->load('agent');
        // $user->agent->has_paid = false;
        // $user->agent->save();
        // return $user->agent;
        // auth()->user()->agent = null;
        // Agent::latest()->first()->update(['user_id' => 1, 'status' => 'pending']);
        $services = Service::with('providers')->get();
        $providers = Provider::with('service', 'plans.meta')->get();
        $plans = Plan::with('provider.service')->get();
        $app_services = [
            "services" => $services,
            "providers" => $providers,
            "plans" => $plans,
        ];
        return view('dashboard.index', compact('app_services'));
    }

    public function saveAgent(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            "business_cac" => "required|file|mimes:jpg,bmp,png,jpeg"
        ]);
        $path = "/";
        if ($request->hasFile('business_cac')) {
            $path = time() . 'user-'.$user->uniqid.'-cac.' . $request->business_cac->getClientOriginalExtension();
            $request->business_cac->move(public_path('/images/business_cacs'), $path);
            $image_url =  asset('/images/business_cacs/' . $path);
        }

        $agent = Agent::updateOrCreate(["user_id" => $user->id], $request->except(["business_cac"]) + ["business_cac" => $image_url]);
        event(new AgentRegistration($user));
        return response()->json([
            "success" => true,
            "message" => "Agent details saved successfully!",
            "data" => [
                "user" => $user->load('agent')
            ]
        ]);
    }


    public function setPin(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            "pin" => "required|numeric|digits:4"
        ]);

        $user->pin = bcrypt($request->pin);
        $user->pin_set = true;
        $user->save();

        PinSet::dispatch($user);
        return response()->json([
            "success" => true,
            "message" => "PIN created successfully",
        ],);
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

        PinUpdated::dispatch($user);
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

        PasswordUpdated::dispatch($user);
        return response()->json([
            "success" => true,
            "message" => "Password updated successfully",
        ],);
    }
}
