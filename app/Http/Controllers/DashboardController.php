<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Plan;
use App\Models\Provider;
use App\Models\Service;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index()
    {
        // auth()->user()->balance = 4000;
        // auth()->user()->save();
        $services = Service::with('providers')->get();
        $providers = Provider::with('service', 'plans')->get();
        $plans = Plan::with('provider.service')->get();
        $transactions = Transaction::whereUserId(auth()->user()->id)->latest()->get();
        // return $transactions;
        $app_services = [
            "services" => $services,
            "providers" => $providers,
            "plans" => $plans,
        ];
        return view('dashboard.index', compact('app_services', 'transactions'));
    }
}
