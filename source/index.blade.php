@extends('_layouts.main')

@section('body')
<div class="p-8">
    <h1 class="text-3xl font-bold">Hello world!</h1>
    <p> {{ $page->contact_email }} </p>
    <p> {{ $page->remotePets->last()->name }} </p>
</div>
@endsection
