import HeroSection from '@/app/components/HeroSection';
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Main Hero */}
      <HeroSection
        title="Skardu Scale-Up Fellowship"
        subtitle="Transforming Pakistani social enterprises from project-driven survival to scale-ready impact machines."
        gradient="alpine-lake"
      />

      {/* Before-After Transformation */}
      <section className="bg-cloud-white py-12 md:py-20">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-lake-dark mb-4">
            The Fellowship Transformation
          </h2>
          <p className="text-lg text-slate-warm mb-12 max-w-2xl">
            See how the Summit Fellowship helps social entrepreneurs scale from struggling to thriving.
          </p>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Stats with Before-After */}
      <section className="bg-cloud-white py-16 md:py-24">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-lake-dark mb-12">
            Fellowship by the Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-slate-warm/20 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <p className="text-sm font-semibold text-terra-red mb-2">DURATION</p>
                <p className="text-5xl font-bold text-lake-dark">7</p>
                <p className="text-lg text-slate-warm mt-2">Days of intensive learning</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-warm/20 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <p className="text-sm font-semibold text-terra-red mb-2">PARTICIPANTS</p>
                <p className="text-5xl font-bold text-lake-dark">11</p>
                <p className="text-lg text-slate-warm mt-2">Social entrepreneurs selected</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-warm/20 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <p className="text-sm font-semibold text-terra-red mb-2">FACULTY</p>
                <p className="text-5xl font-bold text-lake-dark">5+</p>
                <p className="text-lg text-slate-warm mt-2">Mentors and expert guides</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation - Varied Patterns */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-lake-dark mb-12">
            Explore the Program
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Icon + Heading + Description */}
            <Link
              href="/fellows"
              className="bg-cloud-white border border-slate-warm/20 rounded-lg p-8
                        hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-out
                        focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2
                        group"
            >
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-lake-dark mb-2 group-hover:text-terra-red transition-colors">
                Meet the Fellows
              </h3>
              <p className="text-slate-warm">
                Meet 11 social entrepreneurs from across Pakistan working on scale and impact.
              </p>
            </Link>

            {/* Card 2: Quote block */}
            <div className="bg-alpine-lake rounded-lg p-8 text-white border-l-4 border-terra-red flex flex-col justify-center">
              <p className="text-lg mb-4 italic">
                "The fellowship transformed how we think about scaling. It gave us frameworks,
                mentorship, and community."
              </p>
              <p className="font-semibold">— A Previous Fellow</p>
            </div>

            {/* Card 3: Feature highlight with gradient */}
            <Link
              href="/schedule"
              className="bg-skardu-horizon rounded-lg p-8 text-white
                        hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-out
                        focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2
                        group"
            >
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-cloud-white transition-colors">
                The 7-Day Schedule
              </h3>
              <p className="text-cloud-white/90">
                Design, scale strategy, evidence, iteration, communications, and demo day.
              </p>
            </Link>

            {/* Card 4: Simple with colored border */}
            <Link
              href="/logistics"
              className="bg-cloud-white border-2 border-forest-dark rounded-lg p-8
                        hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-out
                        focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2
                        group"
            >
              <div className="text-5xl mb-4">✈️</div>
              <h3 className="text-2xl font-bold text-forest-dark mb-2 group-hover:text-terra-red transition-colors">
                Logistics & Travel
              </h3>
              <p className="text-slate-warm">
                Everything you need to know about getting to Skardu and the venue.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
