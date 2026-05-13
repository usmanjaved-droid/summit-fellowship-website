import Image from 'next/image';
import Link from 'next/link';
import StatRow from './components/StatRow';
import Reveal from './components/Reveal';
import DuotoneImage from './components/DuotoneImage';
import { IconArrowRight } from './components/icons';

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative h-[88vh] min-h-[640px] max-h-[920px] overflow-hidden">
        <div className="absolute inset-0 ken-burns">
          <Image
            src="/images/skardu/hero-kachura.jpg"
            alt="Lower Kachura Lake, Skardu, at the foot of the Karakoram"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Localized gradient under the headline (lower-left) only */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0) 70%)',
          }}
        />

        <div className="container-max relative z-10 h-full px-4 sm:px-6 lg:px-8
                        flex items-end pb-20 md:pb-28">
          <div className="max-w-2xl">
            <p className="eyebrow text-cloud-white/85 mb-5">
              Summit Fellowship · Skardu · June 2026
            </p>
            <h1 className="font-serif text-cloud-white mb-6"
                style={{ fontVariationSettings: '"opsz" 96' }}>
              A 7-day retreat for Pakistan&apos;s scale-ready impact builders.
            </h1>
            <p className="text-cloud-white/90 text-lg leading-relaxed mb-9 max-w-xl">
              Eleven social enterprises. One week at Khoj Resort. Mulago frameworks,
              Pakistani faculty, and the work of turning a project into something that scales.
            </p>
            <Link href="/about" className="btn-primary">
              Read the program brief
            </Link>
          </div>
        </div>

        {/* Soft fade into the next section */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--color-paper) 100%)',
          }}
        />
      </section>

      {/* ============ INTRO / POSITIONING ============ */}
      <section className="surface-paper section">
        <div className="container-max">
          <p className="eyebrow mb-5">The Fellowship</p>
          <p className="font-serif text-[color:var(--color-ink)] font-semibold
                        text-[clamp(1.75rem,3.2vw,2.5rem)] leading-snug max-w-[28ch]"
             style={{ fontVariationSettings: '"opsz" 72' }}>
            From project-driven survival to scale-ready impact.
          </p>
          <p className="mt-6 max-w-[60ch] text-[color:var(--color-ink)]/90">
            Eleven social enterprises spend seven days at Khoj Resort in Skardu working
            through Mulago&apos;s design discipline alongside Pakistani faculty. The week is
            built to leave each fellow with a sharper mission, a clearer scale strategy,
            and a narrative that survives a real funder conversation.
          </p>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative section">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url("/images/skardu/katpana-desert.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.06,
          }}
        />
        <div className="container-max relative">
          <StatRow />
        </div>
      </section>

      {/* ============ CURRICULUM PILLARS ============ */}
      <section className="surface-paper section">
        <div className="container-max">
          <p className="eyebrow mb-5">The Curriculum</p>
          <h2 className="font-serif font-semibold max-w-[20ch] mb-16">
            Four pillars across seven days.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
            {[
              {
                num: '01',
                title: 'Design for Impact at Scale',
                day: 'Day 1',
                body: `The week opens by redrawing the foundations. Fellows work through Mulago's design discipline: an eight-word mission, a Big Idea in six words or fewer, the theory linking idea to behavior to outcome, and the Doer and Payer who carry the model at scale. By the end of the day, every fellow has a one-pager that says what their organization is for, and who it is for, without hedging.`,
              },
              {
                num: '02',
                title: 'Scale Strategy and Evidence',
                day: 'Day 2',
                body: `With foundations in place, the work turns to scale itself. Fellows apply the Scale Screen framework to their own organization, stress test the assumptions that survive only in pilot conditions, and design an evidence plan that matches their level of certainty. The deliverable is not a polished deck. It is an honest map of what is known, what is assumed, and what to prove next.`,
              },
              {
                num: '03',
                title: 'The Iterative Organization',
                day: 'Day 4',
                body: `Most social enterprises ship answers. Scale-ready organizations ship better questions. This block covers the theory of iteration, the methods and data flows that make learning routine rather than heroic, and the people and culture decisions that decide whether iteration actually sticks. Fellows leave with a concrete next iteration for their own work, not a generic improvement plan.`,
              },
              {
                num: '04',
                title: 'Communications and Demo Day',
                day: 'Days 5 to 6',
                body: `The week closes with the conversation, not the pitch. Fellows learn to strip the jargon that funders quietly mistrust, build a narrative that survives a ten-minute conversation rather than a forty-slide deck, and rehearse with peers and faculty until the language feels true. Demo Day is the showcase, but the real outcome is fluency for every funder conversation that follows.`,
              },
            ].map((p) => (
              <Reveal key={p.num} as="article">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-serif font-semibold text-terra-red text-2xl leading-none">
                    {p.num}
                  </span>
                  <span className="eyebrow">{p.day}</span>
                </div>
                <h3 className="font-serif font-semibold mb-3">{p.title}</h3>
                <p className="text-[color:var(--color-ink)]/85">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPLORE THE PROGRAM ============ */}
      <section className="section">
        <div className="container-max">
          <p className="eyebrow mb-5">Explore</p>
          <h2 className="font-serif font-semibold max-w-[18ch] mb-14">
            The week, the people, the place.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 — Fellows (typographic, no image) */}
            <Link
              href="/fellows"
              className="group block border border-[color:var(--color-border)]
                         surface-paper p-8 md:p-10 transition-all duration-300
                         hover:border-terra-red focus-visible:border-terra-red
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-red
                         focus-visible:ring-offset-2"
            >
              <div className="aspect-[3/2] flex items-center justify-center
                              bg-white/40 mb-6 px-6 text-center">
                <p className="font-serif text-2xl text-[color:var(--color-ink)]/30 leading-snug">
                  Eleven fellows.<br/>Eleven organizations.<br/>One cohort.
                </p>
              </div>
              <p className="eyebrow mb-2">The Fellows</p>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif font-semibold group-hover:text-terra-red transition-colors">
                  Meet the Fellows
                </h3>
                <IconArrowRight className="mt-2 text-[color:var(--color-ink)] transition-transform
                                           duration-200 group-hover:translate-x-1" />
              </div>
              <p className="mt-3 text-slate-warm">
                Eleven social entrepreneurs working on scale across Pakistan.
              </p>
            </Link>

            {/* Card 2 — Schedule */}
            <NavCard
              href="/schedule"
              eyebrow="The Week"
              title="The 7-Day Schedule"
              desc="Design, scale strategy, evidence, iteration, communications, and demo day."
              image="/images/skardu/deosai.jpg"
              imageAlt="Deosai National Park, the high plateau above Skardu"
            />

            {/* Card 3 — Logistics */}
            <NavCard
              href="/logistics"
              eyebrow="Getting There"
              title="Logistics and Travel"
              desc="Getting to Skardu, the venue at Khoj Resort, and what to bring."
              image="/images/skardu/shangrila-resort.jpg"
              imageAlt="Wooden lodge at Shangrila Resort, near the program venue"
            />

            {/* Card 4 — Resources */}
            <NavCard
              href="/resources"
              eyebrow="The Toolkit"
              title="Frameworks and Resources"
              desc="The Mulago frameworks, reading lists, and post-fellowship resources."
              image="/images/skardu/peaks-panorama.jpg"
              imageAlt="Karakoram peaks above Skardu"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function NavCard({
  href, eyebrow, title, desc, image, imageAlt,
}: {
  href: string; eyebrow: string; title: string; desc: string;
  image: string; imageAlt: string;
}) {
  return (
    <Link
      href={href}
      className="group block border border-[color:var(--color-border)]
                 surface-paper transition-all duration-300
                 hover:border-terra-red focus-visible:border-terra-red
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-red
                 focus-visible:ring-offset-2"
    >
      <DuotoneImage src={image} alt={imageAlt} />
      <div className="p-8 md:p-10">
        <p className="eyebrow mb-2">{eyebrow}</p>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif font-semibold group-hover:text-terra-red transition-colors">
            {title}
          </h3>
          <IconArrowRight className="mt-2 text-[color:var(--color-ink)] transition-transform
                                     duration-200 group-hover:translate-x-1" />
        </div>
        <p className="mt-3 text-slate-warm">{desc}</p>
      </div>
    </Link>
  );
}
