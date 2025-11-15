
export interface Review {
  id: number;
  author: string;
  rating: number; // 1-10
  comment: string;
  date: string;
}

export type Subject = 'Humanities' | 'Math' | 'Social Science' | 'Natural Science' | 'Electives' | 'Engineering';

export interface Course {
  id: string; // e.g., "CSE 109"
  title: string;
  instructor: string;
  description: string;
  credits: number;
  subject: Subject;
  reviews: Review[];
}

export interface Major {
  name: string;
  requiredCourses: string[]; // Array of course IDs
}

export interface SemesterPlan {
  [semester: string]: Course[];
}