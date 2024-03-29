<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function credits()
    {
        return $this->morphOne(Transaction::class, 'creditable');
    }

    public function debits()
    {
        return $this->morphMany(Transaction::class, 'debitable');
    }
}
