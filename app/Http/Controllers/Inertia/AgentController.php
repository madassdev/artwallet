<?php

namespace App\Http\Controllers\Inertia;

use App\Events\AgentRegistration;
use App\Http\Controllers\Controller;
use App\Models\Agent;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function index()
    {
    }

    public function showApply()
    {
        return inertia("Agent/Index");
    }

    public function submitApplication(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            "business_cac" => "required|file|mimes:jpg,bmp,png,jpeg"
        ]);
        $path = "/";
        if ($request->hasFile('business_cac')) {
            $path = time() . 'user-' . $user->uniqid . '-cac.' . $request->business_cac->getClientOriginalExtension();
            $request->business_cac->move(public_path('/images/business_cacs'), $path);
            $image_url =  asset('/images/business_cacs/' . $path);
        }

        $agent = Agent::updateOrCreate(["user_id" => $user->id], $request->except(["business_cac"]) + ["business_cac" => $image_url]);
        event(new AgentRegistration($user));
        return redirect(route('dashboard.index'))->withSuccess("Agent Application submitted successfully");
        return response()->json([
            "success" => true,
            "message" => "Agent details saved successfully!",
            "data" => [
                "user" => $user->load('agent')
            ]
        ]);
    }
}
