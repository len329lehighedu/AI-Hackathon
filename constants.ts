
import { Course, Major, Subject, Review } from './types';

export const MAJORS: Major[] = [
  { name: 'Computer Science (BS)', requiredCourses: ['CSE 007', 'CSE 017', 'CSE 109', 'CSE 140', 'MATH 205', 'CSE 202', 'CSE 216', 'CSE 262'] },
  { name: 'Mechanical Engineering (BS)', requiredCourses: ['PHY 011', 'MATH 205', 'MECH 003', 'MECH 225', 'MECH 240'] },
  { name: 'English (BA)', requiredCourses: ['ENGL 100', 'ENGL 111', 'ENGL 125'] },
  { name: 'Finance (BS)', requiredCourses: ['ECO 001', 'ACCT 151', 'FIN 125', 'MKT 111'] },
];

export const SUBJECTS: Subject[] = ['Engineering', 'Humanities', 'Math', 'Natural Science', 'Social Science',"Business"];

export const ALL_COURSES: Course[] = [
    {
      id: 'CSE 007', crn: '78912', title: 'Introduction to Programming',
      instructor: 'Dr. Sarah Johnson', instructorEmail: 's.johnson@lehigh.edu',
      description: 'An introduction to programming using a high-level language. Topics include variables, control structures, functions, and data structures.',
      credits: 4, subject: 'Engineering',
      prerequisites: [],
      materials: [{ name: 'ZyBooks: Intro to Python', url: '#' }],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'MWF 10:10 AM - 11:00 AM', location: 'Packard Lab 101' },
        { id: 'REC 011', type: 'Recitation', time: 'T 11:10 AM - 12:00 PM', location: 'Packard Lab 202' },
      ],
      reviews: [
        { id: 1, author: 'anonymous', rating: 8, comment: 'Great introductory course. Professor was very clear.', date: '2023-12-15' },
        { id: 2, author: 'anonymous', rating: 6, comment: 'The homeworks were quite challenging for a beginner.', date: '2023-12-10' },
      ]
    },
    {
      id: 'CSE 017', crn: '78913', title: 'Programming and Data Structures',
      instructor: 'Prof. Houria Oudghiri', instructorEmail: 'h.oudghiri@lehigh.edu',
      description: 'In-depth study of object-oriented programming and fundamental data structures. Covers lists, stacks, queues, trees, and graphs.',
      credits: 3, subject: 'Engineering',
      prerequisites: ['CSE 007'],
      materials: [{ name: 'Textbook: Data Structures & Algorithms in Java', url: '#' }],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'TR 1:35 PM - 2:50 PM', location: 'Mohler Lab 203' },
      ],
      reviews: [
        { id: 3, author: 'anonymous', rating: 9, comment: 'Taught me how to think like a programmer. Highly recommended.', date: '2024-05-10' },
      ]
    },
    {
      id: 'CSE 109', crn: '78914', title: 'System Software',
      instructor: 'Prof. Corey Montella', instructorEmail: 'c.montella@lehigh.edu',
      description: 'Advanced programming and data structures, including dynamic structures, memory allocation, data organization, symbol tables, hash tables, B-trees, data files.',
      credits: 4, subject: 'Engineering',
      prerequisites: ['CSE 017'],
      materials: [],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'MWF 2:35 PM - 3:50 PM', location: 'Packard Lab 101' },
        { id: 'LAB 011', type: 'Lab', time: 'R 2:35 PM - 3:50 PM', location: 'Packard Lab 420' },
      ],
      reviews: [
        { id: 3, author: 'anonymous', rating: 9, comment: 'Taught me how to think like a programmer. Highly recommended.', date: '2024-05-10' },
      ]
    },
    {
      id: 'CSE 140', crn: '78915', title: 'Found Discrete Structure and Algorithm',
      instructor: 'Prof. Yu Yang', instructorEmail: 'y.yang@lehigh.edu',
      description: 'Basic representations used in algorithms: propositional and predicate logic, set operations and functions, relations and their representations, matrices and their representations, graphs and their representations, trees and their representations',
      credits: 3, subject: 'Engineering',
      prerequisites: ['MATH 021'],
      materials: [],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'TR 10:45 AM - 12:00 PM', location: 'Sinclair Lab 101' },
      ],
      reviews: [ ]
    },
    {
      id: 'MATH 021', crn: '81234', title: 'Calculus I',
      instructor: 'Dr. Emily Rodriguez', instructorEmail: 'e.rodriguez@lehigh.edu',
      description: 'Functions and graphs; limits and continuity; derivative, differential, and applications',
      credits: 4, subject: 'Math',
      prerequisites: [],
      materials: [{ name: 'Calculus: Early Transcendentals', url: '#' }],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'MWF 9:10 AM - 10:00 AM', location: 'Christmas-Saucon Hall 101' },
      ],
      reviews: [ ]
    },
    {
      id: 'MATH 022', crn: '81235', title: 'Calculus II',
      instructor: 'Dr. Emily Rodriguez', instructorEmail: 'e.rodriguez@lehigh.edu',
      description: 'Techniques of integration, applications of integration, improper integrals, sequences and series, and introduction to differential equations.',
      credits: 4, subject: 'Math',
      prerequisites: ['MATH 021'],
      materials: [{ name: 'Calculus: Early Transcendentals', url: '#' }],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'MWF 11:10 AM - 12:00 PM', location: 'Christmas-Saucon Hall 101' },
      ],
      reviews: [ ]
    },
    {
      id: 'MATH 205', crn: '81236', title: 'Linear Methods',
      instructor: 'Prof. David Lee', instructorEmail: 'd.lee@lehigh.edu',
      description: 'Covers linear algebra topics including vectors, matrices, determinants, eigenvalues, and eigenvectors.',
      credits: 3, subject: 'Math',
      prerequisites: ['MATH 022'],
      materials: [],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'TR 1:35 PM - 2:50 PM', location: 'Coppee Hall 301' },
      ],
      reviews: [
        { id: 4, author: 'Student D', rating: 7, comment: 'Very theoretical but essential for many upper-level courses.', date: '2023-12-20' },
      ]
    },
    {
      id: 'WRT 001', crn: '95501', title: 'Academic and Analytical Writing',
      instructor: 'Dr. Jessica Williams', instructorEmail: 'j.williams@lehigh.edu',
      description: 'A study of literary analysis and argumentative writing. Close reading of various genres.',
      credits: 3, subject: 'Humanities',
      prerequisites: [],
      materials: [],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'TR 9:20 AM - 10:35 AM', location: 'Drown Hall 101' },
      ],
      reviews: [
         { id: 5, author: 'Student E', rating: 10, comment: 'Amazing discussions in class. The reading list was fantastic.', date: '2024-05-12' },
         { id: 6, author: 'Student F', rating: 8, comment: 'A lot of writing, but it definitely improves your skills.', date: '2024-05-09' },
      ]
    },
    {
      id: 'ECO 001', crn: '92110', title: 'Principles of Economics',
      instructor: 'Prof. Frank Gunther', instructorEmail: 'f.gunther@lehigh.edu',
      description: 'Introduction to microeconomics and macroeconomics. Covers supply and demand, market structures, GDP, inflation, and unemployment.',
      credits: 4, subject: 'Social Science',
      prerequisites: [],
      materials: [],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'MWF 1:10 PM - 2:00 PM', location: 'Rauch Business Center 101' },
      ],
      reviews: []
    },
    {
      id: 'CSE 202', crn: '78916', title: 'Computer Organization and Architecture',
      instructor: 'Dr. Brian Miller', instructorEmail: 'b.miller@lehigh.edu',
      description: 'Introduction to computer hardware and the interface between hardware and software. Topics include digital logic, processor design, memory hierarchy, and assembly language.',
      credits: 3, subject: 'Engineering',
      prerequisites: ['CSE 017'],
      materials: [],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'TR 10:45 AM - 12:00 PM', location: 'Packard Lab 101' },
      ],
      reviews: []
    },
    {
      id: 'CSE 216', crn: '78917', title: 'Software Engineering',
      instructor: 'Prof. Mark Erle', instructorEmail: 'm.erle@lehigh.edu',
      description: 'Introduction to computer hardware and the interface between hardware and software. Topics include digital logic, processor design, memory hierarchy, and assembly language.',
      credits: 3, subject: 'Engineering',
      prerequisites: ['CSE 109'],
      materials: [],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'MW 4:10 PM - 5:25 PM', location: 'Packard Lab 202' },
      ],
      reviews: [
         { id: 7, author: 'anonymous', rating: 8, comment: 'Might be literal vibe coding', date: '2025-10-18' },
      ]
    },
     {
      id: 'CSE 262', crn: '78918', title: 'Compiler Design',
      instructor: 'Prof. Linda Davis', instructorEmail: 'l.davis@lehigh.edu',
      description: 'Principles and practices of compiler construction, including lexical analysis, parsing, syntax-directed translation, and code generation. Group project required.',
      credits: 3, subject: 'Engineering',
      prerequisites: ['CSE 202', 'CSE 140'],
      materials: [],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'TR 2:35 PM - 3:50 PM', location: 'Packard Lab 303' },
      ],
      reviews: []
    },
    {
      id: 'FIN 125', crn: '92111', title: 'Introduction to Finance',
      instructor: 'Dr. Patricia Taylor', instructorEmail: 'p.taylor@lehigh.edu',
      description: 'Overview of financial markets, investments, and corporate finance. Topics include time value of money, risk and return, and valuation.',
      credits: 3, subject: 'Business',
      prerequisites: ['ECO 001'],
      materials: [],
      sections: [
        { id: 'LEC 010', type: 'Lecture', time: 'TR 10:45 AM - 12:00 PM', location: 'Rauch Business Center 202' },
      ],
      reviews: []
    }
  ];
