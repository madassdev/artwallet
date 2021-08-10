<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FreshPlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $airtime_plans = [
            "MTN AIRTIME",
            "GLO AIRTIME",
            "9MOBILE AIRTIME",
            "AIRTEL AIRTIME",
        ];

        $club_mtn_plans = [
            ["500MB", "30 DAYS", 149, ""],
            ["1GB", "30 DAYS", 250],
            ["2GB", "30 DAYS", 500],
            ["5GB", "30 DAYS", 1250],
            ["10GB", "30 DAYS", 2465],
            ["1.5GB", "30 DAYS", 315],
            ["1GB", "30 DAYS", 250],
            ["1GB", "30 DAYS", 250],
            ["1GB", "30 DAYS", 250],
            ["1GB", "30 DAYS", 250],
            ["1GB", "30 DAYS", 250],
            ["1GB", "30 DAYS", 250],
            ["1GB", "30 DAYS", 250],
            ["1GB", "30 DAYS", 250],
        ];

    }
}
