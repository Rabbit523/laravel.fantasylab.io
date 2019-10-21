<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>{{$title}}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta property="og:image" content="{{ url('/images/logo.png') }}" />
        <meta name="description" content="{{$description}}">
        <link rel="stylesheet" href="{{asset('css/all.css')}}">
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <link rel="shortcut icon" type="image/png" href="{{ url('/images/logo.png') }}">
        <script defer src="{{ asset('js/app.js') }}"></script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-146362132-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-146362132-1');
        </script>
    </head>
    <body>
        
        {!! ssr('js/app-server.js')
            // Share the packages with the server script through context
            ->context('page', $page)
            ->context('status', $status)
            // If ssr fails, we need a container to render the app client-side
            ->fallback('<div id="app"></div>')
            ->render() !!}

        <script>
            window.__PRELOADED_STATE__ = @json(['page' => $page])
        </script>
        
    </body>
</html>
