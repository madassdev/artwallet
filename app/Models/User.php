<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
        'mobile',
        'uniqid',
        'referrer',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'pin',
        'pin_updated_at'
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
        "is_super_admin",
        "full_name",
        "date"
    ];


    public function getRoleAttribute()
    {
        return $this->roles->pluck('name')->toArray();
    }

    public function getIsAdminAttribute()
    {
        return $this->roles->where('name', 'admin')->count() ? true : false;
    }

    public function getIsSuperAdminAttribute()
    {
        return $this->roles->where('name', 'super_admin')->count() ? true : false;
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

    public function getDateAttribute($value)
    {
        return (new Carbon($this->created_at))->format('d M Y, g:ia');
        // 10 Jan 2020, 10:45pm
    }

    public function getRouteKeyName()
    {
        return "uniqid";
    }

    public function generate_referral_code()
    {
        $this->referral_code = strtoupper(substr($this->name, 0, 3) . rand(99, 999));
        $this->save();
    }

    public function getRefAttribute()
    {
        return @User::whereEmail(@$this->referrer)->orWhere('referral_code', @$this->referrer)->first();
    }
}
