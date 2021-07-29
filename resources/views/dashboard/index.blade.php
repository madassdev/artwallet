<!DOCTYPE html>
<html lang="zxx" class="js">
@php
$auth_user = auth()->user();
$sc = config('sc');
@endphp

<head>
    <script>
        if (location.protocol !== 'https:') {
            location.replace(`https:${location.href.substring(location.protocol.length)}`);
        }
    </script>
    <base href="../">
    <meta charset="utf-8">
    <meta name="author" content="Softnio">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="A powerful and conceptual apps base dashboard template that especially build for developers and programmers.">
    <!-- Fav Icon  -->
    <link rel="shortcut icon" href="./images/favicon.png">
    <!-- Page Title  -->
    <title>ArtWallet | Wallet</title>
    <!-- StyleSheets  -->
    <link rel="stylesheet" href="{{asset('dashlite/css/dashlite.css?ver=2.5.0')}}">
    <link id="skin-default" rel="stylesheet" href="{{asset('dashlite/css/theme.css?ver=2.5.0')}}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>

<body class="nk-body bg-lighter npc-default has-sidebar ">
    <div class="nk-app-root" id="root">

    </div>
    <script>
        const naira = (value) => {
            return "₦" +
                parseFloat(value).toLocaleString()
        }
        const ROUTE_BASENAME = "dashboard"
        const PUBLIC_PATH = "{{ asset('transcorp')}}"
        const IMG_PATH = "{{ asset('images/')}}"
        const ASSET_PATH = "{{ asset('')}}"
        const AUTH_USER = @json($auth_user);
        const APP_URL = "{{env('APP_URL')}}";
        const APP_SERVICES = @json($app_services);
        const PUBLIC_CONFIG = @json($sc);
        console.log(PUBLIC_CONFIG)
        const deslug = (value) => {
            return value.replace(/_/g, ' ').replace(/-/g, ' ')
        }
    </script>
    <!-- app-root @e -->
    <!-- JavaScript -->
    <script src="{{asset('dashlite/js/bundle.js')}}"></script>
    <script src="{{asset('dashlite/js/scripts.js')}}"></script>
    <script src="{{asset('js/dashboard/index.js')}}"></script>
</body>

</html>