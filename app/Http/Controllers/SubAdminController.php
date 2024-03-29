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

        $service = 'Recharge Print';
        $service = Service::updateOrCreate([
            'title' => $service
        ], [
            'title' => $service
        ]);


        return $service->load('providers.plans.meta');

        $providers = collect([
            "MTN Recharge Print" => "01",
            "GLO Recharge Print" => "02",
            "AIRTEL Recharge Print" => "04",
            "9MOBILE Recharge Print" => "03",
        ]);

        return $providers->map(function ($provider_index, $provider) use ($service) {
            $pr = $service->providers()->updateOrCreate(
                [
                    "title" => $provider,

                ],
                [
                    "title" => $provider,
                ]
            );


            $plans = collect([100, 200, 500]);

            return $plans->map(function ($plan) use ($pr, $provider_index) {
                $title = explode(' ', $pr->title)[0];
                $pl = $pr->plans()->updateOrCreate(
                    [
                        "title" => $title . " $plan RECHARGE",
                    ],
                    [
                        "title" => $title . " $plan RECHARGE",
                        "validity" => 0,
                        "price" => $plan,
                    ]
                );
                $plan_meta = [
                    "api_provider" => "CLUBKONNECT",
                    "api_base_url" => "https://www.nellobytesystems.com/APIEPINV1.asp",
                    "plan_ref" => $plan,
                    "provider_ref" => $provider_index,
                    "current" => true
                ];
                // return $plan_meta;
                $pl->meta()->updateOrCreate(["plan_id" => $pl->id], $plan_meta);
                return $pl;
            });
        });
    }
}
