<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

@php
$auth_user = auth()->user();
$sc = config('sc');
@endphp

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap">

    <!-- Styles -->
    <!-- <link rel="stylesheet" href="{{asset('dashlite/css/dashlite.css?ver=2.5.0')}}">
    <link id="skin-default" rel="stylesheet" href="{{asset('dashlite/css/theme.css?ver=2.5.0')}}"> -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    <!-- Scripts -->
    @routes
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>


<body class="font-sans antialiased bg-gray-100">
    <script>
        const naira = (value) => {
            return "₦" +
                parseFloat(value).toLocaleString()
        }
        const ROUTE_BASENAME = "dashboard"
        const PUBLIC_CONFIG = @json($sc);
        const IMG_PATH = "{{ asset('images/')}}"
        const ASSET_PATH = "{{ asset('')}}"
        const AUTH_USER = @json($auth_user);
        const APP_URL = "{{env('APP_URL')}}";

        const deslug = (value) => {
            return value.replace(/_/g, ' ').replace(/-/g, ' ')
        }
    </script>
    @inertia

    @env ('local')
    <script src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
    @endenv

    <script src="{{asset('dashlite/js/bundle.js')}}"></script>
    <script src="{{asset('dashlite/js/scripts.js')}}"></script>

</body>

</html>