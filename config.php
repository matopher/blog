<?php

use Sanity\Client as SanityClient;
use Sanity\BlockContent;

require_once './sanity.php';

return [
    'production' => false,
    'baseUrl' => '',
    'title' => 'Jigsaw',
    'description' => 'Website description.',
    'contact_email' => 'support@example.com',
    'collections' => [
        'articles' => [
            'extends' => '_layouts.article',
            'paths' => getArticlePaths(),
            'items' => function ($config) {

                $articles = getArticles();
                //    var_dump($articles);
                return collect($articles)->map(function ($article) {
                    return [
                        'title' => $article['title'],
                        'date_published' => $article['date_published'],
                        'content' => $article['content'],

                    ];
                });
            }
        ],
        'pets' => [
            'extends' => '_layouts.pet',
            'items' =>  function ($config) {
                $pets = json_decode(file_get_contents('https://jsonplaceholder.typicode.com/users'));
                return collect($pets)->map(function ($pet) {
                    return [
                        'name' => $pet->username,
                    ];
                });

            }
        ]
    ],
];
