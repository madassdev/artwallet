<?php

namespace App\Services;

// use App\FlutterwaveConfig;
use App\Models\Payment;
// use App\Models\PaystackConfig;
use Illuminate\Support\Facades\Http;
use Throwable;


class PaymentService
{

    public static function processPayment($payment_method, $payment_reference)
    {
        switch ($payment_method) {
            case 'paystack':
                return self::verifyPaystack($payment_reference);
                break;


                // case 'flutterwave':
                //     return self::verifyFlutterwave($payment_reference);
                //     break;


                // case 'stripe':
                //     return self::stripeRetrieveIntent($payment_reference);
                //     break;


                // case 'paypal':
                //     return self::verifyPaypal($payment_reference);
                //     break;


            default:
                # code...
                break;
        }
    }

    public static function getPaystackSecretKey()
    {
        $paystack_secret_key = "sk_test_a335450a82025ce1b4143aebfad5351966dd658b";
        // if(config()->get('env') == "live")
        // {
        //     // Get key from config variable.
        //     $paystack_secret_key = config()->get('payment.paystack_secret_key');
        //     if(config()->get('client') == "store")
        //     {
        //         // Get key from database.
        //         $paystack_config = PaystackConfig::latest()->first();
        //         if($paystack_config)
        //         {
        //             $paystack_secret_key = $paystack_config->secret_key;
        //         }
        //         else{
        //             throw new ClientErrorException("Paystack secret key not found, or it has not been set by Admin.", 400);
        //         }

        //     }
        // }
        // elseif(config()->get('env') == 'test')
        // {
        //     $paystack_secret_key = config()->get('payment.paystack_secret_key_test');
        // }

        return $paystack_secret_key;
    }

