<?php

use TightenCo\Jigsaw\Jigsaw;
use Sanity\Client as SanityClient;

require_once './sanity.php';

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
    $articlePaths = getArticlePaths();

    $jigsaw->setConfig('articlePaths', $articlePaths);
});
