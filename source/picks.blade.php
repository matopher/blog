@extends('_layouts.master')

@push('meta')
    <meta property="og:title" content="About {{ $page->siteName }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}"/>
    <meta property="og:description" content="A little bit about {{ $page->siteName }}" />
@endpush

@section('body')
    <div>
        <h1>Books, Podcasts, Tools & Software I Recommend</h1>
        <p>True story: I kept finding myself recommending cool stuff to my friends, but... </p>
        <p>I'd always have to fumble around to find the links and forget, etc. etc. 🙄</p>
        <p>
          <strong>This handy list solves that problem! </strong>I hope you find something useful that makes your life better
          in some small way.
        </p>
        <p>
          I use affiliate links for Amazon products so I can buy more cool stuff to review. Hopefully that's cool
          with you. 🤙🏻
        </p>
    
        <h2>📚 Books on Marketing, Entrepreneurship, Productivity & More</h2>
        <ul>
          <li class="mb-2">
            <a href="https://amzn.to/2BrmGSB" target="_blank" rel="noopener">The 22 Immutable Laws of Marketing</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2LqWT1s" target="_blank" rel="noopener">The ONE Thing</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2Br3rsk" target="_blank" rel="noopener">
              Boom Town: The Fantastical Saga of Oklahoma City, its Chaotic Founding&#8230; its Purloined Basketball Team,
              and the Dream of Becoming a World-class Metropolis
            </a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2BsztUP" target="_blank" rel="noopener">Behind the Cloud</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2RakNDw" target="_blank" rel="noopener">The Hard Thing About Hard Things</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2Bu74Og" target="_blank" rel="noopener">Built From Scratch</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2S4uBMx" target="_blank" rel="noopener">Rework</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2S4uAYZ" target="_blank" rel="noopener">Remote: Office Not Required</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2QCXQK3" target="_blank" rel="noopener">Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2By92No" target="_blank" rel="noopener">Principles</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2Lnh1Bs" target="_blank" rel="noopener">Shoe Dog: A Memoir by the Creator of Nike</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2SeSJwp" target="_blank" rel="noopener">Influence: The Psychology of Persuasion</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2LpH4bb" target="_blank" rel="noopener">They Call Me Supermensch</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2QBtojj" target="_blank" rel="noopener">The 4-Hour Workweek</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2R3scob" target="_blank" rel="noopener">Traction: How Any Startup Can Achieve Explosive Customer Growth</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2UU2YaZ" target="_blank" rel="noopener">Zero to One: Notes on Startups, or How to Build the Future</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2UR7ib0" target="_blank" rel="noopener">
              Good to Great: Why Some Companies Make the Leap&#8230; and Others Don&#8217;t
            </a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2RariWW" target="_blank" rel="noopener">Linchpin: Are You Indispensable?</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2CmHZ9y" target="_blank" rel="noopener">The 4-Hour Chef</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2V1Xn2y" target="_blank" rel="noopener"> Growth Hacker Marketing</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2S4zCVn" target="_blank" rel="noopener">Never Eat Alone</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2CnwIpt" target="_blank" rel="noopener">Vagabonding: An Uncommon Guide to the Art of Long-Term World Travel</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2rI3Vpv" target="_blank" rel="noopener">Into the Wild</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2BpvcRS" target="_blank" rel="noopener">
              Managing Humans: Biting and Humorous Tales of a Software Engineering Manager
            </a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2QYr2un" target="_blank" rel="noopener"> Extreme Ownership: How U.S. Navy SEALs Lead and Win</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2R3VraB" target="_blank" rel="noopener">Managing Oneself</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2BrmDpY" target="_blank" rel="noopener">Ogilvy on Advertising</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2ClDoEF" target="_blank" rel="noopener">"Surely You're Joking, Mr. Feynman!"</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2rImA4u" target="_blank" rel="noopener">The 48 Laws of Power</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2Bx59IS" target="_blank" rel="noopener">Lost and Founder: A Painfully Honest Field Guide to the Startup World</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2S8Zgsl" target="_blank" rel="noopener">Confessions of an Advertising Man</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2R0WDvp" target="_blank" rel="noopener">Building a StoryBrand: Clarify Your Message So Customers Will Listen</a>
          </li>
          <li class="mb-2">
            <a href="https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299" target="_blank" rel="noopener">Atomic Habits</a>
          </li>
          <li class="mb-2">
            <a href="https://www.amazon.com/McGraw-Hill-Education-Positioning-Battle-Your/dp/B000EQDE1C/" target="_blank" rel="noopener">Positioning: The Battle for Your Mind</a>
          </li>
          <li class="mb-2">
            <a href="https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299"
                target="_blank" rel="noopener">Atomic Habits</a>
          </li>
          <li class="mb-2">
            <a href="https://www.amazon.com/American-Kingpin-Criminal-Mastermind-Behind/dp/B06Y1QXMXX/"
                target="_blank" rel="noopener">American Kingpin: The Epic Hunt for the Criminal Mastermind Behind the Silk Road</a>
          </li>
          <li class="mb-2">
            <a href="https://www.amazon.com/Simon-Schuster-Audio-Principles-Life/dp/B074B2CZJG/ref=sr_1_1?ie=UTF8&qid=1549497822&sr=1-1-spons&keywords=principles"
                target="_blank" rel="noopener">Principles</a>
          </li>
        </ul>
    
        <h2>🎧 Podcasts</h2>
        <ul>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes941907967/reply-all" target="_blank" rel="noopener">Reply All</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1072506427/seeking-wisdom" target="_blank" rel="noopener">Seeking Wisdom</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1372509198/six-stars-only" target="_blank" rel="noopener">Six Stars Only</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1227971746/masters-of-scale-with-reid-hoffman" target="_blank" rel="noopener">Masters of Scale</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1150510297/how-i-built-this-with-guy-raz" target="_blank" rel="noopener">How I Built This</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes826420969/exponent" target="_blank" rel="noopener">Exponent</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes931714873/full-stack-radio" target="_blank" rel="noopener">Full Stack Radio</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1253186678/syntax-tasty-web-development-treats" target="_blank" rel="noopener">
              Syntax - Tasty Web Development Treats
            </a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1206165808/the-indie-hackers-podcast" target="_blank" rel="noopener">The Indie Hackers Podcast</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1281256991/made-you-think" target="_blank" rel="noopener">Made You Think</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes997616345/the-startup-chat-with-steli-and-hiten" target="_blank" rel="noopener">The Startup Chat</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1436223574/the-animalz-content-podcast" target="_blank" rel="noopener">The Animalz Content Podcast</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1335814741/business-wars" target="_blank" rel="noopener">Business Wars</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1437293054/without-fail" target="_blank" rel="noopener">Without Fail</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1345042626/akimbo-a-podcast-from-seth-godin" target="_blank" rel="noopener">Akimbo</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1264193508/rework" target="_blank" rel="noopener">Rework</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes617416468/accidental-tech-podcast" target="_blank" rel="noopener">Accidental Tech Podcast</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1011668648/recode-decode-hosted-by-kara-swisher" target="_blank" rel="noopener">Recode Decode</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1070322219/jocko-podcast" target="_blank" rel="noopener">Jocko Podcast</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes528458508/the-talk-show-with-john-gruber" target="_blank" rel="noopener">The Talk Show with John Gruber</a>
          </li>
          <li class="mb-2">
            <a href="https://overcast.fm/itunes1119389968/revisionist-history" target="_blank" rel="noopener">Revisionist History</a>
          </li>
        </ul>
    
        <h2>🛠️ Tools & Software</h2>
        <ul>
          <li class="mb-2">
            Insanely powerful file search + clipboard manager I can't live without:
            <a href="https://www.alfredapp.com/" target="_blank" rel="noopener">Alfred</a>
          </li>
          <li class="mb-2">
            For my terminal I use <a href="https://www.iterm2.com/" target="_blank" rel="noopener">iTerm 2</a>
          </li>
          <li class="mb-2">
            Most documents live in <a href="https://drive.google.com" target="_blank" rel="noopener">Google Drive</a>
          </li>
          <li class="mb-2">
            I use <a href="https://matthewpalmer.net/rocket/" target="_blank" rel="noopener">Rocket</a> for fast emoji shortcuts in any app
          </li>
          <li class="mb-2">
            <a href="https://evernote.com/" target="_blank" rel="noopener">Evernote</a> for, well... Notes
          </li>
          <li class="mb-2">
            <a href="https://itunes.apple.com/us/app/amphetamine/id937984704?mt=12" target="_blank" rel="noopener">Amphetamine</a> keeps my screen awake
          </li>
          <li class="mb-2">
            <a href="https://numi.io/" target="_blank" rel="noopener">Numi</a> is a sweet calculator app
          </li>
          <li class="mb-2">
            I edit audio in <a href="https://www.adobe.com/products/audition.html" target="_blank" rel="noopener">Adobe Audition</a> and video in
            <a href="https://www.adobe.com/products/premiere.html" target="_blank" rel="noopener">Premiere Pro</a>
          </li>
          <li class="mb-2">
            Design work usually happens in <a href="https://www.sketchapp.com/" target="_blank" rel="noopener">Sketch</a>
          </li>
          <li class="mb-2">
            Easy database management with <a href="https://www.sequelpro.com/" target="_blank" rel="noopener">Sequel Pro</a>
          </li>
          <li class="mb-2">
            I dislike <a href="https://cyberduck.io/" target="_blank" rel="noopener">Cyberduck</a>, but I use it for FTP because it's free
          </li>
        </ul>
    
        <h2>💻 Useful Gear</h2>
        <ul>
          <li class="mb-2">
            I feel weird about <a href="https://amzn.to/2QE05fT" target="_blank" rel="noopener">Amazon Echo</a>, but continue to use it anyways
          </li>
          <li class="mb-2">
            The keyboard I swear by: <a href="https://amzn.to/2QYkoUX" target="_blank" rel="noopener">Microsoft Sculpt Ergonomic</a>
          </li>
          <li class="mb-2">
            The mouse I use all day: <a href="https://amzn.to/2Lr0IU9" target="_blank" rel="noopener">Logitech MX Master</a>
          </li>
          <li class="mb-2">
            My everyday carry bag: <a href="https://amzn.to/2QIP6Cd" target="_blank" rel="noopener">Timbuk2 Proof</a>
          </li>
          <li class="mb-2">
            I drink from this <a href="https://amzn.to/2R2RmDw" target="_blank" rel="noopener">Hydro Flask water bottle</a>
          </li>
          <li class="mb-2">
            This <a href="https://amzn.to/2R8apw0" target="_blank" rel="noopener">Smartphone car mount</a> is amazing
          </li>
          <li class="mb-2">
            I use these <a href="https://amzn.to/2QYmyE3" target="_blank" rel="noopener">cheap cables</a> to charge my iPhone
          </li>
          <li class="mb-2">
            I use this microphone to record videos on my iPhone: <a href="https://amzn.to/2BtGmoZ" target="_blank" rel="noopener">Shure MV88</a>
          </li>
          <li class="mb-2">
            My go-to USB/XLR microphone: <a href="https://amzn.to/2R3oN8Y" target="_blank" rel="noopener">ATR 2100</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2SblFp0" target="_blank" rel="noopener">Bluetooth headphones</a> I use for running
          </li>
          <li class="mb-2">
            I use <a href="https://www.apple.com/shop/product/MMEF2AM/A/airpods" target="_blank" rel="noopener">Apple Airpods</a> every day because
            they&#8217;re easy
          </li>
          <li class="mb-2">
            Headphones I use to <a href="https://amzn.to/2R2HtFT" target="_blank" rel="noopener">edit audio</a>
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2QCZiMv" target="_blank" rel="noopener">Cheap Audio Interface</a> I use
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2ECMWxp" target="_blank" rel="noopener">Crappy mic stand</a> I use
          </li>
          <li class="mb-2">
            <a href="https://amzn.to/2rJi1a5" target="_blank" rel="noopener">Tulip Beer Glasses</a> I enjoy
          </li>
          <li class="mb-2">
            Coffee Grinder I use: <a href="https://amzn.to/2R6qwdD" target="_blank" rel="noopener">Baratza Encore</a>
          </li>
          <li class="mb-2">
            Favorite single-serve coffee maker: <a href="https://amzn.to/2LneIyg" target="_blank" rel="noopener">Aeropress</a>
          </li>
          <li class="mb-2">
            Favorite coffee dripper: <a href="https://amzn.to/2RbTQQd" target="_blank" rel="noopener">Kalita Wave</a>
          </li>
          <li class="mb-2">
            Favorite notebook: <a href="https://amzn.to/2UU17Tz" target="_blank" rel="noopener">Molskine with squared lines</a>
          </li>
        </ul>
      </div>
@endsection
