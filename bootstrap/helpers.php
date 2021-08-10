<?php

use App\Models\Plan;

function naira($value = null)
{
    return "₦$value";
}

function dataPlans()
{
    return Plan::with('meta')->get()->groupBy('provider_id');
}