    public static function authChargePaystack($auth_details)
    {
        $paystack_secret_key = self::getPaystackSecretKey();
        $url = "https://api.paystack.co/transaction/charge_authorization";
        $fields = [
            'authorization_code' => "AUTH_l7ogr49xtu",
            'email' => "ucylvester@gmail.com",
            'amount' => "10000"
        ];
        $fields_string = http_build_query($fields);
        //open connection
        $ch = curl_init();

        //set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Authorization: Bearer $paystack_secret_key",
            "Cache-Control: no-cache",
        ));

        //So that curl_exec returns the contents of the cURL; rather than echoing it
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        //execute post
        $response = curl_exec($ch);
        // echo $result;
        // if (!$response) {
        //     throw new PaystackPaymentNotVerifiedException("Unable to verify the transaction from paystack", 400);
        // }

        $transaction = json_decode($response);

        // if (!$transaction->status) {
        //     throw new PaystackPaymentNotVerifiedException("Payment could not be verifed. $response", 400);
        // }

        // if ($transaction->data->status != "success") {
        //     throw new PaystackPaymentNotVerifiedException("Paystack authorization payment failed. ", 400, 
        //     ['status'=>$transaction->data->status, 'gateway_response'=>$transaction->data->gateway_response]);
        // }

        return $transaction;
    }

    public static function verifyPaystack($reference)
    {
        $paystack_secret_key = self::getPaystackSecretKey();

        // dd(openssl_get_cert_locations());
        // reference AmasT234Android_1582026397815
        //secret sk_test_a335450a82025ce1b4143aebfad5351966dd658b

        $url = 'https://api.paystack.co/transaction/verify/' . $reference;
        $response = Http::withToken($paystack_secret_key)->get($url)->json();
        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt(
        //     $ch,
        //     CURLOPT_HTTPHEADER,
        //     [
        //         "Authorization: Bearer $paystack_secret_key"
        //     ]
        // );

        // $response = curl_exec($ch);
        // curl_close($ch);
        // if ($response === false) {
        //     dd([curl_error($ch), curl_errno($ch)]);
        // }
        // dd($response->body());
        // if (!$response) {
        //     throw new PaystackPaymentNotVerifiedException("Unable to verify the transaction from Paystack", 400);
        // }

        // $transaction = json_decode($response);

        // if (!$transaction->status) {
        //     throw new PaystackPaymentNotVerifiedException("Payment could not be verifed. $response", 400);
        // }

        // $amount = $transaction->data->amount / 100;

        // "authorization": {
        //     "authorization_code": "AUTH_5oxi8pggl1",
        //     "bin": "408408",
        //     "last4": "4081",
        //     "exp_month": "11",
        //     "exp_year": "2022",
        //     "channel": "card",
        //     "card_type": "visa ",
        //     "bank": "TEST BANK",
        //     "country_code": "NG",
        //     "brand": "visa",
        //     "reusable": true,
        //     "signature": "SIG_2UU0kYwkOh9IDD5LJ8O7",
        //     "account_name": null
        // },

        return $response;
    }

    // public static function validatePaystackKey($key)
    // {
    //     $url = 'https://api.paystack.co/plan';

    //     $ch = curl_init();
    //     curl_setopt($ch, CURLOPT_URL, $url);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    //     curl_setopt(
    //         $ch,
    //         CURLOPT_HTTPHEADER,
    //         [
    //             "Authorization: Bearer $key"
    //         ]
    //     );

    //     $response = curl_exec($ch);
    //     curl_close($ch);
    //     if (!$response) {
    //         throw new PaystackPaymentNotVerifiedException("Unable to get response from paystack", 400);
    //     }

    //     $response = json_decode($response);

    //     return $response;
    // }

    // FLUTTERWAVE

    // public static function getFlutterwaveSecretKey()
    // {
    //     $flutterwave_secret_key = "FLWSECK_TEST-e7bf74cf358956ef1e286db58bd3f5cf-X";
    //     if(config()->get('env') == "live")
    //     {
    //         // Get key from config variable.
    //         $flutterwave_secret_key = config()->get('payment.flutterwave_secret_key');
    //         if(config()->get('client') == "store")
    //         {
    //             // Get key from database.
    //             $flutterwave_config = FlutterwaveConfig::latest()->first();
    //             if($flutterwave_config)
    //             {
    //                 $flutterwave_secret_key = $flutterwave_config->secret_key;
    //             }
    //             else{
    //                 throw new ClientErrorException("Flutterwave secret key not found, or it has not been set by Admin.", 400);
    //             }

    //         }
    //     }
    //     elseif(config()->get('env') == 'test')
    //     {
    //         $flutterwave_secret_key = config()->get('payment.flutterwave_secret_key_test');
    //     }

    //     return $flutterwave_secret_key;
    // }

    // public static function verifyFlutterwave($reference)
    // {
    //     // Secret FLWSECK_TEST-e7bf74cf358956ef1e286db58bd3f5cf-X
    //     //enc 4f5744364561aef72362a608
    //     //ref 1423869
    //     //public FLWPUBK_TEST-475613beb5156a9a5c288a7caced8dc7-X
    //     $flutterwave_secret_key = self::getFlutterwaveSecretKey();
    //     $user = auth()->guard('api')->user();
    //     $curl = curl_init();

    //     curl_setopt_array($curl, array(
    //         CURLOPT_URL => "https://api.flutterwave.com/v3/transactions/$reference/verify",
    //         CURLOPT_RETURNTRANSFER => true,
    //         CURLOPT_ENCODING => "",
    //         CURLOPT_MAXREDIRS => 10,
    //         CURLOPT_TIMEOUT => 0,
    //         CURLOPT_FOLLOWLOCATION => true,
    //         CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    //         CURLOPT_CUSTOMREQUEST => "GET",
    //         CURLOPT_HTTPHEADER => array(
    //             "Content-Type: application/json",
    //             "Authorization: Bearer $flutterwave_secret_key"
    //             // "Authorization: Bearer FLWSECK_TEST-e7bf74cf358956ef1e286db58bd3f5cf-X"
    //         ),
    //     ));

    //     $response = curl_exec($curl);

    //     curl_close($curl);

    //     if (!$response) {
    //         throw new PaystackPaymentNotVerifiedException("Unable to verify the transaction from Flutterwave", 400);
    //     }

    //     $transaction = json_decode($response);

    //     if ($transaction->status != 'success') {
    //         throw new PaystackPaymentNotVerifiedException("Payment could not be verifed. $response", 400);
    //     }

    //     if ($transaction->data->customer->email != $user->email) {
    //         throw new PaystackPaymentNotVerifiedException("Payment could not be verifed for user. $response", 400);
    //     }

    //     return $transaction;
    //     return $transaction->data->amount;
    // }


}
