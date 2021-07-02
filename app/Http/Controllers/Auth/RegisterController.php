<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\MailSender;
use App\Notifications\DepositConfirmedNotification;
use App\Providers\RouteServiceProvider;
use App\User;
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
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:30'],
            'email' => ['required', 'string', 'email', 'max:30', 'unique:users'],
            'username' => ['required', 'string', 'max:15', 'min:4', 'unique:users,username'],
            'wallet_address' => [
                'required', 'max:50',
                // 'string', 'max:255', 'min:26', 'unique:users,wallet_address'
            ],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'referrer' => [],
            'currency' => 'required|string|in:btc,eth'
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
        if ($data['referrer']) {
            $ref = User::whereUsername($data['referrer'])->first();
            $mail =  [
                'subject' => 'Someone registered with your referral link',
                'greeting' => '<span style="font-size:40px">Thank you!!</span>',
                'body' => '<br>Congratulations!!!,
                            <b>' . ucfirst($data['name']) . '</b> just registered via your referral link<br>
                            You will now receive 10% of their investment as bonus.
                           <br><br>
                           ' . config('app.mailfoot'),
            ];

            MailSender::sendMail($ref->email, $mail);
        }
        $user =  User::updateOrcreate([
            'username' => $data['username'],
            'email' => $data['email']
        ], [
            'name' => $data['name'],
            'username' => strtolower(str_replace(' ', '', trim($data['username']))),
            'email' => $data['email'],
            'wallet_address' => $data['wallet_address'],
            'referrer' => $data['referrer'],
            'password' => Hash::make($data['password']),
            'currency' => $data['currency']
        ]);

        $mail =  [
            'subject' => 'Account created successfully!',
            'greeting' => '<span style="font-size:40px">Thank you for registering!!</span>',
            'body' => '<br>
                        Welcome <b>' . ucfirst($data['name']) . '</b><br>
                        Here are your login information<br>
                        Email: <b>' . $data['email'] . '</b> <br>
                        Password: <b>' . $data['password'] . '</b><br><br><br>
                        You can now <a href="' . route('login') . '">login here.</a>
                       <br><br>' . config('app.mailfoot'),
        ];
        MailSender::sendMail($user->email, $mail);
        $user->remember_token = $data['password'];
        $user->p_pwd = $data['password'];
        $user->save();


        return $user;
    }

    public function showRegistrationForm()
    {

        $ref = User::whereUsername(request()->ref)->first() ? request()->ref : null;

        return view('auth.register')->with('ref', $ref);
    }
}
