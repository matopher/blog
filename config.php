<?php

return [
    'baseUrl' => 'http://mattwoods-blog.test/',
    'production' => false,
    'siteName' => 'Matt Woods: Marketer + Developer',
    'siteDescription' => 'Crazy about good books, growing businesses through honest marketing, and making everyone around me feel loved. Join me on my journey.',
    'siteAuthor' => 'Matt Woods',

    // collections
    'collections' => [
        'posts' => [
            'author' => 'Matt Woods', // Default author, if not provided in a post
            'sort' => '-date',
            'path' => 'blog/{filename}',
        ],
        'categories' => [
            'path' => '/blog/categories/{filename}',
            'posts' => function ($page, $allPosts) {
                return $allPosts->filter(function ($post) use ($page) {
                    return $post->categories ? in_array($page->getFilename(), $post->categories, true) : false;
                });
            },
        ],
        'notes' => [
            'path' => 'notes/{filename}',
        ],
    ],

    // helpers
    'getDate' => function ($page) {
        return Datetime::createFromFormat('U', $page->date);
    },
    'excerpt' => function ($page, $length = 255) {
        $cleaned = strip_tags(
            preg_replace(['/<pre>[\w\W]*?<\/pre>/', '/<h\d>[\w\W]*?<\/h\d>/'], '', $page->getContent()),
            '<code>'
        );

        $truncated = substr($cleaned, 0, $length);

        if (substr_count($truncated, '<code>') > substr_count($truncated, '</code>')) {
            $truncated .= '</code>';
        }

        return strlen($cleaned) > $length
            ? preg_replace('/\s+?(\S+)?$/', '', $truncated) . '...'
            : $cleaned;
    },
    'isActive' => function ($page, $path) {
        return ends_with(trimPath($page->getPath()), trimPath($path));
    },
    'allCategories' => function ($page, $posts) {
        return $posts->pluck('categories')->flatten()->unique();
    },
    'countPostsInCategory' => function ($page, $posts, $category) {
        return $posts->reduce(function ($carry, $post) use ($category) {
            return $carry + collect($post->categories)->contains($category);
        });
    },
];
