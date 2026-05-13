import Image from 'next/image';
import Link from 'next/link';
import StatRow from './components/StatRow';

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
    </>
  );
}
