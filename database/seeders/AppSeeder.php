<?php

namespace Database\Seeders;

use App\Models\Provider;
use App\Models\Service;
use App\Models\User;
use App\Models\Plan;
use App\Models\SiteConfig;
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

        $configs = [
            [
                'key' => 'mobile_airtime_user',
                'value' => '08054659872',
                'public' => false,
            ],
            [
                'key' => 'mobile_airtime_password',
                'value' => 'd741e1a4d8530de4e2d0216',
                'public' => false,
            ],
            [
                'key' => 'clubkonnect_user_id',
                'value' => 'CK100321230',
                'public' => false,
            ],
            [
                'key' => 'clubkonnect_api_key',
                'value' => '3M53K9PG0V5S0602FWFLF1Y399W9L34NEPH3JR290J612950J7L6S6C9WVHH0YAQ',
                'public' => false,
            ],
            [
                'key' => 'paystack_secret_key_test',
                'value' => 'sk_test_a335450a82025ce1b4143aebfad5351966dd658b',
                "public" => false
            ],
            [
                'key' => 'paystack_secret_key_live',
                'value' => 'sk_live_de970995dc57832776f73f0cdbf4f4617157a346',
                "public" => false
            ],
            [
                'key' => 'paystack_public_key_test',
                'value' => 'pk_test_ebd6435d808e02ac14eb40d514d9d13bba875309',
                'public' => true,
            ],
            [
                'key' => 'paystack_public_key_live',
                'value' => 'pk_live_742409cf979217ebff037717c93afebfa9b14158',
                'public' => true,
            ],
            [
                "key" => "deposit_account_bank",
                "value" => "Guaranty Trust Bank",
                "public" => true,
            ],
            [
                "key" => "deposit_account_name",
                "value" => "Articulate Technologies Concept",
                "public" => true,
            ],
            [
                "key" => "deposit_account_number",
                "value" => "0010933715",
                "public" => true,
            ],
            [
                'key' => 'cable_tv_fees',
                'value' => '50',
                'public' => true,
            ],
            [
                'key' => 'electricity_fees',
                'value' => '50',
                'public' => true,
            ],
            [
                'key' => 'airtime_bonus_percent',
                'value' => '1',
                'public' => true,
            ],
        ];

        collect($configs)->map(function ($config) {
            return SiteConfig::updateOrCreate(['key' => $config['key']], $config + ['status' => 'active']);
        });

        // $users = [
        //     [
        //         "uniqid" => 15170,
        //         "name" => "Admin",
        //         "last_name" => "account",
        //         "email" => "artwallet@artwallet.com.ng",
        //         "mobile" => "08000000000",
        //         "balance" => 200,
        //         "password" => bcrypt("inter123..."),
        //         "pin" => bcrypt("1122")
        //     ],
        //     [
        //         "uniqid" => 15171,
        //         "name" => "User",
        //         "last_name" => "account",
        //         "email" => "user@app.dev",
        //         "mobile" => "08011111111",
        //         "balance" => 0,
        //         "password" => bcrypt("password"),
        //         "pin" => bcrypt("1122")
        //     ],
        //     [
        //         "uniqid" => 15172,
        //         "name" => "Level 1",
        //         "last_name" => "account",
        //         "email" => "level1@app.dev",
        //         "mobile" => "08022222222",
        //         "balance" => 500,
        //         "password" => bcrypt("password"),
        //         "pin" => bcrypt("1122")
        //     ],
        //     [
        //         "uniqid" => 15173,
        //         "name" => "Level 2",
        //         "last_name" => "account",
        //         "email" => "level2@app.dev",
        //         "mobile" => "08033333333",
        //         "balance" => 100,
        //         "password" => bcrypt("password"),
        //         "pin" => bcrypt("1122")
        //     ],
        // ];

        // $roles = [
        //     [
        //         "name" => "super_admin",
        //         "guard_name" => "web"
        //     ],
        //     [
        //         "name" => "admin",
        //         "guard_name" => "web"
        //     ],
        //     [
        //         "name" => "user",
        //         "guard_name" => "web"
        //     ],
        //     [
        //         "name" => "level1",
        //         "guard_name" => "web"
        //     ],
        //     [
        //         "name" => "level2",
        //         "guard_name" => "web"
        //     ]
        // ];

        // Role::insert($roles);

        // User::insert($users);
        // User::find(1)->assignRole('super_admin');
        // User::find(1)->assignRole('admin');
        // User::find(2)->assignRole('user');
        // User::find(3)->assignRole('level1');
        // User::find(4)->assignRole('level2');
        // $user =User::find(1);
        // $user->email_verified_at = "2021-07-29 00:00:00";
        // $user->pin_set = true;
        // $user->save();

        // $services = [
        //     [
        //         "title" => "Data",
        //         "description" => "Data Subscription",
        //         "slug" => "data",
        //     ],
        //     [
        //         "title" => "Airtime",
        //         "description" => "Airtime Purchase",
        //         "slug" => "airtime",
        //     ],
        //     [
        //         "title" => "Cable TV",
        //         "description" => "Cable TV Subscription",
        //         "slug" => "cable-tv",
        //     ],
        //     [
        //         "title" => "Electricity",
        //         "description" => "Electricity",
        //         "slug" => "electricity",
        //     ]
        // ];

        // Service::insert($services);

        // $providers = [
        //     [
        //         "service_id" => 1,
        //         "title" => "MTN Data",
        //         "slug" => "mtn-data",
        //     ],
        //     [
        //         "service_id" => 1,
        //         "title" => "GLO Data",
        //         "slug" => "glo-data",
        //     ],
        //     [
        //         "service_id" => 1,
        //         "title" => "AIRTEL Data",
        //         "slug" => "airtel-data",
        //     ],
        //     [
        //         "service_id" => 1,
        //         "title" => "9mobile Data",
        //         "slug" => "9mobile-data",
        //     ],
        //     [
        //         "service_id" => 2,
        //         "title" => "MTN Airtime",
        //         "slug" => "mtn-airtime",
        //     ],
        //     [
        //         "service_id" => 2,
        //         "title" => "GLO Airtime",
        //         "slug" => "glo-airtime",
        //     ],
        //     [
        //         "service_id" => 2,
        //         "title" => "AIRTEL Airtime",
        //         "slug" => "airtel-airtime",
        //     ],
        //     [
        //         "service_id" => 2,
        //         "title" => "9mobile Airtime",
        //         "slug" => "9mobile-airtime",
        //     ],
        //     [
        //         "service_id" => 3,
        //         "title" => "DSTV",
        //         "slug" => "dstv",
        //     ],
        //     [
        //         "service_id" => 3,
        //         "title" => "GOTV",
        //         "slug" => "gotv",
        //     ],
        //     [
        //         "service_id" => 4,
        //         "title" => "IBEDC",
        //         "slug" => "ibedc",
        //     ],
        //     [
        //         "service_id" => 4,
        //         "title" => "EKEDC",
        //         "slug" => "ekedc",
        //     ],
        // ];

        // Provider::insert($providers);

        // $airtime_plans = [

        //     [
        //         "provider_id" => 5,
        //         "title" => "MTN AIRTIME",
        //         "slug" => "mtn-airtime",
        //         "price" => 0
        //     ], [
        //         "provider_id" => 6,
        //         "title" => "GLO AIRTIME",
        //         "slug" => "glo-airtime",
        //         "price" => 0
        //     ],
        //     [
        //         "provider_id" => 7,
        //         "title" => "AIRTEL AIRTIME",
        //         "slug" => "airtel-airtime",
        //         "price" => 0
        //     ], [
        //         "provider_id" => 8,
        //         "title" => "9MOBILE AIRTIME",
        //         "slug" => "9mobile-airtime",
        //         "price" => 0
        //     ],
        // ];

        // Plan::insert($airtime_plans);
    }
}
