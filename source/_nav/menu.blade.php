<nav class="hidden lg:flex items-center justify-end text-lg">
    <a title="{{ $page->siteName }} Articles" href="/blog"
        class="ml-6 text-grey-darker hover:text-blue-dark {{ $page->isActive('/blog') ? 'active text-blue-dark' : '' }}">
        Articles
    </a>

    <a title="{{ $page->siteName }} Picks" href="/picks"
        class="ml-6 text-grey-darker hover:text-blue-dark {{ $page->isActive('/picks') ? 'active text-blue-dark' : '' }}">
        Picks
    </a>

    <a title="{{ $page->siteName }} About" href="/about"
        class="ml-6 text-grey-darker hover:text-blue-dark {{ $page->isActive('/about') ? 'active text-blue-dark' : '' }}">
        About
    </a>

    <a title="{{ $page->siteName }} Podcast" href="http://sixstarsonly.com/"
        class="ml-6 text-grey-darker hover:text-blue-dark" target="_blank" rel="noopener">
        Podcast
    </a>

    <a title="{{ $page->siteName }} Contact" href="/contact"
        class="ml-6 text-grey-darker hover:text-blue-dark {{ $page->isActive('/contact') ? 'active text-blue-dark' : '' }}">
        Contact
    </a>
</nav>
