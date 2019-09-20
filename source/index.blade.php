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

    @include('_components.social-links')

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
