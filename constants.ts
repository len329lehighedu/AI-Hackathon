import { Course, Major, Subject, Review, Section, Material } from './types';

export const MAJORS: Major[] = [
  { name: 'Computer Science (BS)', requiredCourses: ['CSE 007', 'CSE 017', 'CSE 109', 'MATH 205', 'CSE 202', 'CSE 262'] },
  { name: 'Mechanical Engineering (BS)', requiredCourses: ['PHY 011', 'MATH 205', 'MECH 003', 'MECH 225', 'MECH 240'] },
  { name: 'English (BA)', requiredCourses: ['WRT 001', 'ENGL 111', 'ENGL 125'] },
  { name: 'Finance (BS)', requiredCourses: ['ECO 001', 'ACCT 151', 'FIN 125', 'MKT 111'] },
];

export const SUBJECTS: Subject[] = ['Engineering', 'Humanities', 'Math', 'Natural Science', 'Social Science',"Business"];

export const ALL_COURSES: Course[] = [
    {
      id: 'CSE 007', crn: '12345', title: 'Introduction to Programming',
      instructor: 'Dr. Sarah Johnson',
      instructorContact: 's.johnson@lehigh.edu',
      description: 'An introduction to programming using a high-level language. Topics include variables, control structures, functions, and data structures.',
      credits: 4, subject: 'Engineering',
      reviews: [
        { id: 1, author: 'anonymous', rating: 8, comment: 'Great introductory course. Professor was very clear.', date: '2023-12-15' },
        { id: 2, author: 'anonymous', rating: 6, comment: 'The homeworks were quite challenging for a beginner.', date: '2023-12-10' },
      ],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Packard Lab 101', instructor: 'Dr. Sarah Johnson' },
        { id: '11L', type: 'Lab', time: 'W 1:00 PM - 3:00 PM', location: 'Packard Lab 202', instructor: 'TA' },
      ],
      prerequisites: [],
      materials: [{ name: 'Starting Out with Python, 5th Edition', link: '#' }]
    },
    {
      id: 'CSE 017', crn: '12346', title: 'Programming and Data Structures',
      instructor: 'Prof. Houria Oudghiri',
      instructorContact: 'h.oudghiri@lehigh.edu',
      description: 'In-depth study of object-oriented programming and fundamental data structures. Covers lists, stacks, queues, trees, and graphs.',
      credits: 3, subject: 'Engineering',
      reviews: [
        { id: 3, author: 'anonymous', rating: 9, comment: 'Taught me how to think like a programmer. Highly recommended.', date: '2024-05-10' },
      ],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 9:10 AM - 10:00 AM', location: 'Lewis Lab 316', instructor: 'Prof. Houria Oudghiri' }
      ],
      prerequisites: ['CSE 007'],
      materials: []
    },
    {
      id: 'CSE 109', crn: '12347', title: 'System Software',
      instructor: 'Prof. Corey Montella',
      instructorContact: 'c.montella@lehigh.edu',
      description: 'Advanced programming and data structures, including dynamic structures, memory allocation, data organization, symbol tables, hash tables, B-trees, data files.',
      credits: 4, subject: 'Engineering',
      reviews: [
        { id: 3, author: 'anonymous', rating: 9, comment: 'Taught me how to think like a programmer. Highly recommended.', date: '2024-05-10' },
      ],
      sections: [
         { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Packard Lab 101', instructor: 'Prof. Corey Montella' },
      ], prerequisites: ['CSE 017'], materials: []
    },
    {
      id: 'CSE 140', crn: '12348', title: 'Found Discrete Structure and Algorithm',
      instructor: 'Prof. Yu Yang',
      description: 'Basic representations used in algorithms: propositional and predicate logic, set operations and functions, relations and their representations, matrices and their representations, graphs and their representations, trees and their representations',
      credits: 3, subject: 'Engineering',
      reviews: [], 
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 2:10 PM - 3:00 PM', location: 'Sinclair Aud', instructor: 'Prof. Yu Yang' },
      ], 
      prerequisites: ['CSE 017'], materials: []
    },
    {
      id: 'MATH 021', crn: '23456', title: 'Calculus I',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Functions and graphs; limits and continuity; derivative, differential, and applications',
      credits: 4, subject: 'Math',
      reviews: [], 
      sections: [
        { id: '12', type: 'Lecture', time: 'MWF 1:10 PM - 2:00 PM', location: 'Christmas-Saucon 101', instructor: 'Dr. Emily Rodriguez' },
        { id: '13', type: 'Recitation', time: 'T 10:45 AM - 12:00 PM', location: 'Christmas-Saucon 202', instructor: 'TA' },
      ], 
      prerequisites: [], materials: []
    },
    {
      id: 'MATH 022', crn: '23457', title: 'Calculus II',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Functions and graphs; limits and continuity; derivative, differential, and applications',
      credits: 4, subject: 'Math',
      reviews: [], 
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Christmas-Saucon 101', instructor: 'Dr. Emily Rodriguez' }
      ], 
      prerequisites: ['MATH 021'], materials: []
    },
    {
      id: 'MATH 205', crn: '23458', title: 'Linear Methods',
      instructor: 'Prof. David Lee',
      description: 'Covers linear algebra topics including vectors, matrices, determinants, eigenvalues, and eigenvectors.',
      credits: 3, subject: 'Math',
      reviews: [
        { id: 4, author: 'Student D', rating: 7, comment: 'Very theoretical but essential for many upper-level courses.', date: '2023-12-20' },
      ],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 11:10 AM - 12:00 PM', location: 'Neville Hall 003', instructor: 'Prof. David Lee' },
      ], prerequisites: ['MATH 022'], materials: []
    },
    {
      id: 'WRT 001', crn: '34567', title: 'Academic and Analytical Writing',
      instructor: 'Dr. Jessica Williams',
      description: 'A study of literary analysis and argumentative writing. Close reading of various genres.',
      credits: 3, subject: 'Humanities',
      reviews: [
         { id: 5, author: 'Student E', rating: 10, comment: 'Amazing discussions in class. The reading list was fantastic.', date: '2024-05-12' },
         { id: 6, author: 'Student F', rating: 8, comment: 'A lot of writing, but it definitely improves your skills.', date: '2024-05-09' },
      ],
      sections: [
        { id: '11', type: 'Lecture', time: 'TTh 9:20 AM - 10:35 AM', location: 'Drown Hall 101', instructor: 'Dr. Jessica Williams' },
      ], prerequisites: [], materials: []
    },
    {
      id: 'ECO 001', crn: '45678', title: 'Principles of Economics',
      instructor: 'Prof. Frank Gunther',
      description: 'Introduction to microeconomics and macroeconomics. Covers supply and demand, market structures, GDP, inflation, and unemployment.',
      credits: 4, subject: 'Social Science',
      reviews: [], 
      sections: [
         { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Rauch Business Ctr 141', instructor: 'Prof. Frank Gunther' },
      ], 
      prerequisites: [], materials: []
    },
    {
      id: 'CSE 202', crn: '12350', title: 'Computer Organization and Architecture',
      instructor: 'Dr. Brian Miller',
      description: 'Introduction to computer hardware and the interface between hardware and software. Topics include digital logic, processor design, memory hierarchy, and assembly language.',
      credits: 3, subject: 'Engineering',
      reviews: [], 
      sections: [
        { id: '10', type: 'Lecture', time: 'MW 3:00 PM - 4:15 PM', location: 'Packard Lab 101', instructor: 'Dr. Brian Miller' },
      ], 
      prerequisites: ['CSE 109'], materials: []
    },
    {
      id: 'CSE 216', crn: '12351', title: 'Software Engineering',
      instructor: 'Prof. Mark Erle',
      description: 'Introduction to computer hardware and the interface between hardware and software. Topics include digital logic, processor design, memory hierarchy, and assembly language.',
      credits: 3, subject: 'Engineering',
      reviews: [
         { id: 7, author: 'anonymous', rating: 8, comment: 'Might be literal vibe coding', date: '2025-10-18' },
      ],
      sections: [
        { id: '10', type: 'Lecture', time: 'MW 4:25 PM - 5:40 PM', location: 'Packard Lab 101', instructor: 'Prof. Mark Erle' }
      ], 
      prerequisites: ['CSE 109'], materials: []
    },
     {
      id: 'CSE 262', crn: '12352', title: 'Software Engineering',
      instructor: 'Prof. Linda Davis',
      description: 'Principles and practices of software development, including requirements, design, implementation, testing, and project management. Group project required.',
      credits: 3, subject: 'Engineering',
      reviews: [], 
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 3:00 PM - 4:15 PM', location: 'Lewis Lab 316', instructor: 'Prof. Linda Davis' }
      ], 
      prerequisites: ['CSE 216'], materials: []
    },
    {
      id: 'FIN 125', crn: '45679', title: 'Introduction to Finance',
      instructor: 'Dr. Patricia Taylor',
      description: 'Overview of financial markets, investments, and corporate finance. Topics include time value of money, risk and return, and valuation.',
      credits: 3, subject: 'Social Science',
      reviews: [], 
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 10:10 AM - 11:00 AM', location: 'Rauch Business Ctr 091', instructor: 'Dr. Patricia Taylor' }
      ], 
      prerequisites: ['ECO 001'], materials: []
    }
  ];