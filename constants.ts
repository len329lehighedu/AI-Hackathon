
import { Course, Major, Subject, Review } from './types';

export const MAJORS: Major[] = [
  { name: 'Computer Science (BS)', requiredCourses: ['CSE 007', 'CSE 109', 'MATH 205', 'CSE 202', 'CSE 262'] },
  { name: 'Mechanical Engineering (BS)', requiredCourses: ['PHY 011', 'MATH 205', 'MECH 003', 'MECH 225', 'MECH 240'] },
  { name: 'English (BA)', requiredCourses: ['ENGL 100', 'ENGL 111', 'ENGL 125'] },
  { name: 'Finance (BS)', requiredCourses: ['ECO 001', 'ACCT 151', 'FIN 125', 'MKT 111'] },
];

export const SUBJECTS: Subject[] = ['Engineering', 'Humanities', 'Math', 'Natural Science', 'Social Science'];

export const ALL_COURSES: Course[] = [
    {
      id: 'CSE 007', title: 'Introduction to Programming',
      instructor: 'Dr. Sarah Johnson',
      description: 'An introduction to programming using a high-level language. Topics include variables, control structures, functions, and data structures.',
      credits: 4, subject: 'Engineering',
      reviews: [
        { id: 1, author: 'Student A', rating: 8, comment: 'Great introductory course. Professor was very clear.', date: '2023-12-15' },
        { id: 2, author: 'Student B', rating: 6, comment: 'The homeworks were quite challenging for a beginner.', date: '2023-12-10' },
      ]
    },
    {
      id: 'CSE 017', title: 'Programming and Data Structures',
      instructor: 'Prof. Houria Oudghiri',
      description: 'In-depth study of object-oriented programming and fundamental data structures. Covers lists, stacks, queues, trees, and graphs.',
      credits: 3, subject: 'Engineering',
      reviews: [
        // { id: 3, author: 'Student C', rating: 9, comment: 'Taught me how to think like a programmer. Highly recommended.', date: '2024-05-10' },
      ]
    },
    {
      id: 'CSE 109', title: 'System Software',
      instructor: 'Prof. Corey Montella',
      description: 'Advanced programming and data structures, including dynamic structures, memory allocation, data organization, symbol tables, hash tables, B-trees, data files.',
      credits: 4, subject: 'Engineering',
      reviews: [
        // { id: 3, author: 'Student C', rating: 9, comment: 'Taught me how to think like a programmer. Highly recommended.', date: '2024-05-10' },
      ]
    },
    {
      id: 'CSE 140', title: 'Found Discrete Structure and Algorithm',
      instructor: 'Prof. Yu Yang',
      description: 'Basic representations used in algorithms: propositional and predicate logic, set operations and functions, relations and their representations, matrices and their representations, graphs and their representations, trees and their representations',
      credits: 3, subject: 'Engineering',
      reviews: [
        // { id: 3, author: 'Student C', rating: 9, comment: 'Taught me how to think like a programmer. Highly recommended.', date: '2024-05-10' },
      ]
    },
    {
      id: 'MATH 021', title: 'Calculus I',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Functions and graphs; limits and continuity; derivative, differential, and applications',
      credits: 4, subject: 'Math',
      reviews: [
        // { id: 4, author: 'Student D', rating: 7, comment: 'Very theoretical but essential for many upper-level courses.', date: '2023-12-20' },
      ]
    },
    {
      id: 'MATH 022', title: 'Calculus II',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Functions and graphs; limits and continuity; derivative, differential, and applications',
      credits: 4, subject: 'Math',
      reviews: [
        // { id: 4, author: 'Student D', rating: 7, comment: 'Very theoretical but essential for many upper-level courses.', date: '2023-12-20' },
      ]
    },
    {
      id: 'MATH 205', title: 'Linear Methods',
      instructor: 'Prof. David Lee',
      description: 'Covers linear algebra topics including vectors, matrices, determinants, eigenvalues, and eigenvectors.',
      credits: 3, subject: 'Math',
      reviews: [
        { id: 4, author: 'Student D', rating: 7, comment: 'Very theoretical but essential for many upper-level courses.', date: '2023-12-20' },
      ]
    },
    {
      id: 'WRT 001', title: 'Academic and Analytical Writing',
      instructor: 'Dr. Jessica Williams',
      description: 'A study of literary analysis and argumentative writing. Close reading of various genres.',
      credits: 3, subject: 'Humanities',
      reviews: [
         { id: 5, author: 'Student E', rating: 10, comment: 'Amazing discussions in class. The reading list was fantastic.', date: '2024-05-12' },
         { id: 6, author: 'Student F', rating: 8, comment: 'A lot of writing, but it definitely improves your skills.', date: '2024-05-09' },
      ]
    },
    {
      id: 'ECO 001', title: 'Principles of Economics',
      instructor: 'Prof. Frank Gunther',
      description: 'Introduction to microeconomics and macroeconomics. Covers supply and demand, market structures, GDP, inflation, and unemployment.',
      credits: 4, subject: 'Social Science',
      reviews: []
    },
    {
      id: 'CSE 202', title: 'Computer Organization and Architecture',
      instructor: 'Dr. Brian Miller',
      description: 'Introduction to computer hardware and the interface between hardware and software. Topics include digital logic, processor design, memory hierarchy, and assembly language.',
      credits: 3, subject: 'Engineering',
      reviews: []
    },
     {
      id: 'CSE 262', title: 'Software Engineering',
      instructor: 'Prof. Linda Davis',
      description: 'Principles and practices of software development, including requirements, design, implementation, testing, and project management. Group project required.',
      credits: 3, subject: 'Engineering',
      reviews: []
    },
    {
      id: 'FIN 125', title: 'Introduction to Finance',
      instructor: 'Dr. Patricia Taylor',
      description: 'Overview of financial markets, investments, and corporate finance. Topics include time value of money, risk and return, and valuation.',
      credits: 3, subject: 'Social Science',
      reviews: []
    }
  ];