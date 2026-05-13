'use client';

import Link from 'next/link';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <>
      <HeroSection
        title="Skardu Scale-Up Fellowship"
        subtitle="Transform from project-driven to scale-ready"
        description="A 7-day intensive retreat for Pakistani social entrepreneurs. June 7-14, 2026 | Khoj Resort, Skardu"
      />

      {/* Overview Section */}
      <section className="section bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">7</div>
              <p className="text-gray-700 font-medium">Days of Intensive Learning</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">11</div>
              <p className="text-gray-700 font-medium">Social Entrepreneurs</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">5</div>
              <p className="text-gray-700 font-medium">World-Class Faculty</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">What is the Skardu Scale-Up Fellowship?</h2>
            <p className="text-lg text-gray-700 mb-4">
              Pakistan is home to dozens of promising social enterprises, but few achieve true national scale. Most remain trapped in "project-driven survival mode"—securing incremental grants and reaching thousands when their models possess the potential to reach millions.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Over this 7-day intensive retreat, our curated cohort of founders steps away from daily operations to answer the defining strategic questions of scale: <strong>Who is your ultimate doer (the entity that implements at scale)?</strong> And <strong>who is your ultimate payer (who funds it)?</strong>
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/about" className="btn-primary">
                Learn More
              </Link>
              <Link href="/schedule" className="btn-secondary">
                View Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="section">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12">Explore the Fellowship</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/fellows" className="card hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">11</h3>
              <p className="font-bold text-lg mb-2">Meet the Fellows</p>
              <p className="text-gray-600 text-sm">Discover the entrepreneurs transforming Pakistan</p>
            </Link>

            <Link href="/faculty" className="card hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">5</h3>
              <p className="font-bold text-lg mb-2">Faculty & Team</p>
              <p className="text-gray-600 text-sm">Learn from world-class mentors and organizers</p>
            </Link>

            <Link href="/schedule" className="card hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-green-600 mb-2">7</h3>
              <p className="font-bold text-lg mb-2">The Schedule</p>
              <p className="text-gray-600 text-sm">Explore the arc of the week and key themes</p>
            </Link>

            <Link href="/logistics" className="card hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-orange-600 mb-2">📍</h3>
              <p className="font-bold text-lg mb-2">Logistics</p>
              <p className="text-gray-600 text-sm">Practical info: travel, accommodation, and more</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Arc of the Week */}
      <section className="section bg-blue-50">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-4">The Arc of the Week</h2>
          <p className="text-gray-700 mb-8 max-w-2xl">
            Each day builds on the previous, taking fellows through rigorous frameworks and peer learning to transform their organizations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm font-bold text-blue-600">Day 1</span>
              <p className="font-bold">Design for Impact</p>
              <p className="text-sm text-gray-600">Mission, Big Idea, Theory, Model</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm font-bold text-blue-600">Day 2</span>
              <p className="font-bold">Scale Strategy</p>
              <p className="text-sm text-gray-600">Evidence, Impact Measurement</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm font-bold text-blue-600">Day 3</span>
              <p className="font-bold">1-on-1 Clinics</p>
              <p className="text-sm text-gray-600">Outdoor capacity sessions</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm font-bold text-blue-600">Day 4-6</span>
              <p className="font-bold">Iteration & Demo</p>
              <p className="text-sm text-gray-600">Communications, Pitching, Celebration</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/schedule" className="btn-primary">
              View Full Schedule
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
