@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="About {{ $page->siteName }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="A little bit about {{ $page->siteName }}" />
@endpush

@section('body')
    <h1>Who is this "Matt Woods" character anyways?</h1>

    <img src="/assets/img/matt.jpg"
        alt="Matt Woods"
        class="flex rounded-full h-64 w-64 bg-contain mx-auto md:float-right my-6 md:ml-10">

        <p>Here's a quick peek intro my core values so you can understand what I'm really about.</p>

        <h2>Loving at 100%</h2>
    
        <p>I’m about people — first and foremost.
        I’m a passionate disciple of Jesus and I strive to love people right where they’re at today.
        </p>
    
        <h2>Hunger for excellence</h2>
    
        <p>I reject the bare minimum and forge ahead.</p>
    
        <h2>Always encourage</h2>
    
        <p>My life is a precision instrument designed to refine
        character and call out the treasure in others.
        </p>
    
        <h2>Stay humble &amp; thoughtful</h2>
    
        <p>I step out to set aside pre-chewed thinking and
        walk in others’ shoes to understand their unique perspective.
        </p>

@endsection
