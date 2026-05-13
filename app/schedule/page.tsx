import HeroSection from '@/app/components/HeroSection';
import ScheduleDay from '@/app/components/ScheduleDay';
import scheduleData from '@/data/schedule.json';

export default function SchedulePage() {
  return (
    <>
      <HeroSection
        title="Fellowship Schedule"
        subtitle="June 7-14, 2026 | Khoj Resort, Skardu"
        description="Detailed itinerary of the intensive 8-day fellowship program designed to transform Pakistani social enterprises into scale-ready impact organizations."
      />

      <section className="section bg-white">
        <div className="container-max">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              8-Day Intensive Program
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl">
              Click each day to view the detailed schedule of sessions, including times,
              locations, and key topics. The program combines core learning blocks, capacity
              building clinics, and immersive experiences designed to accelerate organizational
              scale readiness.
            </p>
          </div>

          {/* Schedule Days */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {scheduleData.days.map((day) => (
              <ScheduleDay
                key={day.dayNumber}
                date={day.date}
                dayNumber={day.dayNumber}
                dayName={day.dayName}
                theme={day.theme}
                sessions={day.sessions}
              />
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About This Schedule</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <p>Khoj Resort, Skardu (2,226m altitude)</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                <p>8 days • June 7-14, 2026</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Format</h4>
                <p>Intensive residential retreat with core learning blocks, clinics, and peer sessions</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Activities</h4>
                <p>Workshops, 1-on-1 mentoring, Demo Day, fireside chats, and cultural experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
