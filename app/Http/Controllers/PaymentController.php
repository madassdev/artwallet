<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        // return $request;
        $tr = PaymentService::verifyPaystack($request->reference);
        return $tr;
        return response()->json($tr);

        // AR1625555091744
    }
}
