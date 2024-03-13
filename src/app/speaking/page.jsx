import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata = {
  title: 'Speaking',
  description:
    'I’ve spoken at events all around the world and been interviewed for many podcasts.',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="I’ve spoken at events all around the world and been interviewed for many podcasts."
      intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
    >
      <div className="space-y-20">
        <SpeakingSection title="Writing">
          <Appearance
            href="https://coda.io/blog/product-teams/how-i-discover-hidden-user-problems"
            title="How to discover hidden user problems"
            description="Drawing upon my experience as a former growth marketer, I put my own spin on the “marketing funnel” to create an always-on “research funnel.”"
            event="Coda blog, 2023"
            cta="Read article"
          />
        </SpeakingSection>
        <SpeakingSection title="Podcasts">
          <Appearance
            href="https://katesyuma.substack.com/p/unlocking-activation-at-coda-and"
            title="Unlocking Activation at Coda and Building Trust Between PMs and Designers"
            description="This time we talked to Matt Woods, a Product Manager focused on Product-led Growth, who helped companies like Coda increase key activation metrics by 60%, and introduce personalization experience that combines great UX and business impact."
            event="Growthmates, March 2024"
            cta="Listen to podcast"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
