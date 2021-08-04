<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        if ($request->type) {
            $type = $request->type;
            if (auth()->user()->is_admin) {
                $transactions = Transaction::whereType($type)->latest()->paginate(10);
            } else {

                $transactions = Transaction::whereUserId(auth()->id())->whereType($type)->latest()->paginate(10);
            }
        } else {
            if (auth()->user()->is_admin) {
                $transactions = Transaction::latest()->paginate(10);
            } else {

                $transactions = Transaction::whereUserId(auth()->id())->latest()->paginate(10);
            }

        }
        return response()->json(
            [
                "data" => [
                    "transactions" => $transactions
                ]
            ]
        );
    }

    public function adminTransactions(Request $request)
    {
        if ($request->type) {
            $type = $request->type;
            $transactions = Transaction::whereType($type)->latest()->paginate(10);
        } else {

            $transactions = Transaction::latest()->paginate(10);
        }
        return response()->json(
            [
                "data" => [
                    "transactions" => $transactions
                ]
            ]
        );
    }
}
