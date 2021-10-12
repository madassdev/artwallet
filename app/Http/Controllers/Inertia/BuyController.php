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
        $charges  = airtime_charges();
        $minimum_value = minimum_airtime();
        $discount  = airtime_discount();
        $providers = Service::whereSlug('airtime')->with('providers.plans')->first()->providers;

        return inertia("Buy/Airtime", compact('providers', 'charges', 'discount', 'minimum_value'));
    }
    public function buyData()
    {

        $charges  = data_charges();
        $discount  = data_discount();
        $providers = Service::whereSlug('data')->with('providers.plans')->first()->providers;
        return inertia("Buy/Data", compact('providers', 'charges', 'discount'));
    }

    public function buyCableTv()
    {
        $charges  = cable_tv_charges();
        $discount  = cable_tv_discount();
        $providers = Service::whereSlug('cable-tv')->with('providers.plans')->first()->providers;
        return inertia("Buy/CableTv", compact('providers', 'charges', 'discount'));
    }



    public function buyInternet()
    {
        
        $charges  = internet_charges();
        $discount  = internet_discount();
        $providers = Service::whereSlug('internet')->with('providers.plans')->first()->providers;
        return inertia("Buy/Internet", compact('providers', 'charges', 'discount'));
    }


    public function buyElectricity()
    {
        $charges  = electricity_charges();
        $minimum_value = minimum_electricity();
        $discount  = electricity_discount();
        $providers = Service::whereSlug('electricity')->with('providers.plans')->first()->providers;
        return inertia("Buy/Electricity", compact('providers', 'charges', 'discount', 'minimum_value'));
    }
}
