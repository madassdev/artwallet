<?php

use App\Events\AccountVerified;
use App\Models\User;
use App\Notifications\TestNotification;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

if (env("APP_ENV")) {
    // if (env("APP_ENV") == "local") {
    Route::prefix('demo')->middleware(['auth', 'verified'])->namespace('Inertia')->group(function () {
        // mock_buy();

        Route::get('/dashboard', 'DashboardController@index')->name('dashboard.index');
        Route::name('buy.')->prefix('buy')->group(function () {
            Route::get('/', 'BuyController@buy')->name('index');
            Route::get('/airtime', 'BuyController@buyAirtime')->name('airtime');
            Route::get('/data', 'BuyController@buyData')->name('data');
        });
        Route::name('bills.')->prefix('bills')->group(function () {
            Route::get('/', 'BuyController@bills')->name('index');
            Route::get('/cable-tv', 'BuyController@buyCableTv')->name('cable-tv');
            Route::get('/electricity', 'BuyController@buyElectricity')->name('electricity');
            Route::get('/internet', 'BuyController@buyInternet')->name('internet');
        });
        Route::name('orders.')->prefix('buy')->group(function () {
            Route::post('/airtime', 'OrderController@buyAirtime')->name('airtime.buy');
            Route::post('/data', 'OrderController@buyData')->name('data.buy');
            Route::post('/cable-tv', 'OrderController@buyCableTv')->name('cable-tv.buy');
            Route::post('/electricity', 'OrderController@buyElectricity')->name('electricity.buy');
            Route::post('/internet', 'OrderController@buyInternet')->name('internet.buy');
            Route::post('/transfer', 'OrderController@transfer')->name('transfer');
        });
        Route::name('wallet.')->prefix('wallet')->group(function () {
            Route::get('/', 'WalletController@index')->name('index');
            Route::get('/fund', 'WalletController@fund')->name('fund');
            Route::get('/transfer', 'WalletController@transfer')->name('transfer');
            Route::get('/history', 'WalletController@history')->name('history');
            Route::post('/fund/verify-paystack', 'WalletController@verifyPaystack')->name('fund.verify.paystack');
        });
        Route::name('auth.')->prefix('auth')->group(function () {
            Route::post('/check-pin', 'DashboardController@checkPin')->name('check-pin');
            Route::post('/set-pin', 'DashboardController@setPin')->name('set-pin');
            Route::get('/settings', 'DashboardController@settings')->name('settings.index');
        });
        Route::name('agent.')->prefix('agent')->group(function () {
            Route::get('/apply', 'AgentController@showApply')->name('apply');
            Route::get('/show-application', 'AgentController@showApplication')->name('show');
            Route::post('/apply', 'AgentController@submitApplication')->name('submit-application');
            Route::post('/pay', 'AgentController@agentPayment')->name('pay');
        });
    });
}
// Route::get('/verify', 'DashboardController@showVerify')->name('verification.show')->middleware('auth');
Route::name('validation.')->prefix('validation')->group(function () {
    Route::post('/user/mobile', 'VerificationController@userMobile')->name('user.mobile');
});
Route::get('/dashboard/auth/verify', 'Inertia\DashboardController@showVerify')->name('verification.show')->middleware('auth');
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.resend');

Route::get('/email/verify/{id}/{hash}', function ($user_id, Request $request) {
    if (!$request->hasValidSignature()) {
        return response()->json(["msg" => "Invalid/Expired url provided."], 401);
    }

    $user = User::findOrFail($user_id);

    if (!$user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
        Auth::login($user);
        AccountVerified::dispatch($user);
    }
    return redirect('/dashboard/verification-success');
})->middleware(['signed'])->name('verification.verify');


Route::get('/email/verify', function () {
    return redirect(route('verification.show'));
})->middleware('auth')->name('verification.notice');

