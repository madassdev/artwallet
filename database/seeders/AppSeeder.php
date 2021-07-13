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
                "description" => "Data Subscription",
                "slug" => "data",
            ],
            [
                "title" => "Airtime",
                "description" => "Airtime Purchase",
                "slug" => "airtime",
            ],
            [
                "title" => "Cable TV",
                "description" => "Cable TV Subscription",
                "slug" => "cable-tv",
            ],
            [
                "title" => "Electricity",
                "description" => "Electricity",
                "slug" => "electricity",
            ]
        ];

        Service::insert($services);

        $providers = [
            [
                "service_id" => 1,
                "title" => "MTN Data",
                "slug" => "mtn-data",
            ],
            [
                "service_id" => 1,
                "title" => "GLO Data",
                "slug" => "glo-data",
            ],
            [
                "service_id" => 1,
                "title" => "AIRTEL Data",
                "slug" => "airtel-data",
            ],
            [
                "service_id" => 1,
                "title" => "9mobile Data",
                "slug" => "9mobile-data",
            ],
            [
                "service_id" => 2,
                "title" => "MTN Airtime",
                "slug" => "mtn-airtime",
            ],
            [
                "service_id" => 2,
                "title" => "GLO Airtime",
                "slug" => "glo-airtime",
            ],
            [
                "service_id" => 2,
                "title" => "AIRTEL Airtime",
                "slug" => "airtel-airtime",
            ],
            [
                "service_id" => 2,
                "title" => "9mobile Airtime",
                "slug" => "9mobile-airtime",
            ],
            [
                "service_id" => 3,
                "title" => "DSTV",
                "slug" => "dstv",
            ],
            [
                "service_id" => 3,
                "title" => "GOTV",
                "slug" => "gotv",
            ],
            [
                "service_id" => 4,
                "title" => "IBEDC",
                "slug" => "ibedc",
            ],
            [
                "service_id" => 4,
                "title" => "PHCN",
                "slug" => "phcn",
            ],
        ];

        Provider::insert($providers);

        $plans = [
            [
                "provider_id" => 1,
                "title" => "MTN 1GB",
                "slug" => "mtn-1gb",
                "price" => 400
            ],
            [
                "provider_id" => 1,
                "title" => "MTN 2GB",
                "slug" => "mtn-2gb",
                "price" => 800
            ],
            [
                "provider_id" => 2,
                "title" => "GLO 1GB",
                "slug" => "glo-1gb",
                "price" => 420
            ],
            [
                "provider_id" => 2,
                "title" => "GLO 2GB",
                "slug" => "glo-2gb",
                "price" => 820
            ],
            [
                "provider_id" => 2,
                "title" => "GLO 3GB",
                "slug" => "glo-3gb",
                "price" => 1200
            ],
            [
                "provider_id" => 5,
                "title" => "MTN AIRTIME",
                "slug" => "mtn-airtime",
                "price" => 0
            ],
            [
                "provider_id" => 7,
                "title" => "AIRTEL AIRTIME",
                "slug" => "airtel-airtime",
                "price" => 0
            ],
            [
                "provider_id" => 9,
                "title" => "DSTV SUPER SUB 1 MONTH",
                "slug" => "dstv-super-sub-1-month",
                "price" => 5000
            ],
            [
                "provider_id" => 10,
                "title" => "GOTV SUPER SUB 1 MONTH",
                "slug" => "gotv-super-sub-1-month",
                "price" => 3000
            ],
            [
                "provider_id" => 11,
                "title" => "IBEDC",
                "slug" => "ibedc",
                "price" => 0
            ],
            [
                "provider_id" => 12,
                "title" => "PHCN",
                "slug" => "phcn",
                "price" => 0
            ],
        ];
        Plan::insert($plans);
    }
}
