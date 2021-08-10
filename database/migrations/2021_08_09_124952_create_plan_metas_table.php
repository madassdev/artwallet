<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_metas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plan_id')->constrained()->cascadeOnDelete();
            $table->string('api_provider');
            $table->string('api_base_url');
            $table->string('plan_ref');
            $table->string('provider_ref');
            $table->integer('provider_min_price')->default(0);
            $table->integer('provider_max_price')->default(0);
            $table->boolean('current')->default(false);
            $table->string('api_provider_class')->nullable();
            $table->string('api_provider_method')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plan_metas');
    }
}
