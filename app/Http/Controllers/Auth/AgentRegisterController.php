<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\MailSender;
use App\Notifications\DepositConfirmedNotification;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;


class AgentRegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        // dd($data);
        return Validator::make($data, [
            'first_name' => ['required', 'string', 'max:300'],
            'last_name' => ['required', 'string', 'max:300'],
            'email' => ['required', 'string', 'email', 'max:300', 'unique:users'],
            'mobile' => ['required', 'numeric', 'digits:11', 'unique:users,mobile'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'referral_code' => [],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $last_user = User::orderBy('uniqid', 'DESC')->first();
        $referrer = User::whereReferralCode(@$data['referral_code'])->first();
        // return dd($referrer);
        $user = User::create([
            "name" => $data["first_name"],
            "last_name" => $data["last_name"],
            "mobile" => $data["mobile"],
            "email" => $data['email'],
            "password" => bcrypt($data["password"]),
            "uniqid" => $last_user->uniqid + 1,
            // "referrer" => @$referrer->email
        ]);
        $user->generate_referral_code();
        return $user;
    }

    public function showRegistrationForm()
    {
        return view('auth.agent-register');
    }
}
