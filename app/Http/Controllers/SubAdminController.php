<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubAdminController extends Controller
{
    public function index()
    {
        return inertia('Admin/Index');
    }
}
