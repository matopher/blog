<nav class="hidden lg:flex items-center justify-end text-lg">
    <a title="{{ $page->siteName }} Articles" href="/blog"
        class="ml-6 text-gray-700 hover:text-blue-700 {{ $page->isActive('/blog') ? 'active text-blue-700' : '' }}">
        Articles
    </a>

    <a title="{{ $page->siteName }} Picks" href="/picks"
        class="ml-6 text-gray-700 hover:text-blue-700 {{ $page->isActive('/picks') ? 'active text-blue-700' : '' }}">
        Picks
    </a>

    <a title="{{ $page->siteName }} Notes" href="/notes"
        class="ml-6 text-gray-700 hover:text-blue-700 {{ $page->isActive('/notes') ? 'active text-blue-700' : '' }}">
        Notes
    </a>

    <a title="{{ $page->siteName }} Picks" href="/projects"
        class="ml-6 text-gray-700 hover:text-blue-700 {{ $page->isActive('/projects') ? 'active text-blue-700' : '' }}">
        Projects
    </a>

    <a title="{{ $page->siteName }} Podcast" href="http://sixstarsonly.com/"
        class="ml-6 text-gray-700 hover:text-blue-700" target="_blank" rel="noopener">
        Podcast
    </a>

    <a title="{{ $page->siteName }} Contact" href="/contact"
        class="ml-6 text-gray-700 hover:text-blue-700 {{ $page->isActive('/contact') ? 'active text-blue-700' : '' }}">
        Contact
    </a>
</nav>
