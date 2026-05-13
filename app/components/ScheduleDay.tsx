'use client';

import { useState, useEffect } from 'react';

interface Session {
  time: string;
  title: string;
  description: string;
  topics?: string[];
  location?: string;
}

interface ScheduleDay {
  day: number;
  date: string;
  theme: string;
  sessions: Session[];
}

const DAY_GRADIENTS = [
  'bg-alpine-lake',        // Day 0
  'bg-skardu-horizon',     // Day 1
  'bg-forest-shadow',      // Day 2
  'bg-alpine-lake',        // Day 3
  'bg-skardu-horizon',     // Day 4
  'bg-forest-shadow',      // Day 5
  'bg-alpine-lake',        // Day 6
  'bg-skardu-horizon',     // Day 7
];

export default function ScheduleDay({ dayData }: { dayData: ScheduleDay }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const gradient = DAY_GRADIENTS[dayData.day % DAY_GRADIENTS.length];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const transitionClass = prefersReducedMotion ? '' : 'transition-transform duration-300 ease-out';
  const chevronRotation = prefersReducedMotion ? '' : (isExpanded ? 'rotate-180' : '');

  return (
    <div className="mb-6">
      {/* Day Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${gradient} w-full text-left px-6 py-6 rounded-lg text-white
                   hover:shadow-lg transition-shadow duration-200 ease-out
                   focus:outline-none focus:ring-2 focus:ring-terra-red focus:ring-offset-2`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-5xl font-bold text-white/30 mb-2">
              {String(dayData.day).padStart(2, '0')}
            </div>
            <h3 className="text-2xl font-bold">{dayData.date}</h3>
            <p className="text-white/90 mt-1 text-lg">{dayData.theme}</p>
          </div>
          <div className={`text-2xl ${transitionClass} ${chevronRotation}`}>
            ▼
          </div>
        </div>
      </button>

      {/* Sessions List */}
      {isExpanded && (
        <div className="bg-cloud-white border border-t-0 border-slate-warm/20 rounded-b-lg p-6">
          <div className="space-y-6">
            {dayData.sessions.map((session, idx) => (
              <div key={idx} className="border-l-4 border-terra-red pl-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-terra-red font-semibold">{session.time}</p>
                    <h4 className="text-xl font-bold text-lake-dark mt-1">{session.title}</h4>
                  </div>
                  {session.location && (
                    <span className="bg-moss-light text-white text-xs px-2 py-1 rounded-full">
                      📍 {session.location}
                    </span>
                  )}
                </div>
                <p className="text-slate-warm mb-3">{session.description}</p>
                {session.topics && session.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {session.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="bg-lake-dark/10 text-lake-dark text-xs px-2 py-1 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
