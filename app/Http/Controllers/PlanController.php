<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PlanController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            "provider_id" => "required|exists:providers,id",
            "price" => "required|numeric|min:0",
            "title" => "required|max:100",
            "validity" => "string|max:100"
        ]);
        $provider = Provider::find($request->provider_id)->load('plans');
        $provider->plans()->create([
            "title" => $request->title,
            "price" => $request->price,
            "slug" => Str::slug($request->title),
            "validity" => $request->validity
        ]);
        return response()->json([
            "success" => true,
            "message" => "Plan created successfully",
            "data" => [
                "provider" => $provider->load('service','plans')
            ]
        ]);
        return $request;
    }

    public function update(Plan $plan, Request $request)
    {
        $request->validate([
            "price" => "required|numeric|min:0",
            "title" => "required|max:100",
            "validity" => "string|max:100"
        ]);

        $provider = Provider::find($plan->provider_id)->load('plans');

        $plan->update($request->all());
       
        return response()->json([
            "success" => true,
            "message" => "Plan updated successfully",
            "data" => [
                "provider" => $provider->load('service','plans')
            ]
        ]);
        return $request;
    }

    public function destroy(Plan $plan)
    {
        $provider = $plan->provider;
        $plan->delete();
        return response()->json([
            "success" => true,
            "message" => "Plan deleted successfully",
            "data" => [
                "provider" => $provider->load('service','plans')
            ]
        ]);
    }
}
