<?php

namespace App\Http\Controllers;

use App\Models\AdminActivity;
use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProviderController extends Controller
{
    public function index()
    {
        $providers = Provider::latest()->with('plans', 'service')->get();
        if (request()->wantsJson()) {
            return response()->json([
                "data" => $providers
            ]);
        }
        // return $services;
        return view('admin.providers.index', compact('providers'));
    }

    public function store(Request $request)
    {

        $provider = Provider::create([
            'service_id' => $request->service_id,
            'title' => $request->title,
            'description' => $request->description,
            "slug" => Str::slug($request->title),

        ]);

        AdminActivity::create([
            "user_id" => auth()->id(),
            "targetable_id" => $provider->id,
            "targetable_type" => Provider::class,
            "target_data" => $provider,
            "type" => "provider-create",
            "status" => "success"
        ]);

        $provider->load('plans', 'service');
        return response()->json([
            'data' => $provider
        ]);
    }

    public function update(Request $request, Provider $provider)
    {
        // AdminActivity::create([
        //     "user_id" => auth()->id(),
        //     "targetable_id" => $plan->id,
        //     "targetable_type" => Plan::class,
        //     "target_data" => [
        //         "before" => $plan,
        //         "after" => $plan_copy
        //     ],
        //     "type" => "plan-update",
        //     "status" => "success"
        // ]);
    }

    public function destroy(Provider $provider)
    {


        AdminActivity::create([
            "user_id" => auth()->id(),
            "targetable_id" => $provider->id,
            "targetable_type" => Provider::class,
            "target_data" => $provider,
            "type" => "provider-delete",
            "status" => "success"
        ]);

        $provider->delete();
        return response()->json([
            "message" => 'Provider deleted successfully'
        ]);
    }
}
