<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class AppController extends Controller
{
    public function status()
    {
        ini_set('max_execution_time',1000 );
        Artisan::call('migrate:fresh', [
            '--seed' => true,
            '--force' => true
        ]);
        
        return dd(Artisan::output());
    }
    
    public function tesst()
    {
        Artisan::call('migrate:status', [
        ]);

        return dd(Artisan::output());
    }
}
