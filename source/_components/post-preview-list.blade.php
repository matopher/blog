<div class="flex flex-col mb-4">

    @if ($post->cover_image)
        <a
        href="{{ $post->getUrl() }}"
        title="Read more - {{ $post->title }}"
        class="text-black font-extrabold"
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
                    class="inline-block bg-grey-light hover:bg-blue-lighter leading-loose tracking-wide text-grey-darkest uppercase text-xs font-semibold rounded mr-4 px-3 pt-px"
                >{{ $category }}</a>
            @endforeach
        @endif
    </div>

    <h2 class="text-3xl mt-0">
        <a
            href="{{ $post->getUrl() }}"
            title="Read more - {{ $post->title }}"
            class="text-black font-extrabold"
        >{{ $post->title }}</a>
    </h2>

    <a
        href="{{ $post->getUrl() }}"
        title="Read more - {{ $post->title }}"
        class="uppercase font-semibold tracking-wide mb-2"
    >Read More →</a>
</div>
