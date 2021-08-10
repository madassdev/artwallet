<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\PlanMeta;
use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;


class SubAdminController extends Controller
{
    public function index()
    {
        return inertia('Admin/Index');
    }

    public function test()
    {
        // return naira();

        return dataPlans();
        $network = "mtn";
        $provider = Provider::whereSlug($network)->orWhere('slug', $network . '-data')->first();
        // return $provider;
        return Plan::whereProviderId($provider->id)->get()->map(function ($p){
            $p->delete();
        });
        $url = "https://www.nellobytesystems.com/APIDatabundlePlansV1.asp";

        $response = Http::get($url)->json();
        $mtn = $response['MOBILE_NETWORK']["MTN"];

        // return $mtn;
        return collect($mtn[0]["PRODUCT"])->map(function ($p) use ($provider) {
            $plan = new Plan();
            [$title, $validity] = explode('-', str_replace(" - ", "-", $p["PRODUCT_NAME"]));
            $ref = $p["PRODUCT_ID"];
            $price = $p["PRODUCT_AMOUNT"];
            $slug =  Str::slug($title.' '.$validity);
            $plan->provider_id = $provider->id;
            $plan->title = $title;
            $plan->validity = $validity;
            $plan->price = $price;
            $plan->slug = $slug;
            $plan->save();
            PlanMeta::createForPlan($plan, $provider, $ref);
            return $plan;
        });
    }
}
