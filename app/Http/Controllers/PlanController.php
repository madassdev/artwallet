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
            "title" => "required|max:100|"
        ]);
        $provider = Provider::find($request->provider_id)->load('plans');
        $provider->plans()->create([
            "title" => $request->title,
            "price" => $request->price,
            "slug" => Str::slug($request->title),
        ]);
        return response()->json([
            "success" => true,
            "data" => [
                "provider" => $provider->load('plans')
            ]
        ]);
        return $request;
    }
}
