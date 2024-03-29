<?php

namespace App\Services;

use App\Models\SiteConfig;
use Illuminate\Support\Facades\Http;

class MobileAirtimeService
{
   
    public static function getClubAuthDetails()
    {
        $club_user_id = @SiteConfig::where('key', 'clubkonnect_user_id')->first()->value ?? "CK100321230";
        $club_api_key = @SiteConfig::where('key', 'clubkonnect_api_key')->first()->value ?? "3M53K9PG0V5S0602FWFLF1Y399W9L34NEPH3JR290J612950J7L6S6C9WVHH0YAQ";
        return [
            "UserID" => $club_user_id,
            "APIKey" => $club_api_key
        ];
    }

    public static function getClubBalance()
    {
        $url = "https://www.nellobytesystems.com/APIWalletBalanceV1.asp?";
        $params = self::getClubAuthDetails();
        $response = Http::get($url, $params)->json();

        return $response;
    }
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

    public static function buyClubAirtime($providerSlug, $mobile, $amount, $reference = null, $mock = false)
    {
        if (isMock()) {
            return [
                "success" => true,
                "message" => "MOCK_AIRTIME_ORDER_RECEIVED",
                "code" => "MOCK_SUCCESS_CODE",
                "api_response" => [],
            ];
        }
        // dd('awo Lo');

        $url = "https://www.nellobytesystems.com/APIAirtimeV1.asp";

        $params = [
            "MobileNetwork" => self::getClubProviderCode($providerSlug),
            "Amount" => $amount,
            "MobileNumber" => $mobile,
            "RequestID" => $reference,

        ] + self::getClubAuthDetails();

        // return $params;
        $response = Http::get($url, $params)->json();
        return [
            "success" => $response['status'] === "ORDER_RECEIVED",
            "message" => $response['status'],
            "code" => "CLUBKONNECT_RESPONSE_CODE",
            "api_response" => $response,
            "request" => ["url" => $url, "params" => $params]

        ];
        return $response;
    }

    public static function buyClubData($network, $mobile, $plan, $ref, $mock = false)
    {
        if (isMock()) {
            return [
                "success" => true,
                "message" => "MOCK_DATA_ORDER_RECEIVED",
                "code" => "MOCK_SUCCESS_CODE",
                "api_response" => [],
            ];
        }

        $url = "https://www.nellobytesystems.com/APIDatabundleV1.asp";
        $params = [
            "MobileNetwork" => self::getClubProviderCode($network),
            "DataPlan" => self::getClubDataPlan($network, $plan),
            "MobileNumber" => $mobile,
            "RequestID" => $ref,

        ] + self::getClubAuthDetails();

        $response = Http::get($url, $params)->json();
        return [
            "success" => $response['status'] === "ORDER_RECEIVED",
            "message" => $response['status'],
            "code" => "CLUBKONNECT_RESPONSE_CODE",
            "api_response" => $response,
            "request" => ["url" => $url, "params" => $params]

        ];
        return $response;
    }
    public static function buyClubRecharge($network, $quantity, $plan, $ref, $mock = false)
    {
        if (isMock()) {
            return [
                "success" => true,
                "message" => "MOCK_DATA_ORDER_RECEIVED",
                "code" => "MOCK_SUCCESS_CODE",
                "api_response" => [],
            ];
        }

        $url = "https://www.nellobytesystems.com/APIEPINV1.asp";
        $params = [
            "MobileNetwork" => self::getClubProviderCode($network),
            "Value" => self::getClubDataPlan($network, $plan),
            "Quantity" => $quantity,
            "RequestID" => $ref,

        ] + self::getClubAuthDetails();

        // return $params;

        $response = Http::get($url, $params)->json();
        return [
            "success" => is_array(@$response['TXN_EPIN']) ? true : false,
            "message" => @$response['status'],
            "code" => "CLUBKONNECT_CODE",
            "api_response" => @$response,
            "request" => ["url" => $url, "params" => $params]

        ];
        return $response;

        // RC-ORD-LBTFCE

        // {"TXN_EPIN":[{"transactionid":"6329036611","transactiondate":"12/20/2019 9:08:00 PM","batchno":"82057","mobilenetwork":"MTN","sno":"00000003802132587","pin":"14819613681469920","amount":"100"}]}
    }
    public static function fetchClubRecharge($ref, $mock = false)
    {
        if (isMock()) {
            // return [
            //     "success" => true,
            //     "message" => "MOCK_DATA_ORDER_RECEIVED",
            //     "code" => "MOCK_SUCCESS_CODE",
            //     "api_response" => [],
            // ];
            $ref = "RC-ORD-LBTFCE";
            // $ref = "RC-ORD-R7BPHH";
        }

        $url = "https://www.nellobytesystems.com/APIQueryV1.asp";
        $params = [
            "RequestID" => $ref,

        ] + self::getClubAuthDetails();

        // return $params;

        $response = Http::get($url, $params)->json();
        return [
            "success" => is_array(@$response['TXN_EPIN']) ? true : false,
            "message" => @$response['status'],
            "code" => "CLUBKONNECT_CODE",
            "api_response" => @$response,
            "request" => ["url" => $url, "params" => $params],
            "pins" => (@$response['TXN_EPIN'])

        ];
        return $response;

        // RC-ORD-LBTFCE
        // Failed
        // RC-ORD-R7BPHH

        // {"TXN_EPIN":[{"transactionid":"6329036611","transactiondate":"12/20/2019 9:08:00 PM","batchno":"82057","mobilenetwork":"MTN","sno":"00000003802132587","pin":"14819613681469920","amount":"100"}]}
    }

