<?php

use App\Models\SiteConfig;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SiteConfigUpdatesToSiteConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::dropIfExists('site_configs');
        // Schema::create('site_configs', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('key');
        //     $table->text('value')->nullable();
        //     $table->string('status')->default('active');
        //     $table->boolean('public')->default(false);
        //     $table->timestamps();
        // });

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('site_configs', function (Blueprint $table) {
            //
        });
    }
}
