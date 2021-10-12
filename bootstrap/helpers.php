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



function agent_price($amount, $package = [
    "type" => "percentage",
    "value" => [
        "user" => 0,
        "agent" => 0
    ]
])
{
    $discount = $package["value"]["agent"];
    return ((100 - $discount) / 100) * $amount;
}

function user_price($amount, $package = [
    "type" => "percentage",
    "value" => [
        "user" => 0,
        "agent" => 0
    ]
])
{
    $discount = $package["value"]["user"];
    return ((100 - $discount) / 100) * $amount;
}


// RECHARGE PRINT

function recharge_print_price($plan, $user, $quantity = 1)
{
    $price = $plan->price;
    return $price * $quantity;
    if ($user->hasRole('agent')) {
        $price = agent_price($price);
    }

    return ceil($price);
}

function recharge_print_charges()
{
    return 50;
}



//INTERNET
function internet_price($plan, $user)
{
    $price = $plan->price;
    if ($user->hasRole('agent')) {
        $price = agent_price($price, internet_discount());
    }

    return ceil($price);
}

function internet_charges()
{
    $user = auth()->user();
    if ($user->hasRole('agent')) {
        return 50;
    } else {
        return 100;
    };
    return 50;
}

function internet_discount()
{
    return [
        "type" => "percentage",
        "value" => [
            "user" => 0,
            "agent" => 0
        ]
    ];
}


// ELECTRICITY
function minimum_electricity()
{
    return 100;
}

function electricity_price($amount, $user)
{
    $price = $amount;
    if ($user->hasRole('agent')) {
        $price = agent_price($price, electricity_discount());
    }

    return ceil($price);
}

function electricity_charges()
{
    $user = auth()->user();
    if ($user->hasRole('agent')) {
        return 50;
    } else {
        return 100;
    };
    return 50;
}

function electricity_discount()
{
    return [
        "type" => "percentage",
        "value" => [
            "user" => 0,
            "agent" => 0
        ]
    ];
}


// CABLE TV

function cable_tv_charges()
{
    $user = auth()->user();
    if ($user->hasRole('agent')) {
        return 50;
    } else {
        return 100;
    };
}


function cable_tv_price($plan, $user)
{
    $price = $plan->price;
    if ($user->hasRole('agent')) {
        $price = agent_price($price, cable_tv_discount());
    }

    return ceil($price);
}



function cable_tv_discount()
{
    return [
        "type" => "percentage",
        "value" => [
            "user" => 0,
            "agent" => 0
        ]
    ];
}


//DATA

function dataPlans()
{
    return Plan::with('meta')->get()->groupBy('provider_id');
}


function data_charges()
{
    return 0;
    $user = auth()->user();
    if ($user->hasRole('agent')) {
        return 50;
    } else {
        return 100;
    };
}


function data_price($plan, $user)
{
    $price = $plan->price;
    if ($user->hasRole('agent')) {
        $price = agent_price($price, data_discount());
    } else {
        $price = user_price($price, data_discount());
    }

    return ($price);
}


function data_discount()
{
    return [
        "type" => "percentage",
        "value" => [
            "user" => 1,
            "agent" => 3.5
        ]
    ];
}



//AIRTIME

function airtime_price($amount, $user)
{
    $price = $amount;
    if ($user->hasRole('agent')) {
        $price = agent_price($price, airtime_discount());
    } else {
        $price = user_price($price, airtime_discount());
    }

    return ceil($price);
}


function minimum_airtime()
{
    return 50;
}


function airtime_charges()
{
    return 0;
    $user = auth()->user();
    if ($user->hasRole('agent')) {
        return 50;
    } else {
        return 100;
    };
}

function airtime_discount()
{
    return [
        "type" => "percentage",
        "value" => [
            "user" => 1,
            "agent" => 3
        ]
    ];
}
