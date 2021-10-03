<?php

namespace App\Models;

use IFrankSmith\Sluggable\Traits\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes, Sluggable;

    protected $guarded = [];

    public function providers()
    {
        return $this->hasMany(Provider::class);
    }
}
