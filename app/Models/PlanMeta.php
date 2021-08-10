<?php

namespace App\Models;

use App\Services\MobileAirtimeService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanMeta extends Model
{
    use HasFactory;

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public static function createForPlan(Plan $plan, $provider, $plan_ref)
    {
        $meta = PlanMeta::wherePlanId($plan->id)->whereApiProvider(strtoupper($provider))->firstOrNew();
        $meta->plan_ref = $plan_ref;
        $meta->provider_ref = $plan->provider->meta_ref ?? MobileAirtimeService::getClubProviderCode($plan->provider->slug);
        $meta->plan_id = $plan->id;
        $meta->api_provider = $provider;
        $meta->api_base_url = "https://www.nellobytesystems.com/APIDatabundleV1.asp";
        $meta->current = true;
        $meta->save();
    }
}
