<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MobileAirtimeService
{

    public static function checkBalance()
    {
        $params = [
            "userid" => env("MOBILE_API_USERID"),
            "pass" => env("MOBILE_API_PASS")
        ];
        
        $url = "https://mobileairtimeng.com/httpapi/balance.php?";
        $response = Http::get($url, $params)->json();
        return $response;
    }

    public static function buyAirtime($providerSlug, $mobile, $amount, $reference =null)
    {
        // "userid=xxxx&pass=xxxx&network=x&phone=xxxxx&amt=xx&user_ref=xxx&jsn=json"
        $url = "https://mobileairtimeng.com/httpapi/";
        $params = [
            "userid" => env("MOBILE_API_USERID"),
            "pass" => env("MOBILE_API_PASS"),
            "user_ref" => $reference,
            "jsn" => "json",
            "network" => self::getProviderCode($providerSlug),
            "phone" => $mobile,
            "amt" => $amount,
        ];

        $response = Http::get($url, $params)->json();

        return $response;
    }

    public static function buyData($providerSlug, $mo)
    {
        $url = "https://mobileairtimeng.com/httpapi/datashare";
        // ?userid=xxxx&pass=xxxx&network=x&phone=xxxxx&datasize=xx&jsn=json&user_ref=xxx
        $params = [
            // "userid" => env("MOBILE_API_USERID"),
            // "pass" => env("MOBILE_API_PASS"),
            // "user_ref" => $reference,
            // "jsn" => "json"
        ];

    }

    public static function getProviderCode($providerSlug)
    {
        switch (strtolower($providerSlug)) {
            case 'mtn-airtime':
                return "15";
                break;
            
            case 'glo-airtime':
                return "6";
                break;
        
            case 'airtel-airtime':
                return "1";
                break;
    
            case '9mobile-airtime':
                return "2";
                break;
            case 'ibedc':
                return "BPE-NGIB-OR";
                break;
            
            default:
                return $providerSlug;
                break;
        }
    }

    public static function verifyElectricity($providerSlug, $meterno)
    {
        $url = "https://mobileairtimeng.com/httpapi/power-validate";
        $params = [
            "userid" => env("MOBILE_API_USERID"),
            "pass" => env("MOBILE_API_PASS"),
            "service" => self::getProviderCode($providerSlug),
            "meterno" => $meterno,
            "jsn" => "json",
        ];

        $response = Http::get($url, $params)->json();

        return $response;

    }
}
