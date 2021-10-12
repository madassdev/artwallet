<?php

namespace App\Http\Controllers\Inertia;

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
        return inertia('User/Home');
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
