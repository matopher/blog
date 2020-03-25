@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="About {{ $page->siteName }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="A little bit about {{ $page->siteName }}" />
@endpush

@section('body')
    <div>
        <h1>The Woods + Jesus = Making Disciples in Peru</h1>
        <p>We have an opportunity to say “Yes” to Jesus again by going on our first missions trip as a married couple. </p>
        <p>Will you help us reach & serve Peru?</p>

        <iframe class="my-4 block" width="560" height="315" src="https://www.youtube.com/embed/xXdD-7g_NIw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <a href="https://app.managedmissions.com/MyTrip/woods" class="mt-4 text-3xl underline">Go here to give online &rarr;</a>

        <h2>Why are you going to Peru?</h2>
        <p>We want to share the Good News about Jesus with people in Lima & Pucallpa, Peru who don’t know him yet. Our discipleship training school ends with a two-week missions trip overseas to take the Jesus-centered obedience we’ve been practicing in Oklahoma and actively share it in the nations.</p>

        <h2>How are we spending our time?</h2>

        <img src="/assets/img/peru-1.png" alt="How are we spending our time?" />

        <ul>
            <li>Working & Praying alongside local missionaries & churches</li>
            <li>Teaching in the Jungle by partnering with a local Bible institute for an indigenous tribe</li>
            <li>Evangelism Outreaches</li>
            <li>Youth ministry in schools and churches</li>
        </ul>

        <h2>What support do we need?</h2>
        <h3>1) Pray</h3>
        <p>We need prayer partners to pray for God to shift the hearts of Peru’s people to receive the Gospel. Specifically pray for:</p>
        <ul>
          <li>Hearts ready to hear and accept the Gospel.</li>
          <li>Miraculous healings and testimonies.</li>
          <li>Our entire team to raise the funds they need.</li>
        </ul>

        <h3>2) Give</h3>
        <p>We’re saying “no” to a good chunk of non-essential expenses for the next few months to say “yes” to investing in this trip. But we still need help to raise the $6,000 total to go, mainly for airfare. Will you give to help us?</p>
        <p>If you want want to support us, you can use the link below to give online or <a href="mailto:mw@mattwoods?subject=Peru Trip">email us</a> and we'll send you the instructions to mail a check.</p>

        <a href="https://app.managedmissions.com/MyTrip/woods" class="mt-4 text-3xl underline">Go here to give online &rarr;</a>

        <h2>Trip Details & What's Next</h2>
        <p>We’ll be leaving May 25.</p>

        <p>Sign up to get our email updates using the form below. We’ll be sending email updates with prayer points
            leading up to the trip, ways we’re excited for God to use us in Peru, and testimonies of people encountering
            Jesus after we get home.</p>

        <p>Thank you for partnering with us to see God’s transforming love brought to life in our marriage and the
            nations. We love ya! Let us know if you have questions.</p>

        <p>- Matt & M’Kaylah Woods</p>

        {{-- Email Signup --}}
        <div class="flex justify-center lg:-mx-12 my-12 py-12 p-6 md:px-12 bg-gray-200 border border-gray-400 text-sm md:rounded shadow">

                <div class="flex flex-col items-center text-center max-w-lg">

                <h2 class="text-3xl mb-0">Get email updates for our Peru Trip</h2>
                <p class="text-center text-lg mb-0"> We’ll be sending email updates with prayer points leading up to the trip, ways we’re excited for God to use us in Peru, and testimonies of people encountering Jesus after we get home.</p>

                <form
                class="w-full max-w-md mt-8"
                action="https://mattwoodscreative.us10.list-manage.com/subscribe/post"
                method="post"
              >
                <div class="block md:flex items-center rounded-lg shadow-none md:shadow-lg bg-tranparent md:bg-white">
                  <input
                    class="bg-white border-none w-full
                        rounded-lg md:rounded-none md:rounded-l-lg
                        text-gray-500-900 py-4 px-4 leading-tight
                        md:shadow-none shadow-lg mb-6 md:mb-0"
                    type="email"
                    placeholder="Your best email"
                    aria-label="Email address entry"
                    name="MERGE0"
                    id="MERGE0"
                    autocomplete="email"
                    autocapitalize="off"
                    autocorrect="off"
                  />

                  <input type="hidden" name="u" value="d9c73c89d2fc8dcb8b42ab6d0">
                  <input type="hidden" name="id" value="3957e2af21">

                  <button
                    class="w-full md:w-auto md:flex-no-shrink
                          bg-blue hover:bg-blue-400 border-blue
                          hover:border-blue-400 uppercase font-bold
                          tracking-wide border-4 text-white py-4 px-4
                          rounded-lg md:rounded-none md:rounded-r-lg
                          text-base md:shadow-none shadow-lg"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
                <small class="pt-2">No spam. Unsubscribe anytime.</small>
            </div>

            </div>

            @push('scripts')
                <script src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
                <script>(function($) {
                    window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);
                </script>
            @endpush



      </div>
@endsection

