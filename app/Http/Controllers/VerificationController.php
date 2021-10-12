<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function userMobile(Request $request)
    {
        $request->validate([
            "mobile" => "required|numeric"
        ]);

        $user = User::whereMobile($request->mobile)->first();
        if (!$user) {

            return response()->json([
                "success" => false,
                "message" => "User with mobile ".$request->mobile." does not exist",
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "User found",
            "data" => [
                "user" => $user
            ]
        ]);
        return redirect()->back()->withErrors([
            "message" => "Unable to verify user",
            "code" => "PIN_INCORRECT"
        ]);
    }
}
