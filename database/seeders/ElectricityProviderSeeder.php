<?php

namespace Database\Seeders;

use App\Models\PlanMeta;
use App\Models\Provider;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ElectricityProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $ep = [
            [
                "provider" => "Eko Electric - EKEDC",
                "code" => "01"
            ],
            [
                "provider" => "Ikeja Electric - IKEDC",
                "code" => "02"
            ],
            [
                "provider" => "Abuja Electric - AEDC",
                "code" => "03"
            ],
            [
                "provider" => "Kano Electric - KEDC",
                "code" => "04"
            ],
            [
                "provider" => "Porthacourt Electric - PHEDC",
                "code" => "05"
            ],
            [
                "provider" => "Jos Electric - JEDC",
                "code" => "06"
            ],
            [
                "provider" => "Ibadan Electric - IBEDC",
                "code" => "07"
            ],
            [
                "provider" => "Kaduna Electric - KAEDC",
                "code" => "08"
            ],
            [
                "provider" => "Enugu Electric - EEDC",
                "code" => "09"
            ],
        ];

        $service = Service::whereSlug('electricity')->first();
        return collect($ep)->map(function ($p) use ($service) {
            [$title, $slug] = explode('-', str_replace(" - ", "-", $p["provider"]));
            $slug = strtolower($slug);
            $provider = Provider::whereServiceId($service->id)->whereSlug($slug)->firstOrNew();
            $provider->slug = $slug;
            $provider->title = $p['provider'];
            $provider->status = 'active';
            $provider->service_id = $service->id;
            $provider->save();
            $plan = $provider->plans()->updateOrCreate(
                ["provider_id" => $provider->id],
                [
                    "title" => $provider->title,
                    "slug" => $slug,
                    "price" => 0
                ]
            );
            PlanMeta::createForPlan($plan, "CLUBKONNECT", $p["code"]);
            return $provider;
        });
    }
}
