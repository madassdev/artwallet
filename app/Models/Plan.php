<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    // protected $with = ['provider'];

    protected $fillable = [
        'provider_id', 'title', 'description', 'price', 'min_price', 'max_price', 'slug', 'validity'
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
