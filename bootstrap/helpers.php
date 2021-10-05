<?php

use App\Models\Plan;

function naira($value = null)
{
    return "₦" . number_format($value);
}

function mock_buy($value = true)
{
    config()->set('mock_buy', $value);
}

function isMock()
{
    return config('mock_buy');
}

function dataPlans()
{
    return Plan::with('meta')->get()->groupBy('provider_id');
}

function onboardBalance()
{
    return 20;
}

function agency_fee()
{
    return 10000;
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
    return (float) str_replace(",", "", $value);
}

function minimum_airtime()
{
    return 50;
}

function minimum_electricity()
{
    return 100;
}

function agent_price($amount)
{
    $discount = 3;
    return ((100 - $discount) / 100) * $amount;
}
function data_price($plan, $user)
{
    $price = $plan->price;
    if ($user->hasRole('agent')) {
        $price = agent_price($price);
    }

    return ceil($price);
}

function cable_tv_price($plan, $user)
{
    $price = $plan->price;
    if ($user->hasRole('agent')) {
        $price = agent_price($price);
    }

    return ceil($price);
}

function recharge_print_price($plan, $user, $quantity = 1)
{
    $price = $plan->price;
    return $price * $quantity;
    if ($user->hasRole('agent')) {
        $price = agent_price($price);
    }

    return ceil($price);
}

function internet_price($plan, $user)
{
    $price = $plan->price;
    if ($user->hasRole('agent')) {
        $price = agent_price($price);
    }

    return ceil($price);
}

function airtime_price($amount, $user)
{
    $price = $amount;
    if ($user->hasRole('agent')) {
        $price = agent_price($price);
    }

    return ceil($price);
}

function electricity_price($amount, $user)
{
    return $amount;
}

function electricity_charges()
{
    return 50;
}

function cable_tv_charges()
{
    return 50;
}

function data_charges()
{
    return 0;
}


function internet_charges()
{
    return 50;
}

function recharge_print_charges()
{
    return 50;
}


function airtime_charges()
{
    return 0;
}
