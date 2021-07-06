<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('slug')->unique();
            $table->integer('price');
            $table->integer('min_price')->default(0);
            $table->integer('max_price')->default(0);
            $table->string('status')->default('active');
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
        Schema::dropIfExists('plans');
    }
}
