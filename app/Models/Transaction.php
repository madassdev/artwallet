<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        "date"
    ];

    protected $casts = [
        "amount" => "float"
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function debitable()
    {
        return $this->morphTo();
    }

    public function creditable()
    {
        return $this->morphTo();
    }

    public function getDateAttribute( $value ) {
        return (new Carbon($this->created_at))->format('d M Y, g:ia');
        // 10 Jan 2020, 10:45pm
      }
      

    // public function getHistorableTypeAttribute($value)
    // {
    //     if (is_null($value)) return ($value);
    //     return ($value . 'WithCompany');
    // }
}
