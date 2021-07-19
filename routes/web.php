<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
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

Route::get('/', function () {
    return view('front.index');
});

Route::group(['prefix' => 'dashboard', 'middleware' =>[ 'auth',]], function () {
    Route::any(
        '{all?}',
        "DashboardController@index"
    )->where(['all' => '.*']);
});

Route::group(['prefix' => 'auth', 'middleware' =>[ 'auth', 'verified']], function () {
    Route::post('update-pin', 'DashboardController@updatePin');
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'role:admin']], function () {
    Route::any(
        '{all?}',
        "DashboardController@index"
    )->where(['all' => '.*']);
});
Route::get('/test', 'ServiceController@index');
Route::resource('services', 'ServiceController')->middleware('auth');
Route::resource('orders', 'OrderController')->middleware('auth');
Route::resource('transactions', 'TransactionController')->middleware('auth');
Route::post('/orders/transfer', 'OrderController@transfer');
Route::post('/orders/cable-tv', 'OrderController@cableTv');
Route::post('/orders/electricity', 'OrderController@electricity');
Route::resource('providers', 'ProviderController')->middleware('auth');
Route::resource('plans', 'PlanController')->middleware('auth');
Route::resource('payments', 'PaymentController')->middleware('auth');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.resend');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify');


Route::get('/email/verify', function () {
    return view('auth.verify');
})->middleware('auth')->name('verification.notice');

// Route::name('admin.')->prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('/', 'AdminController@index');
//     Route::resource('/services', 'ServiceController');
//     Route::get('/', 'AdminController@index');
//     Route::resource('/providers', 'ProviderController');
// });


Route::get('template', function () {
    return view('template');
});

Route::get('/auth/otp', 'DashboardController@otpView')->middleware('auth')->name('otp.request');

Route::get('logout', 'Auth\LoginController@logout');

Auth::routes();
