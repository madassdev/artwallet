<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    // protected $with = ['plan'];

    protected $casts = [
        'order_data' => 'array',
        'amount' => 'integer'
    ];

    protected $appends = [
        "date",
    ];

    
    public function getDateAttribute($value)
    {
        return (new Carbon($this->created_at))->format('d M Y');
        // 10 Jan 2020, 10:45pm
    }
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
