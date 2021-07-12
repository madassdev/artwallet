<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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

Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'role:admin']], function () {
    Route::any(
        '{all?}',
        "DashboardController@index"
    )->where(['all' => '.*']);
});
Route::get('/test', 'ServiceController@index');
Route::resource('services', 'ServiceController')->middleware('auth');
Route::resource('orders', 'OrderController')->middleware('auth');
Route::post('/orders/transfer', 'OrderController@transfer');
Route::resource('providers', 'ProviderController')->middleware('auth');
Route::resource('payments', 'PaymentController')->middleware('auth');

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
