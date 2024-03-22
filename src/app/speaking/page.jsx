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
    "Sharing what I'm learning through speaking and guest appearances is one of my greatest joys.",
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="Sharing what I'm learning through speaking and guest appearances is one of my greatest joys."
      intro="See what I've been sharing recently. And don't hesitate to reach out if you'd like to collaborate."
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
        <SpeakingSection title="Podcasting">
          <Appearance
            href="https://katesyuma.substack.com/p/unlocking-activation-at-coda-and"
            title="Unlocking Activation at Coda and Building Trust Between PMs and Designers"
            description="This time we talked to Matt Woods, a Product Manager focused on Product-led Growth, who helped companies like Coda increase key activation metrics by 60%, and introduce personalization experience that combines great UX and business impact."
            event="Growthmates, March 2024"
            cta="Listen to podcast"
          />
        </SpeakingSection>
        <SpeakingSection title="Guest Appearances">
          <Appearance
            href="https://us06web.zoom.us/rec/share/Cw-Cz5YJ6zuzQeGgQrdm5CX0dCu0xxAVIvlgLjnOqMRBL7bepTEROEz42dmIWUnM.Rsj_tcKx-8I8sG-2"
            title="Navigating Key Growth Mistakes through the Lens of User Onboarding"
            description="User onboarding is a key product experience and the base for your product growth. Not being approached well, it can cause problems and risks for the entire Growth system — Acquisition, Retention, and Monetisation.

            ​In this webinar, Kate Syuma, Viktoria Kharlamova, and a special guest Matt Woods (ex-Growth PM at Coda) will share 5 key Growth Mistakes and some examples from their practice."
            event="Webinar, March 2024"
            cta="Watch the webinar"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
