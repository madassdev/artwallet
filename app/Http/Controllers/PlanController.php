<?php

namespace App\Http\Controllers;

use App\Models\AdminActivity;
use App\Models\Plan;
use App\Models\PlanMeta;
use App\Models\Provider;
use App\Services\MobileAirtimeService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PlanController extends Controller
{
    public function store(Request $request)
    {
        // return 123;
        $request->validate([
            "provider_id" => "required|exists:providers,id",
            "price" => "required|numeric|min:0",
            "title" => "required|max:100",
            "validity" => "string|max:100",
            "meta" => "array"
        ]);


        

        $provider = Provider::find($request->provider_id)->load('plans');

        $plan = $provider->plans()->create([
            "title" => $request->title,
            "price" => $request->price,
            "slug" => Str::slug($request->title),
            "validity" => $request->validity
        ]);

        if ($request->meta) {
            $api_provider = @$request['api_provider'] ?? "CLUBKONNECT";
            PlanMeta::createForPlan($plan, $api_provider, $request->meta['api_ref']);
        }

        AdminActivity::create([
            "user_id" => auth()->id(),
            "targetable_id" => $plan->id,
            "targetable_type" => Plan::class,
            "target_data" => $plan,
            "type" => "plan-create",
            "status" => "success"
        ]);
        return response()->json([
            "success" => true,
            "message" => "Plan created successfully",
            "data" => [
                "provider" => $provider->load('service', 'plans')
            ]
        ]);
    }

    public function update(Plan $plan, Request $request)
    {
        $plan_copy = $plan;
        $request->validate([
            "price" => "required|sometimes|numeric|min:0",
            "title" => "required|max:100",
            "validity" => "string|max:100"
        ]);

        $provider = Provider::find($plan->provider_id)->load('plans');

        // return $plan->meta;
        if ($request->meta) {
            $api_provider = 'CLUBKONNECT';
            PlanMeta::createForPlan($plan, $api_provider, $request->meta['api_ref']);
            
        }

        $plan->update($request->all());
        $plan->save();
        

        AdminActivity::create([
            "user_id" => auth()->id(),
            "targetable_id" => $plan->id,
            "targetable_type" => Plan::class,
            "target_data" => [
                "before" => $plan,
                "after" => $plan_copy
            ],
            "type" => "plan-update",
            "status" => "success"
        ]);

        return response()->json([
            "success" => true,
            "message" => "Plan updated successfully",
            "data" => [
                "provider" => $provider->load('service', 'plans')
            ]
        ]);
        return $request;
    }

    public function destroy(Plan $plan)
    {
        $provider = $plan->provider;
        AdminActivity::create([
            "user_id" => auth()->id(),
            "targetable_id" => $plan->id,
            "targetable_type" => Plan::class,
            "target_data" => $plan,
            "type" => "plan-delete",
            "status" => "success"
        ]);
        $plan->delete();
        return response()->json([
            "success" => true,
            "message" => "Plan deleted successfully",
            "data" => [
                "provider" => $provider->load('service', 'plans')
            ]
        ]);
    }
}
