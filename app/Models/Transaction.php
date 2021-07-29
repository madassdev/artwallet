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
        "date",
        "reference",
    ];

    protected $casts = [
        "amount" => "float",
        "credit_data" => "array",
        "debit_data" => "array",
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

    public function getDateAttribute($value)
    {
        return (new Carbon($this->created_at))->format('d M Y, g:ia');
        // 10 Jan 2020, 10:45pm
    }

    public function getReferenceAttribute()
    {
        $reference = null;
        $reference = @$this->credit_data['reference'];
        // switch ($this->type) {
        //     case 'airtime':
        //         break;

        //     case 'data':
        //         $reference = @$this->credit_data['reference'];
        //         break;

        //     default:
        //         # code...
        //         break;
        // }
        return $reference;
    }

    // public function getHistorableTypeAttribute($value)
    // {
    //     if (is_null($value)) return ($value);
    //     return ($value . 'WithCompany');
    // }
}
