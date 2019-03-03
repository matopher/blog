@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="{{ $page->title }}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="{{ $page->description }}" />
@endpush

@section('body')
    <div class="lg:flex">
        @if ($page->cover_image)
            <img src="{{ $page->cover_image }}" alt="{{ $page->title }} cover image" class="mb-2 mr-2 h-48">
        @endif

        <div class="flex flex-col p-2">
            <h1 class="leading-none mb-2">{{ $page->title }} by {{ $page->author }}</h1>
            <div class="inline-flex">
                <span
                class="inline-block leading-loose tracking-wide bg-grey-light text-grey-darkest uppercase text-md font-semibold rounded mr-4 my-2 px-3 pt-px"
                    >
                    My Rating: {{ $page->rating }}/5
                </span>
            </div>
        </div>

    </div>

    <div class="py-4" v-pre>

        @yield('content')

    </div>

    @include('_components.newsletter-signup')

@endsection
