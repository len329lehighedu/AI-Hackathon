
export interface Review {
  id: number;
  author: string;
  rating: number; // 1-10
  comment: string;
  date: string;
}

export type Subject = 'Humanities' | 'Math' | 'Social Science' | 'Natural Science' | 'Electives' | 'Engineering' | 'Business';

export interface Material {
  name: string;
  url: string;
}

export interface Section {
  id: string; // e.g., "LEC 010"
  type: 'Lecture' | 'Lab' | 'Recitation';
  time: string; // e.g., "MWF 10:10 AM - 11:00 AM"
  location: string;
}

export interface Course {
  id: string; // e.g., "CSE 109"
  crn: string;
  title: string;
  instructor: string;
  instructorEmail: string;
  description: string;
  credits: number;
  subject: Subject;
  reviews: Review[];
  prerequisites: string[]; // Array of course IDs
  materials: Material[];
  sections: Section[];
}

export interface Major {
  name: string;
  requiredCourses: string[]; // Array of course IDs
}

export interface SemesterPlan {
  [semester: string]: Course[];
}
