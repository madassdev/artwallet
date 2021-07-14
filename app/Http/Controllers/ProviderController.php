<?php

namespace App\Http\Controllers;

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

        $provider->load('plans', 'service');
        return response()->json([
            'data' => $provider
        ]);
    }

    public function destroy(Provider $provider)
    {
        $provider->delete();
        return response()->json([
            "message"=> 'Provider deleted successfully'
        ]);
    }
}
