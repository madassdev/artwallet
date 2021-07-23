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
            "type" => "admin-create",
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

    public function getAdmins()
    {
        $admins = User::role(['admin', 'super_admin'])->get();
        return response()->json([
            "data" => [
                "admins" => $admins
            ]
        ]);
    }

    public function createAdmin(Request $request)
    {
        $user = User::find($request->user_id);
        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "User not found",
            ], 404);
        }
        $user_copy = $user->load('roles');
        if (!$user->hasRole('admin')) {
            
            $user->assignRole('admin');
        }

        $activity = AdminActivity::create([
            "user_id" => auth()->id(),
            "targetable_id" => $user->id,
            "targetable_type" => User::class,
            "target_data" => [
                "before" => $user_copy,
                "after" => $user->load('roles'),
            ],
            "type" => "user-balance-update",
            "status" => "success"
        ]);


        return response()->json([
            "success" => true,
            "message" => "User Account Updated Successfully",
            "data" => [
                "user" => $user,
                "activity" => $activity,
            ]
        ]);
    }
    
    public function removeAdmin($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "User not found",
            ], 404);
        }
        $user_copy = $user->load('roles');
        if ($user->hasRole('admin')) {

            $user->removeRole('admin');
        }

        $activity = AdminActivity::create([
            "user_id" => auth()->id(),
            "targetable_id" => $user->id,
            "targetable_type" => User::class,
            "target_data" => [
                "before" => $user_copy,
                "after" => $user->load('roles'),
            ],
            "type" => "admin-remove",
            "status" => "success"
        ]);


        return response()->json([
            "success" => true,
            "message" => "User Account Updated Successfully",
            "data" => [
                "user" => $user,
                "activity" => $activity,
            ]
        ]);
    }

    public function adminActivities()
    {
        $activities = AdminActivity::with('user', 'targetable')->latest()->paginate(3);
        return response()->json(
            [
                "data" => [
                    "activities" => $activities
                ]
            ]
        );
    }
}
