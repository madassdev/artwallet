<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = ['plan'];

    protected $casts = [
        'order_data' => 'array'
    ];

    public function credit()
    {
        return $this->morphOne(Transaction::class, 'creditable');
    }
    public function debit()
    {
        return $this->morphOne(Transaction::class, 'debitable');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public static function uniqueRef()
    {
        return strtoupper('ORD-' . Str::random(6));
    }
}
