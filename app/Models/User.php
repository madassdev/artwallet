<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        "balance" => "float"
    ];

    protected $appends = [
        "role",
        "is_admin",
        "full_name"
    ];


    public function getRoleAttribute()
    {
        return $this->roles->pluck('name')->toArray();
    }

    public function getIsAdminAttribute()
    {
        return $this->roles->where('name', 'admin')->count() ? true : false;
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function credits()
    {
        return $this->morphOne(Transaction::class, 'creditable');
    }

    public function debits()
    {
        return $this->morphMany(Transaction::class, 'debitable');
    }

    public function getFullNameAttribute()
    {
        return ucfirst($this->name . ' ' . $this->last_name);
    }
}
