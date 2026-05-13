'use client';

import HeroSection from '../components/HeroSection';
import FacultyCard from '../components/FacultyCard';
import facultyData from '@/data/faculty.json';

export default function Faculty() {
  // Separate faculty and organizing team
  const faculty = facultyData.faculty;
  const organizingTeam = facultyData.organizingTeam;

  return (
    <>
      <HeroSection
        title="Faculty & Organizing Team"
        subtitle="World-class mentors and dedicated organizers"
      />

      {/* Core Faculty & Mentors Section */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Faculty & Mentors</h2>
            <p className="text-gray-700 max-w-2xl mb-8">
              Experts in scale strategy, impact measurement, and organizational development guiding the Fellows
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {faculty.map((member) => (
                <FacultyCard
                  key={member.id}
                  name={member.name}
                  title={member.title}
                  institution={member.organization}
                  bio={member.bio}
                  linkedIn={member.linkedin}
                  website={member.website}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organizing Team Section */}
      <section className="section bg-gray-50">
        <div className="container-max">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Organizing Team</h2>
            <p className="text-gray-700 max-w-2xl mb-8">
              Taleemabad and ChildLife Foundation leaders facilitating the intensive week
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {organizingTeam.map((member) => (
                <FacultyCard
                  key={member.id}
                  name={member.name}
                  title={member.title}
                  institution={member.organization}
                  bio={member.bio}
                  linkedIn={member.linkedin}
                  website={member.website}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
