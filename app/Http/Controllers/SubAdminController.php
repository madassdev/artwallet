<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Plan;
use App\Models\PlanMeta;
use App\Models\Provider;
use App\Models\Service;
use App\Models\Transaction;
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
        
        // $service = Service::create([
        //     "title" => 'Internet',
        //     "slug" => 'internet'
        // ]);

        // $service->providers()->create([
        //     "title" => "Smile Direct",
        //     "slug" => "smile-direct"
        // ]);

        $provider = Provider::whereSlug("smile-direct")->first();
        $url = "https://www.nellobytesystems.com/APISmilePackagesV2.asp";
        $response = Http::get($url)->json();
        $plans = collect($response['MOBILE_NETWORK']['smile-direct'][0]['PRODUCT']);
        // return $plans;
        return $plans->map(function($p) use ($provider){
            $pname = ($p['PACKAGE_NAME']);
            $plan_name = explode('***', str_replace("s - ", "s***", $pname))[0];
            if($plan_name == "Buy Airtime")
            {
                $plan_name = "Buy Airtime for 0days";
            }

            [$title, $validity] = explode('**', str_replace(" for ", "**", $plan_name)); 

            $validity = str_replace('days', ' days', $validity);
            $price = revertNumberFormat($p['PACKAGE_AMOUNT']);
            $slug =  Str::slug($title.' '.$validity);
            $ref = $p["PACKAGE_ID"];
            $plan = new Plan();
            $plan->provider_id = $provider->id;
            $plan->title = $title;
            $plan->validity = $validity;
            $plan->price = $price;
            $plan->slug = $slug;
            $plan->ref = $ref;
            // $plan->save();
            // PlanMeta::createForPlan($plan, "CLUBKONNECT", $ref);
            return $plan;
           
        });
        return $provider;


        return Service::with('providers')->latest()->first();
        return "golden silence";
    }
}