    public static function buyClubElectricity($service, $meterno, $mtype, $amount, $ref = null, $mock = false)
    {
        if (isMock()) {
            return [
                "success" => true,
                "message" => "MOCK_ELECTRICITY_ORDER_RECEIVED",
                "code" => "MOCK_SUCCESS_CODE",
                "api_response" => [],
            ];
        }

        $url = "https://www.nellobytesystems.com/APIElectricityV1.asp";

        $params = [
            "ElectricCompany" => self::getClubElectricityProvider($service),
            "MeterNo" => $meterno,
            "MeterType" => $mtype,
            "Amount" => $amount,
            "RequestID" => $ref
        ] + self::getClubAuthDetails();

        $response = Http::get($url, $params)->json();
        return [
            "success" => $response['status'] === "ORDER_RECEIVED",
            "message" => $response['status'],
            "code" => "CLUBKONNECT_RESPONSE_CODE",
            "api_response" => $response,
            "request" => ["url" => $url, "params" => $params]

        ];

        return $params;
    }

    public static function verifyClubElectricity($service, $meterno)
    {
        if (isMock()) {
        }
        $url = "https://www.nellobytesystems.com/APIVerifyElectricityV1.asp";

        $params = [
            "ElectricCompany" => self::getClubElectricityProvider($service),
            "MeterNo" => $meterno,
        ] + self::getClubAuthDetails();

        $response = Http::get($url, $params)->json();
        $customer_name = @$response['customer_name'];
        $count = str_word_count($customer_name);

        return [
            "success" =>  $customer_name && $customer_name !== "INVALID_METERNO" && $count <= 5,
            "message" => $customer_name,
            "recipient" => $customer_name,
            "api_response" => $response,
            "request" => ["url" => $url, "params" => $params]

        ];

        // return $params;

    }

    public static function verifyClubCable($service, $recipient)
    {
        // $dstv_recipient = "7030500604";
        $url = "https://www.nellobytesystems.com/APIVerifyCableTVV1.0.asp";

        $params = [
            "cabletv" => self::getClubCableProvider($service),
            "smartcardno" => $recipient,
        ] + self::getClubAuthDetails();

        $response = Http::get($url, $params)->json();
        $customer_name = @$response['customer_name'];
        $count = str_word_count($customer_name);

        return [
            "success" =>  $customer_name && $customer_name !== "INVALID_SMARTCARDNO" && $count <= 5,
            "message" => $customer_name,
            "recipient" => $customer_name,
            "api_response" => $response,
            "request" => ["url" => $url, "params" => $params]

        ];

        // return $params;

    }

