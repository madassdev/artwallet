<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    <!-- Scripts -->
    @routes
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>

@php
$auth_user = auth()->user();
@endphp

<body class="font-sans antialiased bg-gray-100">
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

        const deslug = (value) => {
            return value.replace(/_/g, ' ').replace(/-/g, ' ')
        }
    </script>
    @inertia

    @env ('local')
    <script src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
    @endenv

</body>

</html>