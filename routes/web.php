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

Route::group(['prefix' => 'dashboard', 'middleware' => 'auth'], function () {
    Route::any('{all?}', function($slug = null){
        return view('dashboard.index');
    })->where(['all' => '.*']);
});
Route::get('template', function(){
    return view('template');
});

Route::get('logout', 'Auth\LoginController@logout');

Auth::routes();