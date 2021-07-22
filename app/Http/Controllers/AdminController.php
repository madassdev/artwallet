<?php

namespace App\Http\Controllers;

use App\Models\AdminActivity;
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
        $user = User::whereEmail($request->term)->orWhere('uniqid', $request->term)->orWhere('mobile', $request->term)->first();
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

    public function updateUserBalance(Request $request, User $user)
    {
        $user_copy = $user;
        $user->balance = $request->balance;
        $user->save();

        AdminActivity::create([
            "user_id" => auth()->id(),
            "targetable_id" => $user->id,
            "targetable_type" => User::class,
            "target_data" => [
                "before" => $user_copy,
                "after" => $user,
            ],
            "type" => "user-balance-update",
            "status" => "success"
        ]);

        return response()->json([
            "success" => true,
            "message" => "User updated successfully",
            "data" => [
                "user" => $user
            ]
        ]);
    }

    public function adminActivities()
    {
        $activities = AdminActivity::with('user', 'targetable')->latest()->paginate(3);
        return response()->json(
            [
                "data" => [
                    "activities"=>$activities
                ]
            ]
        );
    }
}
