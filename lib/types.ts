// Fellow type definition
export interface Fellow {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  company?: string;
  background: string;
  focus_area: string;
}

// Faculty Member type definition
export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  expertise: string[];
  organization?: string;
  email?: string;
}

// Schedule Session type definition
export interface ScheduleSession {
  id: string;
  title: string;
  description: string;
  speaker?: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'keynote' | 'workshop' | 'panel' | 'social' | 'break';
}

// Schedule Day type definition
export interface ScheduleDay {
  id: string;
  date: string;
  day: string;
  sessions: ScheduleSession[];
}

// Resource type definition
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'link' | 'video' | 'guide' | 'template';
  url: string;
  category: string;
  tags: string[];
}
