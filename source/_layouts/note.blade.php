@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="{{ $page->title }} by {{ $page->author }}: Summary, Notes & Lessons" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="{{ $page->description }}" />
@endpush

@push('title')
    {{ $page->title }} by {{ $page->author }}: Summary, Notes & Lessons
@endpush

@section('body')
    <div class="lg:flex">
        @if ($page->cover_image)
            <img src="{{ $page->cover_image }}" alt="{{ $page->title }} cover image" class="mb-6 mb-4 mr-2 h-64">
        @endif

        <div class="flex flex-col px-2">

            <div class="inline-flex">
                <span
                class="inline-block leading-loose tracking-wide bg-gray-400 text-gray-500-900 uppercase text-sm
                font-semibold rounded mr-4 px-3"
                    >
                    My Rating: {{ $page->rating }}/5
                </span>
            </div>

            <h1 class="leading-none my-6">{{ $page->title }} by {{ $page->author }}</h1>

            <h2 class="my-0 text-base font-extrabold uppercase">
                High-Level Summary
            </h2>
            <p class="my-0">
                {{ $page->description }}
            </p>
        </div>

    </div>

    <hr class="border-b my-6">

    <div class="py-4" v-pre>

        @yield('content')

    </div>

    @include('_components.newsletter-signup')

    <script src="https://static.cruton.app/js/cruton.js" data-tags="" defer></script>

@endsection
