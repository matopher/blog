@extends('_layouts.main')


@section('body')
<article class="prose p-8">
   <h1>{{ $page->title }}</h1> 
   <p>{{ $page->date_published }}</p>

    @yield('content')
</article>
@endsection