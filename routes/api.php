<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'test'], function () {
    Route::get('/seed', 'SubAdminController@test');
    Route::get('/migrate', 'AppController@migrate');
    Route::post('/orders/airtime', 'OrderController@airtime');
    Route::post('/orders/transfer', 'OrderController@transfer');
    Route::post('/orders/cable-tv', 'OrderController@cableTv');
    Route::post('/orders/electricity', 'OrderController@electricity');
    Route::post('/orders/internet', 'OrderController@internet');
    Route::post('/orders/data', 'OrderController@data');
    Route::post('/orders/recharge-print', 'OrderController@rechargePrint');
    Route::post('/orders/electricity/verify', 'OrderController@verifyElectricity');
    Route::post('/orders/cable-tv/verify', 'OrderController@verifyCable');
    Route::resource('plans', 'PlanController');
    Route::resource('providers', 'ProviderController');
    Route::get('/analytics', 'AdminController@salesAnalytics');
});
