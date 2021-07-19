<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::whereUserId(auth()->id())->latest()->paginate(10);
        return response()->json(
            [
                "data" => [
                    "transactions"=>$transactions
                ]
            ]
        );
    }
}
