<?php

namespace App\Models;

use IFrankSmith\Sluggable\Traits\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    use HasFactory, Sluggable, SoftDeletes;

    // protected $with = ['provider'];

    protected $fillable = [
        'provider_id', 'title', 'description', 'price', 'min_price', 'max_price', 'slug', 'validity'
    ];

    protected $appends = [
        'api_ref'
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    public function meta()
    {
        return $this->hasMany(PlanMeta::class);
    }

    public function getApiRefAttribute()
    {
        $found_meta = $this->meta->where('current',true)->first();
        
        return $found_meta->plan_ref ?? $this->slug;
    }
}
