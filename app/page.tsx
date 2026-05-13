import Image from 'next/image';
import Link from 'next/link';

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

      {/* Subsequent sections are added in tasks 9-12 */}
    </>
  );
}
