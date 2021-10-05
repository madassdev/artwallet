<?php

namespace App\Providers;

use App\Models\SiteConfig;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        URL::forceScheme('https');
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        URL::forceScheme('https');
        Schema::defaultStringLength(191);
        mock_buy(env("APP_ENV") === "local");
        try {
            //code...
            $sc = SiteConfig::wherePublic(true)->pluck('value', 'key');
            // dd($sc);
            config()->set(['sc' => $sc]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