    public static function verifyClubInternet($service, $recipient)
    {
        $url = "https://www.nellobytesystems.com/APIVerifySmileV1.asp";

        $params = [
            "MobileNetwork" => self::getClubInternetProvider($service),
            "MobileNumber" => $recipient,
        ] + self::getClubAuthDetails();

        $response = Http::get($url, $params)->json();
        $customer_name = @$response['customer_name'];
        $count = str_word_count($customer_name);

        return [
            "success" =>  $customer_name && $customer_name !== "INVALID_ACCOUNTNO" && $count <= 5,
            "message" => $customer_name,
            "recipient" => $customer_name,
            "api_response" => $response,
            "request" => ["url" => $url, "params" => $params]
        ];

        // return $params;

    }

    public static function buyClubCable($network, $recipient, $plan, $ref, $mock = false)
    {
        if (isMock()) {
            return [
                "success" => true,
                "message" => "MOCK_CABLT_TV_ORDER_RECEIVED",
                "code" => "MOCK_SUCCESS_CODE",
                "api_response" => [],
            ];
        }


        $url = "https://www.nellobytesystems.com/APICableTVV1.asp";
        $params = [
            "CableTV" => self::getClubCableProvider($network),
            "Package" => $plan->api_ref,
            "SmartCardNo" => $recipient,
            "RequestID" => $ref,
        ] + self::getClubAuthDetails();

        // return $params;

        $response = Http::get($url, $params)->json();
        return [
            "success" => $response['status'] === "ORDER_RECEIVED",
            "message" => $response['status'],
            "code" => "CLUBKONNECT_RESPONSE_CODE",
            "api_response" => $response,
            "request" => ["url" => $url, "params" => $params]
        ];
    }

    public static function buyClubInternet($network, $recipient, $plan, $ref, $mock = false)
    {
        if (isMock()) {
            return [
                "success" => true,
                "message" => "MOCK_INTERNET_ORDER_RECEIVED",
                "code" => "MOCK_SUCCESS_CODE",
                "api_response" => [],
            ];
        }

        $url = "https://www.nellobytesystems.com/APISmileV1.asp?";
        $params = [
            "MobileNetwork" => self::getClubCableProvider($network),
            "DataPlan" => $plan->api_ref,
            "MobileNumber" => $recipient,
            "RequestID" => $ref,
        ] + self::getClubAuthDetails();

        // return $params;

        $response = Http::get($url, $params)->json();
        return [
            "success" => $response['status'] === "ORDER_RECEIVED",
            "message" => $response['status'],
            "code" => "CLUBKONNECT_RESPONSE_CODE",
            "api_response" => $response,
            "request" => ["url" => $url, "params" => $params]

        ];
    }

    public static function getClubElectricityProvider($string)
    {
        $providers = [
            "EKEDC" => "01",
            "IKEDC" => "02",
            "AEDC" => "03",
            "KEDC" => "04",
            "PHEDC" => "05",
            "JEDC" => "06",
            "IBEDC" => "07",
            "KAEDC" => "08",
            "EEDC" => "09",
        ];

        return @$providers[strtoupper($string)];
    }

    public static function getClubDataPlan($provider, $plan)
    {
        return $plan->api_ref;
        $mtn = [
            "mtn-500mb" => "500",
            "mtn-1gb" => "1000",
            "mtn-1.5gb" => "1500.01",
            "mtn-2gb" => "2000",
            "mtn-3gb" => "3000",
            "mtn-3.5gb" => "3500.01",
            "mtn-5gb" => "5000",
            "mtn-10gb" => "10000.01",
            "mtn-22gb" => "22000.01",
        ];
        $clubPlans = ["mtn-data" => $mtn, "mtn" => $mtn];
        return @$clubPlans[$provider][$plan];
    }

