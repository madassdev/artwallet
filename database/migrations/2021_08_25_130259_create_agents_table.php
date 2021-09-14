<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string("name")->nullable();
            $table->string("last_name")->nullable();
            $table->string("email")->nullable();
            $table->string("mobile")->nullable();
            $table->text("address")->nullable();
            $table->string("state")->nullable();
            $table->string("lga")->nullable();
            $table->string("business_name")->nullable();
            $table->string("business_email")->nullable();
            $table->string("business_mobile")->nullable();
            $table->text("business_address")->nullable();
            $table->string("business_offering")->nullable();
            $table->string("business_nin")->nullable();
            $table->string("business_bvn")->nullable();
            $table->string("business_cac")->nullable();
            $table->string("status")->default('pending');
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
        Schema::dropIfExists('agents');
    }
}
