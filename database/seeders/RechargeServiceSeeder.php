<?php

namespace Database\Seeders;

use App\Models\Provider;
use App\Models\Service;
use Illuminate\Database\Seeder;

class RechargeServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
                        "price" => $plan
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
