'use client';

import HeroSection from '../components/HeroSection';

export default function About() {
  return (
    <>
      <HeroSection
        title="About the Fellowship"
        subtitle="Transform social enterprises from project-driven survival to scale-ready impact machines"
      />

      <section className="section bg-white">
        <div className="container-max">
          {/* Mission & Philosophy */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">Mission & Philosophy</h2>

            <h3 className="text-xl font-bold mb-3">Why This Fellowship Exists</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Pakistan is home to dozens of promising social enterprises, but few achieve true national scale. Most remain trapped in "project-driven survival mode"—securing incremental grants and reaching thousands when their models possess the potential to reach millions.
            </p>

            <h3 className="text-xl font-bold mb-3">The Core Challenge</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Success at scale requires moving beyond founder-led models to systems-based impact. This means building organizational capabilities, establishing evidence of impact, and creating sustainable financing structures that can outlast any single individual.
            </p>
          </div>

          {/* The Challenge */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">The Challenge</h2>

            <h3 className="text-xl font-bold mb-3">Why Social Enterprises Struggle with Scale</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Many Pakistani social enterprises lack the organizational systems to operate beyond their founder's direct oversight. They struggle to document evidence of impact, leaving potential partners and funders uncertain about the real effectiveness of their work.
            </p>

            <h3 className="text-xl font-bold mb-3">The Two Critical Questions</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Who is your ultimate doer—the entity that implements your model at national scale? And who is your ultimate payer—the entity with resources to fund it? Many entrepreneurs lack clarity on these questions, leading to misaligned strategies and unsustainable growth.
            </p>
          </div>

          {/* The Solution */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">The Solution</h2>

            <h3 className="text-xl font-bold mb-3">A 7-Day Intensive Approach</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              The Skardu Scale-Up Fellowship brings together a curated cohort of founders for a 7-day intensive retreat. Stepping away from daily operations, they engage with rigorous frameworks, world-class faculty, and peer learning from fellow entrepreneurs facing similar challenges.
            </p>

            <h3 className="text-xl font-bold mb-3">How It Works</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Over the week, fellows work through the Arc of the Week—a carefully sequenced journey from clarifying impact and strategy to iterating on organizational models and crafting compelling pitches. Small group clinics, facilitated peer sessions, and 1-on-1 mentoring ensure personalized support for each entrepreneur.
            </p>
          </div>

          {/* The Scale Screen Framework */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">The Scale Screen Framework</h2>

            <h3 className="text-xl font-bold mb-3">Mulago Foundation's Proven Approach</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              The fellowship uses Mulago Foundation's Scale Screen framework, a rigorous methodology for identifying organizations truly ready to scale. Rather than measuring success by grant dollars distributed, it focuses on organizational readiness and impact potential.
            </p>

            <h3 className="text-xl font-bold mb-3">The Four Enoughs</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              The Scale Screen evaluates four critical dimensions:
            </p>

            <div className="space-y-4 mb-6 pl-6 border-l-4 border-blue-200">
              <div>
                <h4 className="font-bold text-gray-900">Good Enough</h4>
                <p className="text-gray-700 leading-relaxed max-w-[75ch]">Your impact is sufficient—you've demonstrated meaningful results and have evidence to support your claims.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900">Big Enough</h4>
                <p className="text-gray-700 leading-relaxed max-w-[75ch]">Your scale is sufficient—the issue you're addressing is large enough to justify significant resources and organizational growth.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900">Simple Enough</h4>
                <p className="text-gray-700 leading-relaxed max-w-[75ch]">Your model is operationalizable—it can be documented, taught, and replicated by others without requiring heroic individual effort.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900">Cheap Enough</h4>
                <p className="text-gray-700 leading-relaxed max-w-[75ch]">Your unit economics work—your cost-per-beneficiary is sustainable and doesn't require subsidy beyond what realistic funding sources can provide.</p>
              </div>
            </div>
          </div>

          {/* The Arc of the Week */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">The Arc of the Week</h2>

            <h3 className="text-xl font-bold mb-3">Day 1: Design for Impact</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Fellows begin by clarifying their mission, big idea, theory of change, and business model. This foundational work ensures everyone has absolute clarity on what they're building and why it matters.
            </p>

            <h3 className="text-xl font-bold mb-3">Day 2: Scale Strategy & Evidence</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              The focus shifts to strategy and proof points. Fellows examine their evidence of impact, identify critical data gaps, and develop strategies for measuring and communicating their results to potential funders and partners.
            </p>

            <h3 className="text-xl font-bold mb-3">Day 3: 1-on-1 Clinics</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              In a shift to experiential learning, fellows engage in outdoor capacity-building sessions and intensive 1-on-1 clinics with faculty. These personalized sessions address the unique challenges each entrepreneur is facing.
            </p>

            <h3 className="text-xl font-bold mb-3">Days 4-6: Iteration, Organization & Communication</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Fellows work on iterating their organizational models, strengthening governance structures, and crafting compelling communications. The week culminates in a Demo Day where each entrepreneur presents their refined vision and next steps.
            </p>
          </div>

          {/* Co-Hosts */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">Co-Hosts</h2>

            <h3 className="text-xl font-bold mb-3">Taleemabad: Pakistan's Civic Innovation Leader</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Taleemabad is Pakistan's premier organization for civic innovation and social entrepreneurship. With deep roots in the local ecosystem and a track record of building transformative organizations, Taleemabad brings institutional knowledge and community connections essential to the fellowship's success.
            </p>

            <h3 className="text-xl font-bold mb-3">Mulago Foundation: Scale Expertise</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              The Mulago Foundation, based in Washington DC, has spent two decades identifying and supporting organizations with the potential to scale impact. Their Scale Screen framework and decades of experience with social enterprises globally ensures the fellowship is anchored in proven methodology.
            </p>
          </div>

          {/* Why Skardu */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Why Skardu?</h2>

            <h3 className="text-xl font-bold mb-3">High-Altitude Focus and Clarity</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Skardu sits at 2,226 meters above sea level, far from the distractions of Islamabad or Karachi. This altitude—both physical and metaphorical—creates space for deep thinking and strategic clarity that's nearly impossible to achieve while managing daily organizational operations.
            </p>

            <h3 className="text-xl font-bold mb-3">Retreat Format for Community Building</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              The intensive retreat format—where fellows stay together for the full week—builds a powerful cohort of peers facing similar challenges. Meals, evening sessions, and downtime conversations become valuable learning moments, while the stunning Skardu setting creates space for reflection and renewal.
            </p>

            <h3 className="text-xl font-bold mb-3">A Catalyst for Change</h3>
            <p className="text-gray-700 leading-relaxed max-w-[75ch]">
              By removing founders from their day-to-day environments and bringing them together in an environment of focus and support, Skardu becomes more than a location—it becomes a catalyst for organizational and personal transformation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
