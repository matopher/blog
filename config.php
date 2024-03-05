<?php

use Sanity\Client as SanityClient;
use Sanity\BlockContent;

return [
    'production' => false,
    'baseUrl' => '',
    'title' => 'Jigsaw',
    'description' => 'Website description.',
    'contact_email' => 'support@example.com',
    'collections' => [
        'articles' => [
            'extends' => '_layouts.article',
            'items' => function ($config) {
               
               $articles = getArticles();
            //    var_dump($articles);
                return collect($articles)->map(function ($article) {
                    return [
                        'title' => $article['title'],
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

// return [
//     2    'collections' => [
//     3        'posts' => [
//     4            'extends' => '_layouts.post',
//     5            'items' => function ($config) {
//     6                $posts = json_decode(file_get_contents('https://jsonplaceholder.typicode.com/posts'));
//     7 
//     8                return collect($posts)->map(function ($post) {
//     9                    return [
//    10                        'title' => $post->title,
//    11                        'content' => $post->body,
//    12                    ];
//    13                });
//    14            },
//    15        ],
//    16    ],
//    17];


function getArticles() {
    
    $client = new SanityClient([
        'projectId' => '5c0nx2sc',
        'dataset' => 'production',
        'useCdn' => true,
        'apiVersion' => '2024-03-04',
    ]);

    $articles = $client->fetch(
        '*[_type == "article"]',
      );

    $results = collect($articles)->map(function ($article) {
        return [
            'title' => $article['title'],
            'date_published' => $article['date_published'],
            'content' => BlockContent::toHtml($article['content']),
        ];
    });

    // dd($result);

    return $results;
}