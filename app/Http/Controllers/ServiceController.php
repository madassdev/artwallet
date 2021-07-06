<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Provider;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('providers')->get();
        $providers = Provider::with('service', 'plans')->get();
        $plans = Plan::with('provider.service')->get();
        // $providers = $plans->pluck('provider')->unique('id')->flatten();
        // return $providers;
        if (request()->wantsJson()) {
            return response()->json([
                "data" =>
                [
                    "services" => $services,
                    "providers" => $providers,
                    "plans" => $plans,
                ]
            ]);
        }
        // return $services;
        return view('admin.services.index', compact('services'));
    }
}
