<?php

namespace App\Http\Controllers;

use App\Models\AdminActivity;
use App\Models\Order;
use App\Models\User;
use App\Services\MobileAirtimeService;
use Illuminate\Http\Request;
use Throwable;

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

    public function getUsers()
    {
        $per_page = request()->per_page ?? 2;
        $users = User::paginate($per_page);
        return response()->json([
            "success" => true,
            "data" => [
                "users" => $users,
                "total" => 300
            ]
        ]);
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

    public function salesAnalytics()
    {
        $data = Order::whereType("data")->get();
        $airtime = Order::whereType("airtime")->get();
        $cable_tv = Order::whereType("cable-tv")->get();
        $electricity = Order::whereType("electricity")->get();
        $club_balance = 6515.5;
        if (strtolower(env('APP_ENV')) === "production") {
            try {
                $club_balance = MobileAirtimeService::getClubBalance()['balance'];
            } catch (Throwable $th) {
                $club_balance = "Unable to fetch";
            }
        }
        return response()->json([
            "success" => true,
            "data" => [
                "clubkonnect_balance" => revertNumberFormat($club_balance),
                "data" => [
                    "success" => $data->where('status', 'complete')->count(),
                    "success_sum" => $data->where('status', 'complete')->sum('amount'),
                    "failed" => $data->where('status', 'failed')->count(),
                    "failed_sum" => $data->where('status', 'failed')->sum('amount'),
                ],
                "airtime" => [
                    "success" => $airtime->where('status', 'complete')->count(),
                    "success_sum" => $airtime->where('status', 'complete')->sum('amount'),
                    "failed" => $airtime->where('status', 'failed')->count(),
                    "failed_sum" => $airtime->where('status', 'failed')->sum('amount'),
                ],
                "cable_tv" => [
                    "success" => $cable_tv->where('status', 'complete')->count(),
                    "success_sum" => $cable_tv->where('status', 'complete')->sum('amount'),
                    "failed" => $cable_tv->where('status', 'failed')->count(),
                    "failed_sum" => $cable_tv->where('status', 'failed')->sum('amount'),
                ],
                "electricity" => [
                    "success" => $electricity->where('status', 'complete')->count(),
                    "success_sum" => $electricity->where('status', 'complete')->sum('amount'),
                    "failed" => $electricity->where('status', 'failed')->count(),
                    "failed_sum" => $electricity->where('status', 'failed')->sum('amount'),
                ],
            ]
        ]);
    }
    public function creditUserBalance(Request $request, User $user)
    {
        $user_copy = $user;
        $user->balance = $user->balance + $request->credit;
        $user->save();

        AdminActivity::create([
            "user_id" => auth()->id(),
            "targetable_id" => $user->id,
            "targetable_type" => User::class,
            "target_data" => [
                "before" => $user_copy,
                "after" => $user,
            ],
            "type" => "user-balance-credit",
            "status" => "success"
        ]);

        return response()->json([
            "success" => true,
            "message" => "User credited successfully",
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
            "type" => "admin-create",
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
        $activities = AdminActivity::with('user', 'targetable')->latest()->paginate(20);
        return response()->json(
            [
                "data" => [
                    "activities" => $activities
                ]
            ]
        );
    }
}
