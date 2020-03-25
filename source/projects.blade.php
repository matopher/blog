@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="Projects {{ $page->siteName }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="Software and Marketing projects I've worked on recently." />
@endpush

@section('body')
    <div>
        <h1>Projects</h1>
        <p>A few recent projects I've worked on and learned from recently.</p>

        <div class="my-8">
          <h2 class="mb-2">Spruce</h2>
          <p>A SaaS app I'm validating and developing during the Spring 2019 cohort of <a href="https://okcindiehackers.com/">OKC Indie Hackers</a>.</p>
        </div>

        <div class="my-8">
          <h2 class="mb-2">martech-api</h2>
            <a
            href="https://github.com/matopher/martech-api"
            class="inline-block bg-gray-400 hover:bg-blue-200 leading-loose tracking-wide text-gray-900 uppercase text-xs font-semibold rounded mr-4 my-2 px-3 pt-px"
            >
            Repo
            </a>
          <p>
            An API written in Javascript for Scott Brinker's infamous Martech 5000 infographic.</p>
        </div>

        <div class="my-8">
          <h2 class="mb-2">TwentyOne</h2>
            <a
            href="https://github.com/matopher/mc-hammerhead-shark"
            class="inline-block bg-gray-400 hover:bg-blue-200 leading-loose tracking-wide text-gray-900 uppercase text-xs font-semibold rounded mr-4 my-2 px-3 pt-px"
            >
            Repo
            </a>
          <p>
              A mobile app to kickstart and reward strong habits written in Javascript using Cordova. This was my first team project from OK Coders.
          </p>
        </div>

        <div class="my-8">
          <h2 class="mb-2">Pinboard Reader</h2>
            <a
            href="https://github.com/matopher/pinboard"
            class="inline-block bg-gray-400 hover:bg-blue-200 leading-loose tracking-wide text-gray-900 uppercase text-xs font-semibold rounded mr-4 my-2 px-3 pt-px"
            >
            Repo
            </a>
          <p>
                A custom Pinboard reader for my saved links using Tailwind CSS for styling and Laravel.
          </p>
        </div>

        <div class="my-8">
          <h2 class="mb-2">Spotter</h2>
            <a
            href="https://github.com/matopher/spotter"
            class="inline-block bg-gray-400 hover:bg-blue-200 leading-loose tracking-wide text-gray-900 uppercase text-xs font-semibold rounded mr-4 my-2 px-3 pt-px"
            >
            Repo
            </a>
          <p>
                A simple marketing analytics dashboard built with Laravel.
          </p>
        </div>

        <div class="my-8">
          <h2 class="mb-2">random-quote-generator</h2>
            <a
            href="https://github.com/matopher/random-quote-generator"
            class="inline-block bg-gray-400 hover:bg-blue-200 leading-loose tracking-wide text-gray-900 uppercase text-xs font-semibold rounded mr-4 my-2 px-3 pt-px"
            >
            Repo
            </a>
          <p>
                A React app that pulls in random quotes via an API.
          </p>
        </div>

      </div>
@endsection
