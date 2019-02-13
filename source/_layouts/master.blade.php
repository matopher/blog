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
        <meta property="og:image" content="/assets/img/meta.png" />

        <!-- Twitter Card data -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@matopher">
        <meta name="twitter:title" content="{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}">
        <meta name="twitter:description" content="{{ $page->siteDescription }}">
        <meta name="twitter:creator" content="@matohper">
        <meta name="twitter:image" content="/assets/img/meta.png">

        <title>{{ $page->siteName }}{{ $page->title ? ' | ' . $page->title : '' }}</title>

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

        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,300i,400,400i,700,700i,800,800i" rel="stylesheet">
        <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}">
    </head>

    <body class="flex flex-col justify-between min-h-screen bg-grey-lightest text-grey-darkest leading-normal font-sans">

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

                            <span class="text-lg md:text-2xl text-blue-darkest font-semibold hover:text-blue-dark my-0">Matt Woods</span>
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

            <a href="/go" target="_blank" rel="noopener">Peru Trip</a>

            <div class="flex items-center justify-center mx-auto pt-4">
                <div class="px-1 mx-4">
                    <a href="https://twitter.com/matopher" target="_blank" rel="noopener">
                        <svg width="26" height="22" viewBox="0 0 26 22" xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 hover:text-blue-darkest">
                            <path class="social-icon" d="M22.937 3.478c1.102-.686 1.947-1.775 2.344-3.07-1.03.636-2.17 1.097-3.387 1.346C20.923.674 19.535 0 18 0c-2.945 0-5.332 2.487-5.332 5.553 0 .436.044.86.136 1.265-4.432-.232-8.362-2.44-10.994-5.803-.46.823-.722 1.777-.722 2.794 0 1.924.942 3.624 2.373 4.622-.873-.028-1.696-.28-2.416-.694v.068c0 2.692 1.837 4.937 4.28 5.445-.448.132-.918.197-1.407.197-.343 0-.68-.033-1.002-.1.677 2.207 2.648 3.815 4.983 3.858-1.827 1.49-4.127 2.377-6.625 2.377-.43 0-.856-.024-1.273-.077C2.36 21.08 5.164 22 8.177 22c9.813 0 15.175-8.463 15.175-15.802 0-.24-.003-.48-.014-.718 1.043-.783 1.95-1.762 2.662-2.876-.957.442-1.985.74-3.063.874z" fill-rule="evenodd"></path>
                        </svg>
                    </a>
                </div>
                <div class="px-1 mx-4">
                    <a href="https://www.youtube.com/channel/UC66SdWwBo-enFmuCzrxsa1g" target="_blank" rel="noopener">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-4 hover:text-blue-darkest">
                            <path class="a" d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                        </svg>
                    </a>
                </div>
                <div class="px-1 mx-4">
                    <a href="https://www.github.com/matopher" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" class="fill-current w-4 hover:text-blue-darkest">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                    </a>
                </div>
                <div class="px-1 mx-4">
                    <a href="https://www.linkedin.com/in/matthewchristopherwoods" target="_blank" rel="noopener">
                        <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 hover:text-blue-darkest">
                            <path class="social-icon" d="M1.105 7.696h4.678v16.302H1.105V7.696zm2.22-2.04H3.29C1.6 5.657.5 4.41.5 2.833.5 1.222 1.63 0 3.357 0c1.726 0 2.787 1.22 2.82 2.828 0 1.578-1.094 2.83-2.852 2.83zM24.5 24h-5.304v-8.438c0-2.208-.83-3.714-2.655-3.714-1.394 0-2.17 1.016-2.532 1.998-.135.35-.114.84-.114 1.332V24H8.64s.067-14.946 0-16.304h5.254v2.558c.31-1.118 1.99-2.715 4.67-2.715 3.324 0 5.936 2.346 5.936 7.394V24z" fill-rule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </div>
            <ul class="flex flex-col md:flex-row justify-center list-reset">
                <li class="md:mr-2">
                    &copy; Matt Woods {{ date('Y') }}
                </li>
            </ul>
        </footer>
    </body>
</html>
