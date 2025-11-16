export interface ReviewRatings {
  difficulty: number; // 1-5 (1=easy, 5=hard)
  workload: number; // hours/week
  clarity: number; // 1-5 (professor clarity)
  fairness: number; // 1-5 (grading fairness)
  usefulness: number; // 1-5 (materials)
  engagement: number; // 1-5
  workloadExpectation: number; // 1-5 (1=less, 3=expected, 5=more)
}

export interface Review {
  id: number;
  author: string;
  ratings: ReviewRatings;
  comment: string;
  date: string;
}

export type Subject = 'Humanities' | 'Math' | 'Social Science' | 'Natural Science' | 'Electives' | 'Engineering' | 'Business';

export interface Section {
  id: string; // e.g., "10", "11L"
  type: 'Lecture' | 'Lab' | 'Recitation';
  time: string; // e.g., "MWF 10:10 AM - 11:00 AM"
  location: string;
  instructor: string;
  enrolled: number;
  capacity: number;
}

export interface Material {
    name: string;
    link?: string;
}

export interface Course {
  id: string; // e.g., "CSE 109"
  crn: string;
  title: string;
  instructor: string;
  instructorContact?: string;
  description: string;
  credits: number;
  subject: Subject;
  reviews: Review[];
  sections: Section[];
  prerequisites: string[]; // Array of course IDs
  materials: Material[];
}

export interface Major {
  name: string;
  requiredCourses: string[]; // Array of course IDs
}

export interface SemesterPlan {
  [semester: string]: Course[];
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}