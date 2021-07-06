<!DOCTYPE html>
<html lang="zxx" class="js">
@php
$auth_user = auth()->user();
@endphp

<head>
    <base href="../">
    <meta charset="utf-8">
    <meta name="author" content="Softnio">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="A powerful and conceptual apps base dashboard template that especially build for developers and programmers.">
    <!-- Fav Icon  -->
    <link rel="shortcut icon" href="./images/favicon.png">
    <!-- Page Title  -->
    <title>ArtWallet | Wallet</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <!-- StyleSheets  -->
    <link rel="stylesheet" href="{{asset('dashlite/css/dashlite.css?ver=2.5.0')}}">
    <link id="skin-default" rel="stylesheet" href="{{asset('dashlite/css/theme.css?ver=2.5.0')}}">
</head>

<body class="nk-body bg-lighter npc-default has-sidebar ">
    <div class="nk-app-root" id="root">

    </div>
    <script>
        const ROUTE_BASENAME = "dashboard"
        const PUBLIC_PATH = "{{ asset('transcorp')}}"
        const IMG_PATH = "{{ asset('images/')}}"
        const ASSET_PATH = "{{ asset('')}}"
        const AUTH_USER = @json($auth_user);
        const APP_URL = "{{env('APP_URL')}}";
    </script>
    <!-- app-root @e -->
    <!-- JavaScript -->
    <script src="{{asset('dashlite/js/bundle.js')}}"></script>
    <script src="{{asset('dashlite/js/scripts.js')}}"></script>
    <script src="{{asset('js/dashboard/index.js')}}"></script>
</body>

</html>