    public static function getClubCablePlan($provider, $plan)
    {
        $dstv = [
            "dstv-padi" => 'dstv-padi',
            "dstv-yanga" => 'dstv-yanga',
            "dstv-confam" => 'dstv-confam',
            "dstv-79" => 'dstv-79',
            "dstv-3" => 'dstv-3',
            "dstv-7" => 'dstv-7',
            "dstv-9" => 'dstv-9',
            "dstv-10" => 'dstv-10',
            "dstv-super-sub-1-month" => "dstv-padi",
            "confam-extra" => 'confam-extra',
            "yanga-extra" => 'yanga-extra',
            "padi-extra" => 'padi-extra',
        ];


        $packages = [
            "dstv" => $dstv,
        ];

        return @$packages[$provider][$plan];
    }

    public static function getClubCableProvider($provider)
    {
        $providers = [
            "dstv" => "dstv",
            "gotv" => 'gotv',
            'startimes' => 'startimes'
        ];
        return @$providers[strtolower($provider)];
    }

    public static function getClubInternetProvider($provider)
    {
        $providers = [
            "smile" => "smile-direct",
        ];
        return @$providers[strtolower($provider)] ?? "smile-direct";
    }

    public static function buyAirtime($providerSlug, $mobile, $amount, $reference = null)
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

        return [
            "success" => $response['code'] === 100,
            "message" => $response['status'],
            "code" => "CLUBKONNECT_RESPONSE_CODE",
            "api_response" => $response
        ];
        return $response;
    }

    public static function buyData($network, $phone, $amt, $user_ref)
    {
        $url = "https://mobileairtimeng.com/httpapi/datatopup.php";
        // ?userid=xxxx&pass=xxxx&network=x&phone=xxxxx&datasize=xx&jsn=json&user_ref=xxx
        $params = [
            "userid" => env("MOBILE_API_USERID"),
            "pass" => env("MOBILE_API_PASS"),
            "user_ref" => $user_ref,
            "network" => self::getProviderCode($network),
            "amt" => self::getPlanAmount($amt),
            "phone" => $phone,
            "jsn" => "json"
        ];
        $response = Http::get($url, $params)->json();

        return $response;
    }



    public static function buyElectricity($service, $meterno, $mtype, $amt, $user_ref = null)
    {
        $url = "http://mobileairtimeng.com/httpapi/power-pay";
        $params = [
            "userid" => env("MOBILE_API_USERID"),
            "pass" => env("MOBILE_API_PASS"),
            "service" => self::getProviderCode($service),
            "meterno" => $meterno,
            "mtype" => $mtype,
            "amt" => $amt,
            "user_ref" => $user_ref,
            "jsn" => "json"
        ];
        $response = Http::get($url, $params)->json();

        return $response;
    }

    public static function getPlanAmount($plan)
    {
        switch (strtolower($plan->slug)) {
            case 'mtn-1gb':
                return "100";
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
                return "100";
                break;
        }
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
    public static function getClubProviderCode($providerSlug)
    {
        $clubProviders = [
            "mtn" => "01",
            "mtn-data" => "01",
            "mtn-airtime" => "01",
            "mtn-recharge-print" => "01",
            "glo" => "02",
            "glo-data" => "02",
            "glo-airtime" => "02",
            "glo-recharge-print" => "02",
            "9mobile" => "03",
            "9mobile-data" => "03",
            "9mobile-airtime" => "03",
            "9mobile-recharge-print" => "03",
            "etisalat" => "03",
            "etisalat-data" => "03",
            "etisalat-airtime" => "03",
            "etisalat-recharge-print" => "03",
            "airtel" => "04",
            "airtel-data" => "04",
            "airtel-airtime" => "04",
            "airtel-recharge-print" => "04",
        ];
        return @$clubProviders[$providerSlug];
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
