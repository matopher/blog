import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description:
    "Check out the books, podcasts, tools & software I've recommended most often.",
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Check out the books, podcasts, tools & software I've recommended most often."
      intro="True story: I kept finding myself recommending cool stuff to my friends, but...

      I'd always have to fumble around to find the links and forget, etc. etc. 🙄

      This handy list solves that problem! I hope you find something useful that makes your life better in some small way."
    >
      <div className="space-y-20">
        <ToolsSection title="Gear">
          <Tool title="M2 Macbook Air">
            This machine rips. It's always snappy, the battery life refuses to
            quit, and the keyboard feels just right. I've been using the 15"
            model for a bit of extra screen space.
          </Tool>

          <Tool title="Microsoft Sculpt Ergonomic">
            The keyboard I swear by:{' '}
            <a href="https://amzn.to/2QYkoUX" class="text-teal-500">
              Microsoft Sculpt Ergonomic
            </a>
            .
          </Tool>
          <Tool title="Logitech MX Master">
            The mouse I use all day:{' '}
            <a href="https://amzn.to/2Lr0IU9" class="text-teal-500">
              Logitech MX Master
            </a>
            .
          </Tool>
          <Tool title="Aer Backpack">
            My everyday carry bag lately is the{' '}
            <a
              href="https://aersf.com/products/go-pack-2"
              class="text-teal-500"
            >
              Aer Go Pack 2
            </a>
            . I'm a fan of their thoughtful, straightforward design.
          </Tool>
          <Tool title="Owalla Freesip">
            I drink from this{' '}
            <a
              href="https://owalalife.com/products/freesip?variant=42363449933983"
              class="text-teal-500"
            >
              Owalla Freesip
            </a>
            . No leaks and a refreshingly useful built-in straw set this one
            apart.
          </Tool>

          <Tool title="Shure MV88">
            I use this microphone to record videos on my iPhone:{' '}
            <a href="https://amzn.to/2BtGmoZ" class="text-teal-500">
              Shure MV88
            </a>
            .
          </Tool>

          <Tool title="Baratza Encore">
            Coffee Grinder I use:{' '}
            <a href="https://amzn.to/2R6qwdD" class="text-teal-500">
              Baratza Encore
            </a>
            .
          </Tool>
          <Tool title="Aeropress">
            Favorite single-serve coffee maker:{' '}
            <a href="https://amzn.to/2LneIyg" class="text-teal-500">
              Aeropress
            </a>
            .
          </Tool>
          <Tool title="Kalita Wave">
            Favorite coffee dripper:{' '}
            <a href="https://amzn.to/2RbTQQd" class="text-teal-500">
              Kalita Wave
            </a>
            .
          </Tool>
        </ToolsSection>

        <ToolsSection title="Podcasts">
          <Tool title="Acquired">
            Learn the playbooks that built the world’s greatest companies — and
            how you can apply them as a founder, operator, or investor.{' '}
            <a href="https://www.acquired.fm/" class="text-teal-500">
              Listen to podcast →
            </a>
          </Tool>
          <Tool title="The Big Picture">
            Sean Fennessey and Amanda Dobbins review the movies you need to see.
            Plus: Top 5s, Movie Drafts, Oscars analysis, and more, featuring a
            rotating cast of Ringer colleagues like Chris Ryan, Van Lathan, and
            Bill Simmons.{' '}
            <a
              href="https://open.spotify.com/show/6mTel3azvnK8isLs4VujvF"
              class="text-teal-500"
            >
              Listen to podcast →
            </a>
          </Tool>
          <Tool title="Blank Check">
            Not just another bad movie podcast, Blank Check with Griffin & David
            reviews directors' complete filmographies episode to episode.
            Specifically, the auteurs whose early successes afforded them the
            rare ‘blank check’ from Hollywood to produce passion projects.{' '}
            <a href="https://www.blankcheckpod.com/" class="text-teal-500">
              Listen to podcast →
            </a>
          </Tool>

          <Tool title="Conversations with Tyler">
            On the Conversations with Tyler podcast, esteemed economist Tyler
            Cowen engages with today’s most underrated thinkers in wide-ranging
            explorations of their work, the world, and everything in between.{' '}
            <a href="https://conversationswithtyler.com/" class="text-teal-500">
              Listen to podcast →
            </a>
          </Tool>
          <Tool title="Founders">
            Learn from history's greatest entrepreneurs. Every week I read a
            biography of an entrepreneur and find ideas you can use in your
            work.{' '}
            <a href="https://www.founderspodcast.com/" class="text-teal-500">
              Listen to podcast →
            </a>
          </Tool>
          <Tool title="Huberman Lab">
            Regularly ranked as the #1 health podcast in the world, Dr. Huberman
            discusses science and science-based tools for everyday life. New
            episodes are released every Monday.{' '}
            <a href="https://www.hubermanlab.com/podcast" class="text-teal-500">
              Listen to podcast →
            </a>
          </Tool>
          <Tool title="Invest Like the Best">
            Conversations with the best investors and business leaders in the
            world. We explore their ideas, methods, and stories to help you
            better invest your time and money.{' '}
            <a
              href="https://www.joincolossus.com/episodes?prod-episode-release-desc%5BrefinementList%5D%5BpodcastName%5D%5B0%5D=Invest%20Like%20the%20Best"
              class="text-teal-500"
            >
              Listen to podcast →
            </a>
          </Tool>
          <Tool title="The Watch">
            Every week, The Ringer's Andy Greenwald and Chris Ryan -- longtime
            friends and pop culture addicts -- break down the latest in TV,
            movies, and music.{' '}
            <a
              href="https://open.spotify.com/show/3IcA76e8ZV0NNSJ81XHQUg"
              class="text-teal-500"
            >
              Listen to podcast →
            </a>
          </Tool>
          <Tool title="The Knowledge Project">
            Shane Parrish sits down with some of the world’s most influential
            people on a journey to master the best of what they have figured
            out. He uncovers the earned secrets, important insights, and
            specific tactics that help him, and you, achieve success and live a
            more fulfilled life.{' '}
            <a
              href="https://fs.blog/knowledge-project-podcast/"
              class="text-teal-500"
            >
              Listen to podcast →
            </a>
          </Tool>
          <Tool title="Lenny's Podcast">
            Interviews with world-class product leaders and growth experts to
            uncover concrete, actionable, and tactical advice to help you build,
            launch, and grow your own product.{' '}
            <a href="https://www.lennyspodcast.com/" class="text-teal-500">
              Listen to podcast →
            </a>
          </Tool>
          <Tool title="Dissect">
            A serialized music podcast that examines a single album per season,
            one song per episode.{' '}
            <a href="https://dissectpodcast.com/" class="text-teal-500">
              Listen to podcast →
            </a>
          </Tool>

          <Tool title="Hardcore History">
            Journalist and broadcaster Dan Carlin takes his "Martian",
            unorthodox way of thinking and applies it to the past.{' '}
            <a href="https://www.dancarlin.com/" class="text-teal-500">
              Listen to podcast →
            </a>
          </Tool>
        </ToolsSection>
        <ToolsSection title="Newsletters">
          <Tool title="Lenny's Newsletter">
            <a href="https://vrlps.co/gdg58HG/cp" class="text-teal-500">
              Lenny's Newsletter
            </a>{' '}
            — Top notch product and growth advice from someone who's actually
            done the work as one of Airbnb's lead product managers. If you build
            software, it's an incredible value.
          </Tool>
          <Tool title="Nat Eliason's Monday Medley">
            <a href="https://www.nateliason.com/join" class="text-teal-500">
              Nat Eliason's Monday Medley
            </a>{' '}
            — Nat's an undeniably fascinating renaissance thinker. Regenerative
            farming? Groundbreaking note-taking systems? The hidden perils of
            virtual reality? Every week he serves up delightful commentary on a
            couple handfuls of links on wildly different topics. And it's always
            good.
          </Tool>

          <Tool title="NextDraft">
            <a href="https://nextdraft.com/" class="text-teal-500">
              NextDraft
            </a>{' '}
            — A witty, irreverent daily editorial summary of current news and
            events by Dave Pell. Love puns? You can't help but fall
            head-over-heels for his headlines.
          </Tool>
          <Tool title="Stratechery">
            <a href="https://stratechery.com/" class="text-teal-500">
              Stratechery
            </a>{' '}
            — Ben Thompson expertly dissects the strategic decisions of
            technology giants like Amazon, Apple, and Facebook. His writing via
            Daily Updates and weekly free articles has been remarkably
            consistent, fresh, and valuable for anyone who thinks about
            technology.
          </Tool>
          <Tool title="David Perell">
            <a href="https://perell.com/newsletter/" class="text-teal-500">
              David Perell
            </a>{' '}
            — A natural writer, teacher, and wide-ranging seeker of intellectual
            topics.
          </Tool>
          <Tool title="James Clear">
            <a href="https://jamesclear.com/newsletter" class="text-teal-500">
              James Clear
            </a>{' '}
            — Short, stirring thoughts on self-improvement from the author of
            one of my all-time favorite productivity books, Atomic Habits. His
            goal is simple: "Deliver the most wisdom per word of any newsletter
            on the web."
          </Tool>
          <Tool title="Exploding Topics">
            <a href="https://explodingtopics.com/" class="text-teal-500">
              Exploding Topics
            </a>{' '}
            — Get 4 new trends that are surging in popularity in search engines
            like Google every Thursday. You'll enjoy just enough bite-size
            commentary to decide whether the trend is worth digging into and
            incorporating into your next blog post or product concept.
          </Tool>
          <Tool title="Trends.vc">
            <a href="https://join.trends.vc/" class="text-teal-500">
              Trends.vc
            </a>{' '}
            — It's like having a seasoned entrepreneur's virtual assistant plop
            a no-fluff report on an emerging area of opportunity every week.
            Previous topics include micro-marketplaces, remote work, and paid
            communities. Expect a format that's biased toward action by clearly
            outlining the problem, solution, competitors, predictions, key
            lessons, and helpful links.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
