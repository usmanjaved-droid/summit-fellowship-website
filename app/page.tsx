import BeforeAfterSlider from '@/app/components/BeforeAfterSlider';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Fitzroy-style Hero Section with Skardu Landscape */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 bg-cover bg-center bg-no-repeat"
               style={{
                 backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80")',
                 backgroundAttachment: 'fixed'
               }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

        <div className="container-max relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-white/75 mb-4 tracking-wide uppercase">
              Welcome to Summit Fellowship
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transforming
              <span className="text-orange-400 block">Scale Readiness</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
              Turning Pakistani social enterprises from project-driven survival to scale-ready impact machines through intensive 7-day mentorship at Khoj Resort, Skardu.
            </p>
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-orange-500 text-white font-medium rounded-lg
                         hover:bg-orange-600 transition-all duration-300 hover:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Learn More
            </Link>
          </div>

          {/* Right Accent Element */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-md">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/25">
                <h3 className="text-white font-semibold mb-6 text-lg">Program Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-300 font-bold">7</span>
                    </div>
                    <div>
                      <p className="text-white/95 font-medium">Days of intensive learning</p>
                      <p className="text-white/65 text-sm">June 7-14, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-300 font-bold">11</span>
                    </div>
                    <div>
                      <p className="text-white/95 font-medium">Social entrepreneurs</p>
                      <p className="text-white/65 text-sm">Curated from across Pakistan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-300 font-bold">5+</span>
                    </div>
                    <div>
                      <p className="text-white/95 font-medium">Expert mentors</p>
                      <p className="text-white/65 text-sm">Scale and impact specialists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
