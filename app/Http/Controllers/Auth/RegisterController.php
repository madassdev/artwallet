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


class RegisterController extends Controller
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
            'first_name' => ['required', 'string', 'max:30'],
            'last_name' => ['required', 'string', 'max:30'],
            'email' => ['required', 'string', 'email', 'max:30', 'unique:users'],
            'mobile' => ['required', 'numeric', 'digits:11', 'unique:users,mobile'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'referrer' => [],
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
        $user = User::create([
            "name" => $data["first_name"],
            "last_name" => $data["last_name"],
            "mobile" => $data["mobile"],
            "email" => $data['email'],
            "password" => bcrypt($data["password"])
        ]);
        return $user;
    }

    public function showRegistrationForm()
    {

        $ref = User::whereEmail(request()->ref)->first() ? request()->ref : null;

        return view('auth.register')->with('ref', $ref);
    }
}
