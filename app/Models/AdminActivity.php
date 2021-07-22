<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminActivity extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        "target_data" => "array"
    ];

    protected $appends = ['date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function targetable()
    {
        return $this->morphTo();
    }

    public function getDateAttribute($value)
    {
        return (new Carbon($this->created_at))->format('d M Y, g:ia');
    }
}
