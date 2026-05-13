import HeroSection from '@/app/components/HeroSection';
import ScheduleDay from '@/app/components/ScheduleDay';
import scheduleData from '@/data/schedule.json';

export default function SchedulePage() {
  return (
    <>
      <HeroSection
        title="7-Day Fellowship Schedule"
        subtitle="June 7-14, 2026 | Khoj Resort, Skardu"
        gradient="skardu-horizon"
      />

      <section className="section bg-white">
        <div className="container-max">
          <div className="mb-12 pt-8 border-t-4 border-moss-light">
            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-moss-light text-lake-dark">
              7-Day Intensive Program
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl">
              Click each day to view the detailed schedule of sessions, including times,
              locations, and key topics. The program combines core learning blocks, capacity
              building clinics, and immersive experiences designed to accelerate organizational
              scale readiness.
            </p>
          </div>

          {/* Schedule Days */}
          <div className="space-y-0">
            {scheduleData.days.map((day) => (
              <ScheduleDay
                key={day.dayNumber}
                dayData={{
                  day: day.dayNumber,
                  date: day.date,
                  theme: day.theme,
                  sessions: day.sessions,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
