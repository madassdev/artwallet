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
    // protected $with = ['service'];

    public function plans()
    {
        return $this->hasMany(Plan::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
