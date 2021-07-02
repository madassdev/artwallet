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
        const AUTH_USER = @json($auth_user);
    </script>
    <script src="{{asset('js/dashboard/index.js')}}"></script>
    <!-- app-root @e -->
    <!-- JavaScript -->
    <script src="{{('dashlite/js/bundle.js?ver=2.5.0')}}"></script>
    <script src="{{('dashlite/js/scripts.js?ver=2.5.0')}}"></script>
    <script src="{{('dashlite/js/charts/chart-ecommerce.js?ver=2.5.0')}}"></script>
</body>

</html>