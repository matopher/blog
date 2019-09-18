@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="{{ $page->title }}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="{{ $page->description }}" />
@endpush

@section('body')
    @if ($page->cover_image)
        <img src="{{ $page->cover_image }}" alt="{{ $page->title }} cover image" class="mb-2">
    @endif

    <h1 class="leading-none mb-2">{{ $page->title }}</h1>

    <p class="text-grey-darker text-xl md:mt-0">By {{ $page->author }}</p>

    @if ($page->categories)
        @foreach ($page->categories as $i => $category)
            <a
                href="{{ '/blog/categories/' . $category }}"
                title="View posts in {{ $category }}"
                class="inline-block bg-grey-light hover:bg-blue-lighter leading-loose tracking-wide text-grey-darkest uppercase text-xs font-semibold rounded mr-4 px-3 pt-px"
            >{{ $category }}</a>
        @endforeach
    @endif

    <div class="py-4" v-pre>

        @yield('content')

        <p class="text-grey-darker text-xl md:mt-0 mb-0">Published on {{ date('F j, Y', $page->date) }}.</p>

    </div>

    @include('_components.newsletter-signup')

    <nav class="flex justify-between text-sm md:text-base">
        <div class="max-w-xs mx-4">
            @if ($next = $page->getNext())
                <a href="{{ $next->getUrl() }}" title="Older Post: {{ $next->title }}">
                    &LeftArrow; {{ $next->title }}
                </a>
            @endif
        </div>

        <div class="max-w-xs mx-4">
            @if ($previous = $page->getPrevious())
                <a href="{{ $previous->getUrl() }}" title="Newer Post: {{ $previous->title }}">
                    {{ $previous->title }} &RightArrow;
                </a>
            @endif
        </div>
    </nav>

    <script src="https://static.cruton.app/js/cruton.js" data-tags="" defer></script>
@endsection
