<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function credit()
    {
        return $this->morphOne(Transaction::class, 'creditable');
    }

    public static function uniqueRef()
    {
        return strtoupper('ORD-' . Str::random(6));
    }
}
