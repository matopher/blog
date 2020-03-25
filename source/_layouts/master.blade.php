<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="description" content="{{ $page->meta_description or $page->siteDescription }}">

        <!-- Open Graph data -->
        <meta property="og:title" content="{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ $page->getUrl() }}"/>
        <meta property="og:description" content="{{ $page->siteDescription }}" />
        <meta property="og:image" content="{{ $page->cover_image ? $page->cover_image : '/assets/img/meta.png' }}" />

        <!-- Twitter Card data -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@matopher">
        <meta name="twitter:title" content="{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}">
        <meta name="twitter:description" content="{{ $page->siteDescription }}">
        <meta name="twitter:creator" content="@matopher">
        <meta name="twitter:image" content="/assets/img/meta.png">

        <title>
            @if ( strpos($page->getPath(), 'notes') )
                @stack('title')
            @else
            {{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}
            @endif
        </title>

        <link rel="home" href="{{ $page->baseUrl }}">
        <link rel="icon" href="/favicon.ico">
        <link href="/blog/feed.atom" type="application/atom+xml" rel="alternate" title="{{ $page->siteName }} Atom Feed">

        @stack('meta')

        @if ($page->production)
            <!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-89589431-1"></script>
            <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-89589431-1', { 'optimize_id': 'GTM-M7SGBX9'});
            </script>



        @endif

        <link rel="preload" href="https://rsms.me/inter/inter.css">
        <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}">
    </head>

    <body class="flex flex-col justify-between min-h-screen bg-gray-100 text-gray-500-900 leading-normal font-sans">

        @if ($page->production)
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NR7PJ78"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        @endif

        <div id="vue-app">
            <header class="flex items-center shadow bg-white border-b h-24 py-4" role="banner">
                <div class="container flex items-center max-w-4xl mx-auto px-4 lg:px-8">
                    <div class="flex items-center">
                        <a href="/" title="{{ $page->siteName }} home" class="inline-flex items-center">
                            {{-- <img class="h-8 md:h-10 mr-3" src="/assets/img/logo.svg" alt="{{ $page->siteName }} logo" /> --}}

                            <span class="text-lg md:text-2xl text-blue-700est font-semibold hover:text-blue-700 my-0">Matt Woods</span>
                        </a>
                    </div>

                    <div class="flex flex-1 justify-end items-center">
                        <search></search>

                        @include('_nav.menu')

                        @include('_nav.menu-toggle')
                    </div>
                </div>
            </header>

            @include('_nav.menu-responsive')

            <main role="main" class="flex-auto w-full container max-w-lg mx-auto py-16 px-6">
                @yield('body')
            </main>
        </div>

        <script src="{{ mix('js/main.js', 'assets/build') }}"></script>

        @stack('scripts')

        <footer class="bg-white text-center text-sm mt-12 py-4" role="contentinfo">

            @include('_components.social-links')

            <ul class="flex flex-col md:flex-row justify-center">
                <li class="md:mr-2">
                    &copy; Matt Woods {{ date('Y') }}
                </li>
            </ul>
        </footer>
    </body>
</html>
