<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin.index');
    }

    public function findUser(Request $request)
    {
        $user = User::whereEmail($request->term)->orWhere('uniqid', $request->term)->orWhere('mobile',$request->term)->first();
        if ($user) {
            return response()->json([
                "success" => true,
                "data" => [
                    "user" => $user
                ]
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "User not found"
            ], 404);
        }
    }

    public function updateUser(Request $request, User $user)
    {
        if($request->has('balance')){
            $user->balance = $request->balance;
            $user->save();
        }

        return response()->json([
            "success" => true,
            "message" => "User updated successfully",
            "data" => [
                "user" => $user
            ]
        ]);
    }
}
