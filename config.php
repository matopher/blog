<?php

use Sanity\Client as SanityClient;
use Sanity\BlockContent;

// function getArticles() {
    
//     $client = new SanityClient([
//         'projectId' => '5c0nx2sc',
//         'dataset' => 'production',
//         'useCdn' => true,
//         'apiVersion' => '2024-03-04',
//     ]);

//     $articles = $client->fetch(
//         '*[_type == "article"]',
//       );

//     $results = collect($articles)->map(function ($article) {
//         return [
//             'title' => $article['title'],
//             'date_published' => formatDate($article['date_published']),
//             'slug' => $article['slug']['current'],
//             'content' => BlockContent::toHtml($article['content']),
//         ];
//     });

//     // dd($results);

//     return $results;
// }

// function getSlugs() {
//     $slugs = function($articles = null) {
//         $articles = getArticles();

//         return collect($articles)->map(function ($article) {
//             return $article['slug'];
//         });
//     };

//    return $slugs; 
// }

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
                        'date_published' => $article['date_published'],
                        'slug' => $article['slug'],
                        'content' => $article['content'],

                    ];
                });
            },
            // TODO: Try event listener approach to statically pull articles once.

            // 'filename' => function($articles = null) {
            //     $articles = getArticles();

            //     return collect($articles)->map(function ($article) {

            //         $slug = $article['slug'];
            //         // dd($slug);
            //         return str($article['slug']);
            //     });
            // },
            // 'path' => function($articles = null) {
            //     $articles = getArticles();

            //     return collect($articles)->map(function ($article) {
            //         // dd($article['slug']);
            //         return '/articles/' . str($article['slug']);
            //     });
            // },
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
