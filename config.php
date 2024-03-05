<?php

use Sanity\Client as SanityClient;

$client = new SanityClient([
  'projectId' => '5c0nx2sc',
  'dataset' => 'production',
  'useCdn' => true,
  'apiVersion' => '2024-03-04',
]);

return [
    'production' => false,
    'baseUrl' => '',
    'title' => 'Jigsaw',
    'description' => 'Website description.',
    'contact_email' => 'support@example.com',
    'collections' => [
        'pets' => [
            'extends' => '_layouts.pet',
            // 'path' => 'pets'
        ]
    ],
];
