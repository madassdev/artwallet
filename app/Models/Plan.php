<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    // protected $with = ['provider'];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
