<?php

use App\Models\Transaction;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RecipientUpdatesToTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->string('recipient')->default('wallet');
        });
        Schema::table('orders', function (Blueprint $table) {
            $table->renameColumn('destination', 'recipient');
        });

        Transaction::with('creditable')->get()->map(function ($t) {
            $t->recipient = $t->creditable->recipient;
            if ($t->type == "deposit") {
                $t->recipient = "wallet";
            }
            if ($t->type == "credit") {
                $t->recipient = $t->debitable->mobile;
            }
            if ($t->type == "transfer") {
                $t->recipient = $t->creditable->mobile;
            }
            $t->save();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transactions', function (Blueprint $table) {
            //
        });
    }
}
