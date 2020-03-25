---
pagination:
    collection: notes
    perPage: 10
---
@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="Book Notes & Summaries - {{ $page->siteName }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="Get actionable takeaways and detailed summaries for the books I've read." />

@endpush

@push('title')
Summaries, Notes, and Reviews from Books I've Read | {{ $page->siteName }}
@endpush

@section('body')
    <h1>Summaries, Notes, and Reviews from Books I've Read</h1>

    <hr class="border-b my-6">

    @foreach ($pagination->items as $post)

        @if ($post->cover_image)
            <a
            href="{{ $post->getUrl() }}"
                >
                <img src="{{ $post->cover_image }}" alt="{{ $post->title }} cover image" class="mb-2 mr-2 h-48">
            </a>
        @endif

        <h2>
            <a
            href="{{ $post->getUrl() }}"
            class="font-semibold"
                >
                {{$post->title}} by {{$post->author}}
            </a>
        </h2>

        <span
            class="inline-block bg-gray-400 leading-loose tracking-wide text-gray-900 uppercase text-base font-semibold rounded mr-4 my-2 px-3 pt-px"
            >
            My rating: {{ $post->rating }}/5
        </span>

        <p>
            {{$post->description}}
        </p>

        <a
            href="{{ $post->getUrl() }}"
            title="Read notes - {{ $post->title }}"
            class="uppercase font-semibold tracking-wide mb-2"
        >
            Read Notes →
        </a>


        @if ($post != $pagination->items->last())
            <hr class="border-b my-6">
        @endif
    @endforeach

    @if ($pagination->pages->count() > 1)
        <nav class="flex text-base my-8">
            @if ($previous = $pagination->previous)
                <a
                    href="{{ $previous }}"
                    title="Previous Page"
                    class="bg-gray-200 hover:bg-gray-400 rounded mr-3 px-5 py-3"
                >&LeftArrow;</a>
            @endif

            @foreach ($pagination->pages as $pageNumber => $path)
                <a
                    href="{{ $path }}"
                    title="Go to Page {{ $pageNumber }}"
                    class="bg-gray-200 hover:bg-gray-400 text-blue-700er rounded mr-3 px-5 py-3 {{ $pagination->currentPage == $pageNumber ? 'text-blue-700' : '' }}"
                >{{ $pageNumber }}</a>
            @endforeach

            @if ($next = $pagination->next)
                <a
                    href="{{ $next }}"
                    title="Next Page"
                    class="bg-gray-200 hover:bg-gray-400 rounded mr-3 px-5 py-3"
                >&RightArrow;</a>
            @endif
        </nav>
    @endif
@stop
