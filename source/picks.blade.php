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
          <li>
            <a href="https://amzn.to/2BrmGSB">The 22 Immutable Laws of Marketing</a>
          </li>
          <li>
            <a href="https://amzn.to/2LqWT1s">The ONE Thing</a>
          </li>
          <li>
            <a href="https://amzn.to/2Br3rsk">
              Boom Town: The Fantastical Saga of Oklahoma City, its Chaotic Founding&#8230; its Purloined Basketball Team,
              and the Dream of Becoming a World-class Metropolis
            </a>
          </li>
          <li>
            <a href="https://amzn.to/2BsztUP">Behind the Cloud</a>
          </li>
          <li>
            <a href="https://amzn.to/2RakNDw">The Hard Thing About Hard Things</a>
          </li>
          <li>
            <a href="https://amzn.to/2Bu74Og">Built From Scratch</a>
          </li>
          <li>
            <a href="https://amzn.to/2S4uBMx">Rework</a>
          </li>
          <li>
            <a href="https://amzn.to/2S4uAYZ">Remote: Office Not Required</a>
          </li>
          <li>
            <a href="https://amzn.to/2QCXQK3">Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days</a>
          </li>
          <li>
            <a href="https://amzn.to/2By92No">Principles</a>
          </li>
          <li>
            <a href="https://amzn.to/2Lnh1Bs">Shoe Dog: A Memoir by the Creator of Nike</a>
          </li>
          <li>
            <a href="https://amzn.to/2SeSJwp">Influence: The Psychology of Persuasion</a>
          </li>
          <li>
            <a href="https://amzn.to/2LpH4bb">They Call Me Supermensch</a>
          </li>
          <li>
            <a href="https://amzn.to/2QBtojj">The 4-Hour Workweek</a>
          </li>
          <li>
            <a href="https://amzn.to/2R3scob">Traction: How Any Startup Can Achieve Explosive Customer Growth</a>
          </li>
          <li>
            <a href="https://amzn.to/2UU2YaZ">Zero to One: Notes on Startups, or How to Build the Future</a>
          </li>
          <li>
            <a href="https://amzn.to/2UR7ib0">
              Good to Great: Why Some Companies Make the Leap&#8230; and Others Don&#8217;t
            </a>
          </li>
          <li>
            <a href="https://amzn.to/2RariWW">Linchpin: Are You Indispensable?</a>
          </li>
          <li>
            <a href="https://amzn.to/2CmHZ9y">The 4-Hour Chef</a>
          </li>
          <li>
            <a href="https://amzn.to/2V1Xn2y"> Growth Hacker Marketing</a>
          </li>
          <li>
            <a href="https://amzn.to/2S4zCVn">Never Eat Alone</a>
          </li>
          <li>
            <a href="https://amzn.to/2CnwIpt">Vagabonding: An Uncommon Guide to the Art of Long-Term World Travel</a>
          </li>
          <li>
            <a href="https://amzn.to/2rI3Vpv">Into the Wild</a>
          </li>
          <li>
            <a href="https://amzn.to/2BpvcRS">
              Managing Humans: Biting and Humorous Tales of a Software Engineering Manager
            </a>
          </li>
          <li>
            <a href="https://amzn.to/2QYr2un"> Extreme Ownership: How U.S. Navy SEALs Lead and Win</a>
          </li>
          <li>
            <a href="https://amzn.to/2R3VraB">Managing Oneself</a>
          </li>
          <li>
            <a href="https://amzn.to/2BrmDpY">Ogilvy on Advertising</a>
          </li>
          <li>
            <a href="https://amzn.to/2ClDoEF">"Surely You're Joking, Mr. Feynman!"</a>
          </li>
          <li>
            <a href="https://amzn.to/2rImA4u">The 48 Laws of Power</a>
          </li>
          <li>
            <a href="https://amzn.to/2Bx59IS">Lost and Founder: A Painfully Honest Field Guide to the Startup World</a>
          </li>
          <li>
            <a href="https://amzn.to/2S8Zgsl">Confessions of an Advertising Man</a>
          </li>
          <li>
            <a href="https://amzn.to/2R0WDvp">Building a StoryBrand: Clarify Your Message So Customers Will Listen</a>
          </li>
        </ul>
    
        <h2>🎧 Podcasts</h2>
        <ul>
          <li>
            <a href="https://overcast.fm/itunes941907967/reply-all">Reply All</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1072506427/seeking-wisdom">Seeking Wisdom</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1372509198/six-stars-only">Six Stars Only</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1227971746/masters-of-scale-with-reid-hoffman">Masters of Scale</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1150510297/how-i-built-this-with-guy-raz">How I Built This</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes826420969/exponent">Exponent</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes931714873/full-stack-radio">Full Stack Radio</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1253186678/syntax-tasty-web-development-treats">
              Syntax - Tasty Web Development Treats
            </a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1206165808/the-indie-hackers-podcast">The Indie Hackers Podcast</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1281256991/made-you-think">Made You Think</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes997616345/the-startup-chat-with-steli-and-hiten">The Startup Chat</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1436223574/the-animalz-content-podcast">The Animalz Content Podcast</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1335814741/business-wars">Business Wars</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1437293054/without-fail">Without Fail</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1345042626/akimbo-a-podcast-from-seth-godin">Akimbo</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1264193508/rework">Rework</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes617416468/accidental-tech-podcast">Accidental Tech Podcast</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1011668648/recode-decode-hosted-by-kara-swisher">Recode Decode</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1070322219/jocko-podcast">Jocko Podcast</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes528458508/the-talk-show-with-john-gruber">The Talk Show with John Gruber</a>
          </li>
          <li>
            <a href="https://overcast.fm/itunes1119389968/revisionist-history">Revisionist History</a>
          </li>
        </ul>
    
        <h2>🛠️ Tools & Software</h2>
        <ul>
          <li>
            Insanely powerful file search + clipboard manager I can't live without:{' '}
            <a href="https://www.alfredapp.com/">Alfred</a>
          </li>
          <li>
            For my terminal I use <a href="https://www.iterm2.com/">iTerm 2</a>
          </li>
          <li>
            Most documents live in <a href="https://drive.google.com">Google Drive</a>
          </li>
          <li>
            I use <a href="https://matthewpalmer.net/rocket/">Rocket</a> for fast emoji shortcuts in any app
          </li>
          <li>
            <a href="https://evernote.com/">Evernote</a> for, well... Notes
          </li>
          <li>
            <a href="https://itunes.apple.com/us/app/amphetamine/id937984704?mt=12">Amphetamine</a> keeps my screen awake
          </li>
          <li>
            <a href="https://numi.io/">Numi</a> is a sweet calculator app
          </li>
          <li>
            I edit audio in <a href="https://www.adobe.com/products/audition.html">Adobe Audition</a> and video in{' '}
            <a href="https://www.adobe.com/products/premiere.html">Premiere Pro</a>
          </li>
          <li>
            Design work usually happens in <a href="https://www.sketchapp.com/">Sketch</a>
          </li>
          <li>
            Easy database management with <a href="https://www.sequelpro.com/">Sequel Pro</a>
          </li>
          <li>
            I dislike <a href="https://cyberduck.io/">Cyberduck</a>, but I use it for FTP because it's free
          </li>
        </ul>
    
        <h2>💻 Useful Gear</h2>
        <ul>
          <li>
            I feel weird about <a href="https://amzn.to/2QE05fT">Amazon Echo</a> , but continue to use it anyways
          </li>
          <li>
            The keyboard I swear by: <a href="https://amzn.to/2QYkoUX">Microsoft Sculpt Ergonomic</a>
          </li>
          <li>
            The mouse I use all day: <a href="https://amzn.to/2Lr0IU9">Logitech MX Master</a>
          </li>
          <li>
            My everyday carry bag: <a href="https://amzn.to/2QIP6Cd">Timbuk2 Proof</a>
          </li>
          <li>
            I drink from this <a href="https://amzn.to/2R2RmDw">Hydro Flask water bottle</a>
          </li>
          <li>
            This <a href="https://amzn.to/2R8apw0">Smartphone car mount</a> is amazing
          </li>
          <li>
            I use these <a href="https://amzn.to/2QYmyE3">cheap cables</a> to charge my iPhone
          </li>
          <li>
            I use this microphone to record videos on my iPhone: <a href="https://amzn.to/2BtGmoZ">Shure MV88</a>
          </li>
          <li>
            My go-to USB/XLR microphone: <a href="https://amzn.to/2R3oN8Y">ATR 2100</a>
          </li>
          <li>
            <a href="https://amzn.to/2SblFp0">Bluetooth headphones</a> I use for running
          </li>
          <li>
            I use <a href="https://www.apple.com/shop/product/MMEF2AM/A/airpods">Apple Airpods</a> every day because
            they&#8217;re easy
          </li>
          <li>
            Headphones I use to <a href="https://amzn.to/2R2HtFT">edit audio</a>
          </li>
          <li>
            <a href="https://amzn.to/2QCZiMv">Cheap Audio Interface</a> I use
          </li>
          <li>
            <a href="https://amzn.to/2ECMWxp">Crappy mic stand</a> I use
          </li>
          <li>
            <a href="https://amzn.to/2rJi1a5">Tulip Beer Glasses</a> I enjoy
          </li>
          <li>
            Coffee Grinder I use: <a href="https://amzn.to/2R6qwdD">Baratza Encore</a>
          </li>
          <li>
            Favorite single-serve coffee maker: <a href="https://amzn.to/2LneIyg">Aeropress</a>
          </li>
          <li>
            Favorite coffee dripper: <a href="https://amzn.to/2RbTQQd">Kalita Wave</a>
          </li>
          <li>
            Favorite notebook: <a href="https://amzn.to/2UU17Tz">Molskine with squared lines</a>
          </li>
        </ul>
      </div>
@endsection