Route::get('/verification/resend', 'UserController@resend')->middleware('auth');
Route::get('/verification/verify/{id}', 'UserController@verify')->middleware('auth');

$admin_subdomain = "control.artwallet.dv";
Route::get('/', function () {
    return redirect('/dashboard');
})->middleware('auth');

Route::post('/test', 'AppController@test');
Route::get('/test', 'AppController@Mocktest');
Route::get('/migrate', 'AppController@migrate');
Route::get('/seed', 'AppController@seed');

Route::group(['prefix' => 'dashboard', 'middleware' => ['auth', 'verified']], function () {
    Route::any(
        '{all?}',
        "DashboardController@index"
    )->where(['all' => '.*'])->name('dashboard');
});

Route::group(['prefix' => 'auth', 'middleware' => ['auth', 'verified']], function () {
    Route::post('update-pin', 'DashboardController@updatePin');
    Route::post('set-pin', 'DashboardController@setPin');
    Route::post('update-password', 'DashboardController@updatePassword');
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'role:admin']], function () {
    Route::get('/users', 'AdminController@getUsers');
    Route::get('/sales/analytics', 'AdminController@salesAnalytics');
    Route::get('/transactions', 'TransactionController@adminTransactions');
    Route::get('/users/search', 'AdminController@searchUsers');
    Route::post('/users/find', 'AdminController@findUser');
    Route::put('/users/{user}', 'AdminController@updateUser');
    Route::put('/users/{user}/updateBalance', 'AdminController@updateUserBalance');
    Route::put('/users/{user}/credit-user', 'AdminController@creditUserBalance');
    Route::group(['middleware' => 'role:super_admin'], function () {
        Route::post('/make-admin', 'AdminController@makeAdmin');
        Route::get('/admin-activities', 'AdminController@adminActivities');
        Route::get('/admins', 'AdminController@getAdmins');
        Route::post('/admins', 'AdminController@createAdmin');
        Route::delete('/admins/{id}', 'AdminController@removeAdmin');
        Route::group(['prefix' => 'agents'], function () {
            Route::get('/', 'AgentController@index');
            Route::post('/{agent}', 'AgentController@agentAction');
        });
    });
});
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::post('save-agent', 'DashboardController@saveAgent');
    Route::resource('services', 'ServiceController')->middleware('auth');
    Route::resource('transactions', 'TransactionController')->middleware('auth');
    Route::post('/orders/transfer', 'OrderController@transfer');
    Route::post('/orders/cable-tv', 'OrderController@cableTv');
    Route::post('/orders/airtime', 'OrderController@airtime');
    Route::post('/orders/electricity', 'OrderController@electricity');
    Route::post('/orders/internet', 'OrderController@internet');
    Route::post('/orders/recharge-print', 'OrderController@rechargePrint');
    Route::get('/orders/recharge-print', 'OrderController@rechargePrints');
    Route::get('/orders/recharge-print/{order}', 'OrderController@fetchRechargePrints');
    Route::post('/orders/data', 'OrderController@data');
    Route::post('/orders/electricity/verify', 'OrderController@verifyElectricity');
    Route::post('/orders/cable-tv/verify', 'OrderController@verifyCable');
    Route::post('/orders/internet/verify', 'OrderController@verifyInternet');
    Route::resource('providers', 'ProviderController')->middleware('auth');
    Route::resource('plans', 'PlanController')->middleware('auth');
    Route::post('payments', 'PaymentController@store')->middleware('auth');
    Route::post('payments/agent', 'PaymentController@agent')->middleware('auth');
    Route::resource('orders', 'OrderController')->middleware('auth');
});

Route::get('/auth/otp', 'DashboardController@otpView')->middleware('auth')->name('otp.request');

Route::get('logout', 'Auth\LoginController@logout');

// require __DIR__.'/auth.php';

Auth::routes();
Route::get('/agent-registration', 'Auth\AgentRegisterController@showRegistrationForm');
