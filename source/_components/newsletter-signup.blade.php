<div class="flex justify-center lg:-mx-12 my-12 py-12 p-6 md:px-12 bg-grey-lighter border border-grey-light text-sm md:rounded shadow">
    <!-- Begin Mailchimp Signup Form -->
    {{-- <div id="mc_embed_signup">
        <form action="https://mattwoodscreative.us10.list-manage.com/subscribe/post" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>

            <div id="mc_embed_signup_scroll">
                <h2 class="text-xl">Like what you see? Sign up for my newsletter.</h2>
                <p class="text-center text-lg">Every two weeks I'll send you a collection of my most useful & interesting finds. Typically I'll share about marketing, entrepreneurship, software development, productivity and anything else worth sharing. I'll also link to any new articles, videos, or podcast episodes.</p>
                <div class="mc-field-group">
                    <label for="MERGE0">Email Address</label>
                    <input 
                    type="email" 
                    value="" 
                    name="MERGE0" 
                    class="required email" 
                    id="MERGE0" 
                    placeholder="youremail@awesomesauce.com">
                </div>
                <input type="hidden" name="u" value="d9c73c89d2fc8dcb8b42ab6d0">
                <input type="hidden" name="id" value="9478b59355">
                <div id="mce-responses" class="clear">
                    <div class="response" id="mce-error-response" style="display:none"></div>
                    <div class="response" id="mce-success-response" style="display:none"></div>
                </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->

                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_25582686a9fc051afd5453557_189578c854" tabindex="-1" value=""></div>
                <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
            </div>
        </form>
    </div> --}}
    <!--End Mailchimp Signup Form -->

    <div class="flex flex-col items-center text-center max-w-lg">

    <h2 class="text-3xl mb-0">Like what you see? Sign up for my newsletter.</h2>
    <p class="text-center text-lg mb-0">Every two weeks I'll send you a collection of my most useful & interesting finds. Typically I'll share about marketing, entrepreneurship, software development, productivity and anything else worth sharing. I'll also link to any new articles, videos, or podcast episodes.</p>
    
    <form
    class="w-full max-w-md mt-8"
    action="https://mattwoodscreative.us10.list-manage.com/subscribe/post"
    method="post"
  >
    <div class="block md:flex items-center rounded-lg shadow-none md:shadow-lg bg-tranparent md:bg-white">
      <input
        class="bg-white border-none w-full
            rounded-lg md:rounded-none md:rounded-l-lg
            text-grey-darkest py-4 px-4 leading-tight
            md:shadow-none shadow-lg mb-6 md:mb-0"
        type="email"
        placeholder="ambitious-maker@slack.com"
        aria-label="Email address entry"
        name="MERGE0"
        id="MERGE0"
        autocomplete="email"
        autocapitalize="off"
        autocorrect="off"
      />

      <input type="hidden" name="u" value="d9c73c89d2fc8dcb8b42ab6d0">
      <input type="hidden" name="id" value="9478b59355">

      <button
        class="w-full md:w-auto md:flex-no-shrink
              bg-blue hover:bg-blue-light border-blue
              hover:border-blue-light uppercase font-bold
              tracking-wide border-4 text-white py-4 px-4
              rounded-lg md:rounded-none md:rounded-r-lg
              text-base md:shadow-none shadow-lg"
        type="submit"
      >
        Stay in the Loop
      </button>
    </div>
  </form>
</div>

</div>

@push('scripts')
    <script src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
    <script>(function($) {
        window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);
    </script>
@endpush


