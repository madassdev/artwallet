<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class BuyController extends Controller
{
    //

    public function buy()
    {
        return inertia('Buy/Buy');
    }

    public function bills()
    {
        return inertia('Buy/Bills');
    }

    public function buyAirtime()
    {
        $providers = Service::whereSlug('airtime')->with('providers.plans')->first()->providers;
        return inertia("Buy/Airtime", compact('providers'));
    }
    public function buyData()
    {
        $providers = Service::whereSlug('data')->with('providers.plans')->first()->providers;
        return inertia("Buy/Data", compact('providers'));
    }

    public function buyCableTv()
    {
        $providers = Service::whereSlug('cable-tv')->with('providers.plans')->first()->providers;
        return inertia("Buy/CableTv", compact('providers'));
    }
    public function buyElectricity()
    {
        $providers = Service::whereSlug('electricity')->with('providers.plans')->first()->providers;
        return inertia("Buy/Electricity", compact('providers'));
    }
}
