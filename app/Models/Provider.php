<?php

namespace App\Models;

use IFrankSmith\Sluggable\Traits\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Provider extends Model
{
    use HasFactory, SoftDeletes, Sluggable;

    protected $fillable = [
        'service_id', 'title', 'description', 'slug'
    ];

    protected $appends = ['logo_image'];
    // protected $with = ['service'];

    public function plans()
    {
        return $this->hasMany(Plan::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function getLogoImageAttribute()
    {
        $logos = [
            "mtn" => asset('images/providers/mtn_logo.png'),
            "mtn-airtime" => asset('images/providers/mtn_logo.png'),
            "mtn_data" => asset('images/providers/mtn_logo.png'),
            "airtel" => asset('images/providers/airtel_logo.png'),
            "airtel-airtime" => asset('images/providers/airtel_logo.png'),
            "airtel-data" => asset('images/providers/airtel_logo.png'),
            "glo" => asset('images/providers/glo_logo.png'),
            "glo-airtime" => asset('images/providers/glo_logo.png'),
            "glo-data" => asset('images/providers/glo_logo.png'),
            "9mobile" => asset('images/providers/9mobile_logo.png'),
            "9mobile-airtime" => asset('images/providers/9mobile_logo.png'),
            "9mobile-data" => asset('images/providers/9mobile_logo.png'),
        ];

        return @$logos[$this->slug];
    }
}
