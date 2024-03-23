<?php

use TightenCo\Jigsaw\Jigsaw;
use Sanity\Client as SanityClient;
use Sanity\BlockContent;

/** @var \Illuminate\Container\Container $container */
/** @var \TightenCo\Jigsaw\Events\EventBus $events */

/*
 * You can run custom code at different stages of the build process by
 * listening to the 'beforeBuild', 'afterCollections', and 'afterBuild' events.
 *
 * For example:
 *
 * $events->beforeBuild(function (Jigsaw $jigsaw) {
 *     // Your code here
 * });
 */

 $events->beforeBuild(function (Jigsaw $jigsaw) {
    $client = new SanityClient([
        'projectId' => '5c0nx2sc',
        'dataset' => 'production',
        'useCdn' => true,
        'apiVersion' => '2024-03-04',
      ]);
      
      $results = $client->fetch(
          '*[_type == "pet"]',
        );

        // var_dump($results);
        $jigsaw->setConfig('remotePets', $results);

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
                    'date_published' => formatDate($article['date_published']),
                    'slug' => $article['slug']['current'],
                    'content' => BlockContent::toHtml($article['content']),
                ];
            });
        
            // dd($results);
        
        }

        $articles = getArticles();
        // dd($articles);

        $jigsaw->setConfig('sanityArticles', $articles);
 });