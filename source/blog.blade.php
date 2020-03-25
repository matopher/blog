---
pagination:
    collection: posts
    perPage: 10
---
@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="{{ $page->siteName }} Blog" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="The list of blog posts for {{ $page->siteName }}" />
@endpush

@section('body')
    <h1>Articles</h1>


    <span class="uppercase font-semibold leading-loose tracking-wide text-gray-900">Sort by Category</span>

    <div class="flex-auto w-full container mb-4">
        @foreach ($page->allCategories($posts) as $category)
            <a
            href="/blog/categories/{{ $category }}"
            class="inline-block bg-gray-400 hover:bg-blue-200 leading-loose tracking-wide text-gray-900 uppercase text-xs font-semibold rounded mr-4 my-2 px-3 pt-px"
            >
                {{ $category }}
                ({{ $page->countPostsInCategory($posts, $category) }})
            </a>
        @endforeach
    </div>

    <hr class="border-b my-6">

    @foreach ($pagination->items as $post)
        @include('_components.post-preview-list', ['constrain_image_to_grid' => false])

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
