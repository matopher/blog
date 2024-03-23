<?php

use Sanity\Client as SanityClient;
use Sanity\BlockContent;

function getSanityProjectId()
{
    $projectId = env('SANITY_PROJECT_ID');

    return $projectId;
}

function getArticlePaths()
{
    $client = new SanityClient([
      "projectId" => getSanityProjectId(),
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

function getArticles()
{

    $client = new SanityClient([
        "projectId" => getSanityProjectId(),
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
            'content' => BlockContent::toHtml($article['content']),
        ];
    });

    return $results;
}
