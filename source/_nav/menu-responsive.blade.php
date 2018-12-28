<nav id="js-nav-menu" class="nav-menu hidden lg:hidden">
    <ul class="list-reset my-0">
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Articles"
                href="/blog"
                class="nav-menu__item hover:text-blue {{ $page->isActive('/blog') ? 'active text-blue' : '' }}"
            >Articles</a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Picks"
                href="/picks"
                class="nav-menu__item hover:text-blue {{ $page->isActive('/picks') ? 'active text-blue' : '' }}"
            >Picks</a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Podcast"
                href="http://sixstarsonly.com/"
                target="_blank" 
                rel="noopener"
                class="nav-menu__item hover:text-blue"
            >Podcast</a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Contact"
                href="/contact"
                class="nav-menu__item hover:text-blue {{ $page->isActive('/contact') ? 'active text-blue' : '' }}"
            >Contact</a>
        </li>
    </ul>
</nav>
