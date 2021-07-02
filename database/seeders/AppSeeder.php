<?php

namespace Database\Seeders;

use App\Models\Provider;
use App\Models\Service;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //User

        $users = [
            [
                "name" => "Admin",
                "last_name" => "account",
                "email" => "admin@app.dev",
                "mobile" => "08088008808",
                "balance" => 200,
                "password" => bcrypt("password"),
            ],
            [
                "name" => "User",
                "last_name" => "account",
                "email" => "user@app.dev",
                "mobile" => "08088008808",
                "balance" => 0,
                "password" => bcrypt("password"),
            ],
            [
                "name" => "Level 1",
                "last_name" => "account",
                "email" => "level1@app.dev",
                "mobile" => "08088008808",
                "balance" => 100,
                "password" => bcrypt("password"),
            ],
            [
                "name" => "Level 2",
                "last_name" => "account",
                "email" => "level2@app.dev",
                "mobile" => "08088008808",
                "balance" => 100,
                "password" => bcrypt("password"),
            ],
        ];

        $roles = [
            [
                "name" => "admin",
                "guard_name" => "web"
            ],
            [
                "name" => "user",
                "guard_name" => "web"
            ],
            [
                "name" => "level1",
                "guard_name" => "web"
            ],
            [
                "name" => "level2",
                "guard_name" => "web"
            ]
        ];

        Role::insert($roles);

        User::insert($users);
        User::find(1)->assignRole('admin');
        User::find(2)->assignRole('user');
        User::find(3)->assignRole('level1');
        User::find(4)->assignRole('level2');

        $services = [
            [
                "title" => "Data",
                "description" => "Data Subscription"
            ],
            [
                "title" => "Airtime",
                "description" => "Airtime Purchase"
            ],
            [
                "title" => "Cable TV",
                "description" => "Cable TV Subscription"
            ]
        ];

        Service::insert($services);

        $providers = [
            [
                "service_id" => 1,
                "title" => "MTN Data"
            ],
            [
                "service_id" => 1,
                "title" => "GLO Data"
            ],
            [
                "service_id" => 1,
                "title" => "AIRTEL Data"
            ],
            [
                "service_id" => 1,
                "title" => "9mobile Data"
            ],
            [
                "service_id" => 2,
                "title" => "MTN Airtime"
            ],
            [
                "service_id" => 2,
                "title" => "GLO Airtime"
            ],
            [
                "service_id" => 2,
                "title" => "AIRTEL Airtime"
            ],
            [
                "service_id" => 2,
                "title" => "9mobile Airtime"
            ],
            [
                "service_id" => 3,
                "title" => "DSTV"
            ],
            [
                "service_id" => 3,
                "title" => "GOTV"
            ],
        ];

        Provider::insert($providers);

        $plans = [
            [
                "provider_id" => 1,
                "title" => "MTN 1GB",
                "price" => 400
            ],
            [
                "provider_id" => 1,
                "title" => "MTN 2GB",
                "price" => 800
            ],
            [
                "provider_id" => 2,
                "title" => "GLO 1GB",
                "price" => 420
            ],
            [
                "provider_id" => 2,
                "title" => "GLO 2GB",
                "price" => 820
            ],
            [
                "provider_id" => 1,
                "title" => "GLO 3GB",
                "price" => 1200
            ],
            [
                "provider_id" => 5,
                "title" => "MTN AIRTIME",
                "price" => 0
            ],
            [
                "provider_id" => 7,
                "title" => "AIRTEL AIRTIME",
                "price" => 0
            ],
            [
                "provider_id" => 10,
                "title" => "DSTV SUPER SUB 1 MONTH",
                "price" => 3000
            ],
        ];
        Plan::insert($plans);
    }
}
