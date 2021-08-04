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

Route::get('/dashboard/auth/verify', 'DashboardController@index')->name('verification.show')->middleware('auth');
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
Route::domain($admin_subdomain)->group(function () {
    Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'role:admin']], function () {
        Route::get('/', 'SubAdminController@index');
        Route::get('/users', 'AdminController@getUsers');
        Route::get('/users/search', 'AdminController@searchUsers');
        Route::post('/users/find', 'AdminController@findUser');
        Route::put('/users/{user}', 'AdminController@updateUser');
        Route::put('/users/{user}/updateBalance', 'AdminController@updateUserBalance');
        Route::group(['middleware' => 'role:super_admin'], function () {
            Route::post('/make-admin', 'AdminController@makeAdmin');
            Route::get('/admin-activities', 'AdminController@adminActivities');
            Route::get('/admins', 'AdminController@getAdmins');
            Route::post('/admins', 'AdminController@createAdmin');
            Route::delete('/admins/{id}', 'AdminController@removeAdmin');
        });
    });
    Route::any(
        '{all?}',
        function () {
            abort(404);
        }
    )->where(['all' => '.*']);
});

Route::get('/', function () {
    return redirect('/dashboard');
})->middleware('auth');

Route::get('/test', 'AppController@test');

Route::group(['prefix' => 'dashboard', 'middleware' => ['auth', 'verified']], function () {
    Route::any(
        '{all?}',
        "DashboardController@index"
    )->where(['all' => '.*']);
});

Route::group(['prefix' => 'auth', 'middleware' => ['auth', 'verified']], function () {
    Route::post('update-pin', 'DashboardController@updatePin');
    Route::post('set-pin', 'DashboardController@setPin');
    Route::post('update-password', 'DashboardController@updatePassword');
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'role:admin']], function () {
    Route::get('/users', 'AdminController@getUsers');
    Route::get('/transactions', 'TransactionCOntroller@adminTransactions');
    Route::get('/users/search', 'AdminController@searchUsers');
    Route::post('/users/find', 'AdminController@findUser');
    Route::put('/users/{user}', 'AdminController@updateUser');
    Route::put('/users/{user}/updateBalance', 'AdminController@updateUserBalance');
    Route::group(['middleware' => 'role:super_admin'], function () {
        Route::post('/make-admin', 'AdminController@makeAdmin');
        Route::get('/admin-activities', 'AdminController@adminActivities');
        Route::get('/admins', 'AdminController@getAdmins');
        Route::post('/admins', 'AdminController@createAdmin');
        Route::delete('/admins/{id}', 'AdminController@removeAdmin');
    });
});
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::resource('services', 'ServiceController')->middleware('auth');
    Route::resource('orders', 'OrderController')->middleware('auth');
    Route::resource('transactions', 'TransactionController')->middleware('auth');
    Route::post('/orders/transfer', 'OrderController@transfer');
    Route::post('/orders/cable-tv', 'OrderController@cableTv');
    Route::post('/orders/airtime', 'OrderController@airtime');
    Route::post('/orders/electricity', 'OrderController@electricity');
    Route::post('/orders/data', 'OrderController@data');
    Route::post('/orders/electricity/verify', 'OrderController@verifyElectricity');
    Route::resource('providers', 'ProviderController')->middleware('auth');
    Route::resource('plans', 'PlanController')->middleware('auth');
    Route::resource('payments', 'PaymentController')->middleware('auth');
});

Route::get('/auth/otp', 'DashboardController@otpView')->middleware('auth')->name('otp.request');

Route::get('logout', 'Auth\LoginController@logout');

// require __DIR__.'/auth.php';

Auth::routes();
