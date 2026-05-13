'use client';

import HeroSection from '../components/HeroSection';
import logisticsData from '@/data/logistics.json';
import { useState } from 'react';

export default function Logistics() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <>
      <HeroSection
        title="Logistics & Travel"
        subtitle="Everything you need to know for your journey to Skardu"
        description="From flights to accommodation—we've got you covered"
      />

      <section className="section bg-white">
        <div className="container-max">
          {/* Venue Information */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">Venue Information</h2>

            <h3 className="text-xl font-bold mb-3">Khoj Resort, Skardu</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              The fellowship takes place at Khoj Resort, located in the heart of Skardu. The resort features comfortable rooms, restaurant and dining facilities, meeting halls, outdoor spaces for activities, and reliable WiFi connectivity.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              <strong>Address:</strong> {logisticsData.venue.address}, {logisticsData.venue.city}, {logisticsData.venue.region}, {logisticsData.venue.country}
            </p>

            <h3 className="text-xl font-bold mb-3">Check-In & Check-Out</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              <strong>Check-in:</strong> {logisticsData.venue.checkinTime}
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              <strong>Check-out:</strong> {logisticsData.venue.checkoutTime}
            </p>

            <h3 className="text-xl font-bold mb-3">About the Location</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Skardu is a beautiful mountain city situated at {logisticsData.climate.altitude} ({(parseInt(logisticsData.climate.altitude) * 3.28084).toFixed(0)} feet) above sea level in the Gilgit-Baltistan region of Pakistan. Known for its stunning natural landscapes, the location provides an ideal setting for an intensive retreat focused on clarity and strategic thinking.
            </p>
          </div>

          {/* Getting to Skardu */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">Getting to Skardu</h2>

            <h3 className="text-xl font-bold mb-3">Flight Options</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              {logisticsData.travel.flights.description}
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              <strong>Airlines:</strong> {logisticsData.travel.flights.airlines.join(', ')}. {logisticsData.travel.flights.notes}
            </p>

            <h3 className="text-xl font-bold mb-3">Ground Transportation</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              <strong>Airport Pickup:</strong> {logisticsData.travel.groundTransport.airportPickup}
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              The journey from Skardu airport to Khoj Resort takes approximately {logisticsData.travel.groundTransport.journeyTime}. {logisticsData.travel.groundTransport.notes}
            </p>

            <h3 className="text-xl font-bold mb-3">Travel Tips</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              It's advisable to book your flights well in advance, as Skardu airport has limited daily flights. Ensure your passport is valid for at least 6 months beyond your travel dates. If you require a visa, contact the Pakistani embassy in your country for current requirements and processing times.
            </p>
          </div>

          {/* Accommodation & Meals */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">Accommodation & Meals</h2>

            <h3 className="text-xl font-bold mb-3">What's Included</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              The fellowship covers all major logistical needs:
            </p>
            <ul className="space-y-2 mb-6 pl-6">
              {logisticsData.accommodation.included.map((item, index) => (
                <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mb-3">Room Types</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              {logisticsData.accommodation.roomSetup} You can indicate your preference (single or double occupancy) when you confirm your attendance.
            </p>

            <h3 className="text-xl font-bold mb-3">Meals & Dietary Considerations</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              All meals—breakfast, lunch, and dinner—are provided at the resort. The meals feature {logisticsData.accommodation.meals}.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              <strong>Dietary Accommodations:</strong> {logisticsData.accommodation.dietary}
            </p>
          </div>

          {/* What to Pack & Prepare */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">What to Pack & Prepare</h2>

            <h3 className="text-xl font-bold mb-3">Climate & Weather</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              Skardu experiences pleasant summer weather during the fellowship. Temperatures typically range from {logisticsData.climate.temperature}, with {logisticsData.climate.conditions.toLowerCase()}.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Given the high altitude ({logisticsData.climate.altitude}), {logisticsData.climate.notes}
            </p>

            <h3 className="text-xl font-bold mb-3">Packing Essentials</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              Here's what we recommend bringing:
            </p>
            <ul className="space-y-2 mb-6 pl-6">
              {logisticsData.packingList.map((item, index) => (
                <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mb-3">Activities & Recreation</h3>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              Beyond the core curriculum, Skardu offers wonderful opportunities for outdoor activities. You'll have time for hiking, sightseeing, and exploring the beautiful mountain landscapes surrounding the resort. The combination of structured learning and outdoor recreation helps refresh your mind and build stronger connections with fellow fellows.
            </p>

            <h3 className="text-xl font-bold mb-3">Connectivity & Timezone</h3>
            <p className="text-gray-700 mb-4 leading-relaxed max-w-[75ch]">
              <strong>Timezone:</strong> {logisticsData.connectivity.timezone}
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed max-w-[75ch]">
              <strong>Internet & Mobile:</strong> {logisticsData.connectivity.internet} {logisticsData.connectivity.notes}
            </p>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {logisticsData.faq.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-bold text-gray-900 text-left">
                      {item.question}
                    </h3>
                    <span
                      className={`ml-4 text-blue-600 font-bold flex-shrink-0 transition-transform ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
