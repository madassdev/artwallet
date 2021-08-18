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

function onboardBalance()
{
    return 20;
}

function calculatePaystackCharges($amount)
{
    $flatRate = 0.015 * $amount;
    $total = $flatRate;
    if ($amount > 2500) {
        $total = $flatRate + 100;
    }

    return min($total, 2000);
}

function revertNumberFormat($value)
{
    return (float) str_replace(",","",$value);
}
