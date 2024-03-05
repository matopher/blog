<?php

use TightenCo\Jigsaw\Jigsaw;
use Sanity\Client as SanityClient;

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
 });