<?php

use Sanity\Client as SanityClient;
use Sanity\BlockContent;

function getArticlePaths()
{
    $client = new SanityClient([
      "projectId" => "5c0nx2sc",
      "dataset" => "production",
      "useCdn" => true,
      "apiVersion" => "2024-03-04"
    ]);

    $articles = $client->fetch('*[_type == "article"]');

    $paths = collect($articles)
      ->map(function ($article) {
          return "/articles/" . $article["slug"]["current"];
      })
      ->toArray();

    return $paths;
}
