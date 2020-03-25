<div class="flex flex-col mb-4">

    @if ($post->cover_image)
        <a
        href="{{ $post->getUrl() }}"
        title="Read more - {{ $post->title }}"
        class="text-gray-900 font-extrabold"
        >
            <img
            src="{{ $post->cover_image }}"
            alt="{{ $post->title }} cover image" class="mb-2 w-full"

            @if ($constrain_image_to_grid)
                style="max-height: 10rem; max-height: 10rem; object-fit: cover; object-position: center;"
            @endif
            >
        </a>
    @endif

    <div class="flex-auto w-full container mb-4 mt-2">
        @if ($post->categories)
            @foreach ($post->categories as $i => $category)
                <a
                    href="{{ '/blog/categories/' . $category }}"
                    title="View posts in {{ $category }}"
                    class="inline-block bg-gray-400 hover:bg-blue-200 leading-loose tracking-wide text-gray-900 uppercase text-xs font-semibold rounded mr-4 px-3 pt-px"
                >{{ $category }}</a>
            @endforeach
        @endif
    </div>

    <h2 class="text-3xl mt-0">
        <a
            href="{{ $post->getUrl() }}"
            title="Read more - {{ $post->title }}"
            class="text-gray-900 font-extrabold"
        >{{ $post->title }}</a>
    </h2>

    <a
        href="{{ $post->getUrl() }}"
        title="Read more - {{ $post->title }}"
        class="uppercase font-semibold tracking-wide mb-2"
    >Read More →</a>
</div>
