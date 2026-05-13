'use client';

import { useState } from 'react';
import { formatDate, formatTime } from '@/lib/utils';

interface Session {
  time: string;
  title: string;
  description: string;
  topics: string[];
  location?: string;
}

interface ScheduleDayProps {
  date: string;
  dayNumber: number;
  dayName: string;
  theme: string;
  sessions: Session[];
}

export default function ScheduleDay({
  date,
  dayNumber,
  dayName,
  theme,
  sessions,
}: ScheduleDayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-200">
      {/* Header - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-blue-50 hover:bg-blue-100 transition-colors p-4 sm:p-6 text-left cursor-pointer group min-h-[56px] sm:min-h-[64px] flex items-center"
      >
        <div className="flex items-start justify-between gap-4 w-full">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {formatDate(date)}
              </h3>
              <span className="text-sm sm:text-base font-medium text-gray-600">
                Day {dayNumber}
              </span>
            </div>
            <p className="text-base sm:text-lg text-gray-700">
              ({theme})
            </p>
          </div>
          <div
            className={`flex-shrink-0 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Sessions - Expanded Content */}
      {isExpanded && (
        <div className="bg-white p-4 sm:p-6 space-y-4 sm:space-y-6">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200"
            >
              {/* Time and Title */}
              <div className="mb-3">
                <p className="text-sm font-semibold text-blue-700 mb-1">
                  {formatTime(session.time)}
                </p>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                  {session.title}
                </h4>
              </div>

              {/* Description */}
              {session.description && (
                <p className="text-gray-700 mb-3 leading-relaxed text-sm sm:text-base">
                  {session.description}
                </p>
              )}

              {/* Location */}
              {session.location && (
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-semibold">Location:</span> {session.location}
                </p>
              )}

              {/* Topics */}
              {session.topics && session.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {session.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
