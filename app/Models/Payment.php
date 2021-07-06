<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        "payment_data" => "array"
    ];
    public function debit()
    {
        return $this->morphOne(Transaction::class, 'debitable');
    }

    public function credit()
    {
        return $this->morphOne(Transaction::class, 'creditable');
    }
}
