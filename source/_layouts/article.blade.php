@extends('_layouts.main')


@section('body')
   <h1>{{ $page->title }}</h1> 
   <p>{{ $page->published_date }}</p>

    @yield('content')
@endsection