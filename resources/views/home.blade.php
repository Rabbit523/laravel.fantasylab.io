<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>FantasyLab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta property="og:image" content="{{ url('/images/logo.png') }}" />
        <link rel="stylesheet" href="{{asset('css/all.css')}}">
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <link rel="shortcut icon" type="image/png" href="{{ url('/images/logo.png') }}">
    </head>
    <body>
        <div id='app'></div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
