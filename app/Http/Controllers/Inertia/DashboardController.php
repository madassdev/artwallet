<?php

namespace App\Http\Controllers\Inertia;

use App\Events\PinSet;
use App\Http\Controllers\Controller;
use App\Services\MobileAirtimeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class DashboardController extends Controller
{
    public function __construct()
    {
        mock_buy();
    }

    public function index()
    {
        // sleep(3);
        // auth()->user()->balance = 2000;
        // auth()->user()->save();
        return inertia('User/Home');
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
        return redirect(route('dashboard.index'))->withSuccess('PIN saved successfully!');
        return response()->json([
            "success" => true,
            "message" => "PIN created successfully",
        ],);
    }

    public function checkPin(Request $request)
    {
        $user = auth()->user();
        if (Hash::check($request->pin, $user->pin)) {
            return response()->json([
                "success" => true,
                "message" => "PIN CORRECT",
                "code" => "PIN_CORRECT"
            ]);
        }

        return response()->json([
            "success" => false,
            "message" => "Incorrect PIN",
            "code" => "PIN_INCORRECT"
        ], 403);
    }

    public function showVerify()
    {
        if (!auth()->user()->email_verified_at) {
            return inertia("Auth/Verify");
        }

        return redirect(route('dashboard.index'))->withSuccess("Account verified successfully!");
    }

    public function settings()
    {
        return inertia("User/Settings");
    }
}
