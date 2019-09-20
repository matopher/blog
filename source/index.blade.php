@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="{{ $page->siteName }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="{{ $page->blogDescription }}" />
@endpush

@section('body')

<section class="flex-col justify-center items-center text-center mb-20">

    <img src="/assets/img/matt.jpg"
        alt="Matt Woods"
        class="inline-flex rounded-full h-32 w-32 bg-contain mx-auto">

    <h1 >I'm Matt Woods. Growth Marketer, Developer, and Curious Learning Machine.</h1>

    <p>Currently, I run Growth at <a href="https://tailwindapp.com">Tailwind</a>.</p>

    <p>I'm co-founding <a href="https://okcindiehackers.com/">OKC Indie Hackers</a> to help build indie software that makes the world better.</p>

    <p>Every week I review a new book and share the best learnings with the world in free <a href="/notes">book
            notes.</a></p>

    {{-- TODO: Convert into partial --}}
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

</section>

    @include('_components.newsletter-signup')

    <h2 class="text-center text-4xl pt-8">Recent Articles</h2>

    @foreach ($posts->where('featured', true) as $featuredPost)
        <div class="w-full mb-6">
            @if ($featuredPost->cover_image)
                <img src="{{ $featuredPost->cover_image }}" alt="{{ $featuredPost->title }} cover image" class="mb-6">
            @endif

            <h2 class="text-3xl mt-0">
                <a href="{{ $featuredPost->getUrl() }}" title="Read {{ $featuredPost->title }}" class="text-black font-extrabold">
                    {{ $featuredPost->title }}
                </a>
            </h2>

            <p class="mt-0 mb-4">{!! $featuredPost->excerpt() !!}</p>

            <a href="{{ $featuredPost->getUrl() }}" title="Read - {{ $featuredPost->title }}"class="uppercase tracking-wide mb-4">
                Read More →
            </a>
        </div>

        @if (! $loop->last)
            <hr class="border-b my-6">
        @endif
    @endforeach

    @foreach ($posts->where('featured', false)->take(6)->chunk(2) as $row)
        <div class="flex flex-col md:flex-row md:-mx-6">
            @foreach ($row as $post)
                <div class="w-full md:w-1/2 md:mx-6">
                    @include('_components.post-preview-list', ['constrain_image_to_grid' => true])
                </div>

                @if (! $loop->last)
                    <hr class="block md:hidden w-full border-b mt-2 mb-6">
                @endif
            @endforeach
        </div>

        @if (! $loop->last)
            <hr class="w-full border-b mt-2 mb-6">
        @endif
    @endforeach
@stop
