<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('providers')->get();
        // return $services;
        if(request()->wantsJson()){
            return response()->json([
                "data" => $services
            ]);
        }
        // return $services;
        return view('admin.services.index', compact('services'));
    }
}
