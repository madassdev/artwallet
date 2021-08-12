<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PlanMeta;
use App\Models\Plan;
use App\Models\Provider;
use App\Models\Service;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class CablePlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $service = Service::whereSlug('cable-tv')->first();
        Provider::updateOrCreate([
            "slug" => "startimes",
        ], [
            "service_id" => $service->id,
            "title" => "Startimes",
            "slug" => "startimes"
        ]);
        $url = "https://www.nellobytesystems.com/APICableTVPackagesV2.asp";
        $response = Http::get($url)->json();

        return collect([
            ["slug" => "dstv", "api" => "DStv"],
            ["slug" => "gotv", "api" => "GOtv"],
            ["slug" => "startimes", "api" => "Startimes"]
        ])->map(function ($d) use ($response) {
            // return $d;
            $provider = Provider::whereSlug($d['slug'])->first();
            $api_provider = $response['TV_ID'][$d["api"]];
            $api_plans = $api_provider[0]['PRODUCT'];
            $xx = collect($api_plans)->map(function ($p) use ($provider) {
                $title = $p["PACKAGE_NAME"];
                $slug =  Str::slug($title);
                $plan = Plan::whereProviderId($provider->id)->whereSlug($slug)->firstOrNew();
                $validity = "DAYS";
                $ref = $p["PACKAGE_ID"];
                $price = $p["PACKAGE_AMOUNT"];
                $plan->provider_id = $provider->id;
                $plan->title = $title;
                $plan->validity = $validity;
                $plan->price = $price;
                $plan->slug = $slug;
                $plan->save();
                PlanMeta::createForPlan($plan, "CLUBKONNECT", $ref);
                return $plan;
            });
            return $api_plans;
        });
    }
}
