import { Course, Major, Subject, Review, Section, Material } from './types';

export const MAJORS: Major[] = [
  { name: 'Computer Science (BS)', requiredCourses: ['CSE 007', 'CSE 017', 'CSE 109', 'MATH 205', 'CSE 202', 'CSE 262'] },
  { name: 'Mechanical Engineering (BS)', requiredCourses: ['PHY 011', 'MATH 205', 'MECH 003', 'MECH 225', 'MECH 240'] },
  { name: 'English (BA)', requiredCourses: ['WRT 001', 'ENGL 111', 'ENGL 125'] },
  { name: 'Finance (BS)', requiredCourses: ['ECO 001', 'ACCT 151', 'FIN 125', 'MKT 111'] },
  { name: 'Computer Science and Business (BS)', requiredCourses: ['CSE 007', 'CSE 017', 'CSE 109', 'ECO 001', 'ACCT 151', 'FIN 125', 'MKT 111', 'MATH 205', 'BUS 001', 'ECO 045', 'CSE 140', 'CSE 202', 'CSE 216', 'MGT 043', 'CSE 347', 'MGT 301'] },
  { name: 'Integrated Business and Engineering (IBE)', requiredCourses: ['IBE 010', 'ECO 001', 'MATH 021', 'CSE 007', 'PHY 011', 'IBE 110', 'IBE 210', 'IBE 310' ]},
  { name: 'Computer Science and Arts (B.A.)', requiredCourses: ['CSE 007', 'CSE 017', 'ART 001', 'PHIL 001', 'DES 101', 'CSE 109', 'DES 202', 'CSE 262'] },
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
        { id: 1, author: 'anonymous', ratings: { difficulty: 2, workload: 6, clarity: 5, fairness: 5, usefulness: 4, engagement: 4, workloadExpectation: 3 }, comment: 'Great introductory course. Professor was very clear.', date: '2023-12-15' },
        { id: 2, author: 'anonymous', ratings: { difficulty: 3, workload: 10, clarity: 3, fairness: 4, usefulness: 3, engagement: 2, workloadExpectation: 4 }, comment: 'The homeworks were quite challenging for a beginner.', date: '2023-12-10' },
      ],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Packard Lab 101', instructor: 'Dr. Sarah Johnson', enrolled: 145, capacity: 150 },
        { id: '11L', type: 'Lab', time: 'W 1:00 PM - 3:00 PM', location: 'Packard Lab 202', instructor: 'TA', enrolled: 25, capacity: 25 },
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
        { id: 3, author: 'anonymous', ratings: { difficulty: 4, workload: 8, clarity: 5, fairness: 4, usefulness: 5, engagement: 5, workloadExpectation: 3 }, comment: 'Taught me how to think like a programmer. Highly recommended.', date: '2024-05-10' },
      ],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 9:10 AM - 10:00 AM', location: 'Lewis Lab 316', instructor: 'Prof. Houria Oudghiri', enrolled: 88, capacity: 90 }
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
        { id: 3, author: 'anonymous', ratings: { difficulty: 5, workload: 12, clarity: 4, fairness: 4, usefulness: 5, engagement: 4, workloadExpectation: 4 }, comment: 'Very challenging but rewarding. Montella is a great professor.', date: '2024-05-10' },
      ],
      sections: [
         { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Packard Lab 101', instructor: 'Prof. Corey Montella', enrolled: 75, capacity: 75 },
      ], prerequisites: ['CSE 017'], materials: []
    },
    {
      id: 'CSE 140', crn: '12348', title: 'Found Discrete Structure and Algorithm',
      instructor: 'Prof. Yu Yang',
      description: 'Basic representations used in algorithms: propositional and predicate logic, set operations and functions, relations and their representations, matrices and their representations, graphs and their representations, trees and their representations',
      credits: 3, subject: 'Engineering',
      reviews: [], 
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 2:10 PM - 3:00 PM', location: 'Sinclair Aud', instructor: 'Prof. Yu Yang', enrolled: 120, capacity: 150 },
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
        { id: '12', type: 'Lecture', time: 'MWF 1:10 PM - 2:00 PM', location: 'Christmas-Saucon 101', instructor: 'Dr. Emily Rodriguez', enrolled: 95, capacity: 100 },
        { id: '13', type: 'Recitation', time: 'T 10:45 AM - 12:00 PM', location: 'Christmas-Saucon 202', instructor: 'TA', enrolled: 32, capacity: 35 },
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
        { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Christmas-Saucon 101', instructor: 'Dr. Emily Rodriguez', enrolled: 80, capacity: 100 }
      ], 
      prerequisites: ['MATH 021'], materials: []
    },
    {
      id: 'MATH 205', crn: '23458', title: 'Linear Methods',
      instructor: 'Prof. David Lee',
      description: 'Covers linear algebra topics including vectors, matrices, determinants, eigenvalues, and eigenvectors.',
      credits: 3, subject: 'Math',
      reviews: [
        { id: 4, author: 'Student D', ratings: { difficulty: 4, workload: 7, clarity: 3, fairness: 3, usefulness: 5, engagement: 2, workloadExpectation: 3 }, comment: 'Very theoretical but essential for many upper-level courses.', date: '2023-12-20' },
      ],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 11:10 AM - 12:00 PM', location: 'Neville Hall 003', instructor: 'Prof. David Lee', enrolled: 60, capacity: 60 },
      ], prerequisites: ['MATH 022'], materials: []
    },
    {
      id: 'WRT 001', crn: '34567', title: 'Academic and Analytical Writing',
      instructor: 'Dr. Jessica Williams',
      description: 'A study of literary analysis and argumentative writing. Close reading of various genres.',
      credits: 3, subject: 'Humanities',
      reviews: [
         { id: 5, author: 'Student E', ratings: { difficulty: 2, workload: 8, clarity: 5, fairness: 5, usefulness: 5, engagement: 5, workloadExpectation: 3 }, comment: 'Amazing discussions in class. The reading list was fantastic.', date: '2024-05-12' },
         { id: 6, author: 'Student F', ratings: { difficulty: 3, workload: 9, clarity: 4, fairness: 4, usefulness: 4, engagement: 3, workloadExpectation: 4 }, comment: 'A lot of writing, but it definitely improves your skills.', date: '2024-05-09' },
      ],
      sections: [
        { id: '11', type: 'Lecture', time: 'TTh 9:20 AM - 10:35 AM', location: 'Drown Hall 101', instructor: 'Dr. Jessica Williams', enrolled: 22, capacity: 25 },
      ], prerequisites: [], materials: []
    },
    {
      id: 'ECO 001', crn: '45678', title: 'Principles of Economics',
      instructor: 'Prof. Frank Gunther',
      description: 'Introduction to microeconomics and macroeconomics. Covers supply and demand, market structures, GDP, inflation, and unemployment.',
      credits: 4, subject: 'Social Science',
      reviews: [], 
      sections: [
         { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Rauch Business Ctr 141', instructor: 'Prof. Frank Gunther', enrolled: 250, capacity: 250 },
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
        { id: '10', type: 'Lecture', time: 'MW 3:00 PM - 4:15 PM', location: 'Packard Lab 101', instructor: 'Dr. Brian Miller', enrolled: 65, capacity: 70 },
      ], 
      prerequisites: ['CSE 109'], materials: []
    },
    {
      id: 'CSE 216', crn: '12351', title: 'Software Engineering',
      instructor: 'Prof. Mark Erle',
      description: 'Introduction to computer hardware and the interface between hardware and software. Topics include digital logic, processor design, memory hierarchy, and assembly language.',
      credits: 3, subject: 'Engineering',
      reviews: [
         { id: 7, author: 'anonymous', ratings: { difficulty: 3, workload: 5, clarity: 5, fairness: 5, usefulness: 4, engagement: 5, workloadExpectation: 2 }, comment: 'Might be literal vibe coding', date: '2025-10-18' },
      ],
      sections: [
        { id: '10', type: 'Lecture', time: 'MW 4:25 PM - 5:40 PM', location: 'Packard Lab 101', instructor: 'Prof. Mark Erle', enrolled: 70, capacity: 70 }
      ], 
      prerequisites: ['CSE 109'], materials: []
    },
     {
      id: 'CSE 262', crn: '12352', title: 'Programming Languages',
      instructor: 'Prof. Linda Davis',
      description: 'Use, structure and implementation of several programming languages',
      credits: 3, subject: 'Engineering',
      reviews: [], 
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 3:00 PM - 4:15 PM', location: 'Lewis Lab 316', instructor: 'Prof. Linda Davis', enrolled: 55, capacity: 60 }
      ], 
      prerequisites: ['CSE 017'], materials: []
    },
    {
      id: 'FIN 125', crn: '45679', title: 'Introduction to Finance',
      instructor: 'Dr. Patricia Taylor',
      description: 'Overview of financial markets, investments, and corporate finance. Topics include time value of money, risk and return, and valuation.',
      credits: 3, subject: 'Business',
      reviews: [], 
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 10:10 AM - 11:00 AM', location: 'Rauch Business Ctr 091', instructor: 'Dr. Patricia Taylor', enrolled: 110, capacity: 120 }
      ], 
      prerequisites: ['ECO 001'], materials: []
    },
    {
      id: 'ACCT 151', crn: '50101', title: 'Introduction to Financial Accounting',
      instructor: 'Prof. Michael Chen',
      description: 'An introduction to the principles and concepts of financial accounting. Topics include the accounting cycle, financial statements, and analysis of business transactions.',
      credits: 3, subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 9:20 AM - 10:35 AM', location: 'Rauch Business Ctr 120', instructor: 'Prof. Michael Chen', enrolled: 130, capacity: 130 }
      ],
      prerequisites: [], materials: []
    },
    {
      id: 'ACCT 152', crn: '50102', title: 'Introduction to Managerial Accounting',
      instructor: 'Dr. Linda White',
      description: 'An introduction to the use of accounting information for managerial decision-making. Topics include cost behavior, budgeting, performance evaluation, and cost-volume-profit analysis.',
      credits: 3, subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 1:10 PM - 2:00 PM', location: 'Rauch Business Ctr 122', instructor: 'Dr. Linda White', enrolled: 85, capacity: 100 }
      ],
      prerequisites: ['ACCT 151'], materials: []
    },
    {
      id: 'MKT 111', crn: '50201', title: 'Principles of Marketing',
      instructor: 'Prof. David Clark',
      description: 'A comprehensive introduction to the field of marketing. The course covers key marketing concepts, strategies, and practices, including market research, consumer behavior, product development, pricing, promotion, and distribution.',
      credits: 3, subject: 'Business',
      reviews: [
        { id: 8, author: 'anonymous', ratings: { difficulty: 2, workload: 4, clarity: 5, fairness: 5, usefulness: 4, engagement: 4, workloadExpectation: 3 }, comment: 'Great overview of marketing. Professor Clark is very engaging.', date: '2024-01-05' },
      ],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Rauch Business Ctr 085', instructor: 'Prof. David Clark', enrolled: 99, capacity: 100 }
      ],
      prerequisites: ['ECO 001'], materials: []
    },
    {
      id: 'MGT 043', crn: '50301', title: 'Organizational Behavior',
      instructor: 'Dr. Susan Adams',
      description: 'Study of individual and group behavior in organizations. Topics include motivation, leadership, communication, team dynamics, organizational culture, and managing change.',
      credits: 3, subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 11:10 AM - 12:00 PM', location: 'Rauch Business Ctr 111', instructor: 'Dr. Susan Adams', enrolled: 40, capacity: 45 }
      ],
      prerequisites: [], materials: []
    },
    {
      id: 'LAW 201', crn: '50401', title: 'Legal Environment of Business',
      instructor: 'Prof. James Miller',
      description: 'An introduction to the U.S. legal system and its impact on business. Topics include contracts, torts, property, business entities, and government regulation.',
      credits: 3, subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 3:00 PM - 4:15 PM', location: 'Rauch Business Ctr 143', instructor: 'Prof. James Miller', enrolled: 50, capacity: 50 }
      ],
      prerequisites: ['ECO 001'], materials: []
    },
    {
      id: 'SCM 186', crn: '50501', title: 'Introduction to Supply Chain Management',
      instructor: 'Dr. Robert Garcia',
      description: 'This course provides an overview of supply chain management concepts. Topics include logistics, inventory management, procurement, operations, and information technology in the supply chain.',
      credits: 3, subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MW 3:00 PM - 4:15 PM', location: 'Rauch Business Ctr 091', instructor: 'Dr. Robert Garcia', enrolled: 35, capacity: 40 }
      ],
      prerequisites: ['ECO 001', 'MATH 021'], materials: []
    },
    {
      id: 'MGT 301', crn: '50302', title: 'Strategic Management',
      instructor: 'Prof. Maria Hernandez',
      description: 'Capstone course in business. Focuses on the formulation and implementation of corporate and business strategy. Integrates concepts from various business disciplines.',
      credits: 3, subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Rauch Business Ctr 171', instructor: 'Prof. Maria Hernandez', enrolled: 40, capacity: 40 }
      ],
      prerequisites: ['FIN 125', 'MKT 111'], materials: []
    },
    // CSB Additions Start Here
    {
      id: 'BUS 001',
      crn: '50601',
      title: 'Foundations of Business',
      instructor: 'Prof. Laura Richmond',
      description: 'An introductory course covering the fundamental concepts of business, including management, marketing, finance, accounting, and operations in a global context.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Rauch Business Ctr 101', instructor: 'Prof. Laura Richmond', enrolled: 180, capacity: 200 }
      ],
      prerequisites: [], 
      materials: []
    },
    {
      id: 'ECO 045',
      crn: '45679',
      title: 'Statistical Methods',
      instructor: 'Dr. Ken Chow',
      description: 'Covers the basic concepts of probability and statistics, including data analysis, estimation, hypothesis testing, and regression. Emphasis on applications in economics and business.',
      credits: 3,
      subject: 'Social Science',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 9:10 AM - 10:00 AM', location: 'Rauch Business Ctr 085', instructor: 'Dr. Ken Chow', enrolled: 90, capacity: 90 }
      ],
      prerequisites: ['ECO 001'], 
      materials: []
    },
    {
      id: 'CSE 347',
      crn: '12355',
      title: 'Software and Systems for E-Commerce',
      instructor: 'Prof. Mark Erle',
      description: 'CSB Capstone. Design and implementation of significant e-commerce systems. Integrates business and technology concepts in a team project environment.',
      credits: 3,
      subject: 'Engineering',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Packard Lab 466', instructor: 'Prof. Mark Erle', enrolled: 28, capacity: 30 }
      ],
      prerequisites: ['CSE 216'], 
      materials: []
    },
    // ... New Intercollegiate Courses
    {
      id: 'IBE 010', crn: '70001', title: 'IBE Freshman Seminar',
      instructor: 'Prof. Team Taught',
      description: 'Introduction to the Integrated Business and Engineering honors program. Case studies and projects focusing on the intersection of technology and business.',
      credits: 1, subject: 'Business',
      reviews: [],
      sections: [{ id: '10', type: 'Lecture', time: 'M 4:10 PM - 5:00 PM', location: 'Rauch Business Ctr 251', instructor: 'Prof. Team Taught', enrolled: 48, capacity: 50 }],
      prerequisites: [], materials: []
    },
    {
        id: 'IBE 110', crn: '70002', title: 'IBE Sophomore Seminar',
        instructor: 'Prof. Team Taught',
        description: 'Focuses on product development and marketing in a technical context. Students work in teams to design and propose a new product.',
        credits: 2, subject: 'Business',
        reviews: [],
        sections: [{ id: '10', type: 'Lecture', time: 'W 4:10 PM - 6:00 PM', location: 'Rauch Business Ctr 251', instructor: 'Prof. Team Taught', enrolled: 45, capacity: 50 }],
        prerequisites: ['IBE 010'], materials: []
    },
    {
        id: 'IBE 210', crn: '70003', title: 'IBE Junior Seminar',
        instructor: 'Prof. Team Taught',
        description: 'Deep dive into operations, supply chain, and business process analysis for technology-driven firms.',
        credits: 2, subject: 'Engineering',
        reviews: [],
        sections: [{ id: '10', type: 'Lecture', time: 'F 1:10 PM - 3:00 PM', location: 'Rauch Business Ctr 251', instructor: 'Prof. Team Taught', enrolled: 40, capacity: 45 }],
        prerequisites: ['IBE 110'], materials: []
    },
    {
        id: 'IBE 310', crn: '70004', title: 'IBE Senior Capstone Project',
        instructor: 'Prof. Team Taught',
        description: 'A year-long, sponsored project where student teams solve real-world problems for corporate partners, integrating business and engineering skills.',
        credits: 4, subject: 'Engineering',
        reviews: [],
        sections: [{ id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Wilbur Powerhouse 202', instructor: 'Prof. Team Taught', enrolled: 38, capacity: 40 }],
        prerequisites: ['IBE 210'], materials: []
    },
    {
      id: 'DES 101', crn: '71001', title: 'Introduction to Design Thinking',
      instructor: 'Prof. Wes Kocher',
      description: 'A project-based introduction to the principles of design thinking, from user research to prototyping and iteration.',
      credits: 3, subject: 'Humanities',
      reviews: [],
      sections: [{ id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Wilbur Powerhouse 101', instructor: 'Prof. Wes Kocher', enrolled: 25, capacity: 30 }],
      prerequisites: [], materials: []
    },
    {
      id: 'DES 202', crn: '71002', title: 'User Interface and Experience Design',
      instructor: 'Prof. Andrea Lepage',
      description: 'Focuses on the theory and practice of designing user interfaces and experiences for digital products. Integrates art, psychology, and computer science principles.',
      credits: 3, subject: 'Humanities',
      reviews: [],
      sections: [{ id: '10', type: 'Lecture', time: 'MWF 11:10 AM - 12:00 PM', location: 'Wilbur Powerhouse 101', instructor: 'Prof. Andrea Lepage', enrolled: 28, capacity: 30 }],
      prerequisites: ['DES 101'], materials: []
    },
    {
      id: 'MKT 312',
      crn: '50202',
      title: 'Marketing Research',
      instructor: 'Prof. Sarah Daniels',
      description: 'Methods and principles of marketing research. Problem definition, research design, data collection techniques, and analysis for marketing decision making.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MW 3:00 PM - 4:15 PM', location: 'Rauch Business Ctr 120', instructor: 'Prof. Sarah Daniels', enrolled: 40, capacity: 40 }
      ],
      prerequisites: ['MKT 111', 'ECO 045'], 
      materials: []
    },
    {
      id: 'MKT 313',
      crn: '50203',
      title: 'Consumer Behavior',
      instructor: 'Prof. David Clark',
      description: 'An interdisciplinary study of consumer decision-making processes and the factors that influence them, including psychological, sociological, and cultural aspects.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 9:20 AM - 10:35 AM', location: 'Rauch Business Ctr 085', instructor: 'Prof. David Clark', enrolled: 35, capacity: 45 }
      ],
      prerequisites: ['MKT 111'], 
      materials: []
    },
     {
      id: 'MKT 327',
      crn: '50204',
      title: 'Digital & Social Media Marketing',
      instructor: 'Prof. Jennifer Allen',
      description: 'Examines strategies and tactics for using digital and social media channels to achieve marketing objectives. Topics include SEO, content marketing, and analytics.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 11:10 AM - 12:00 PM', location: 'Rauch Business Ctr 141', instructor: 'Prof. Jennifer Allen', enrolled: 42, capacity: 45 }
      ],
      prerequisites: ['MKT 111'], 
      materials: []
    },
    {
      id: 'FIN 226',
      crn: '45680',
      title: 'Investments',
      instructor: 'Dr. Paul Grayson',
      description: 'Study of investment environments and processes. Topics include security markets, investment analysis, portfolio theory, and asset pricing models.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Rauch Business Ctr 091', instructor: 'Dr. Paul Grayson', enrolled: 50, capacity: 50 }
      ],
      prerequisites: ['FIN 125'], 
      materials: []
    },
    {
      id: 'FIN 230',
      crn: '45681',
      title: 'Corporate Finance',
      instructor: 'Dr. Patricia Taylor',
      description: 'In-depth analysis of corporate financial decisions, including capital budgeting, capital structure, dividend policy, and corporate valuation.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 1:10 PM - 2:00 PM', location: 'Rauch Business Ctr 091', instructor: 'Dr. Patricia Taylor', enrolled: 55, capacity: 60 }
      ],
      prerequisites: ['FIN 125'], 
      materials: []
    },
    {
      id: 'FIN 328',
      crn: '45682',
      title: 'Derivatives & Risk Management',
      instructor: 'Dr. Paul Grayson',
      description: 'Introduction to financial derivative securities such as options, futures, and swaps, and their application in managing financial risk.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 3:00 PM - 4:15 PM', location: 'Rauch Business Ctr 122', instructor: 'Dr. Paul Grayson', enrolled: 30, capacity: 35 }
      ],
      prerequisites: ['FIN 226'], 
      materials: []
    },
    {
      id: 'CSE 241',
      crn: '12356',
      title: 'Database Systems',
      instructor: 'Prof. Brian Davison',
      description: 'Design and implementation of database systems. Topics include relational models, SQL, database design theory, and transaction management.',
      credits: 3,
      subject: 'Engineering',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MW 4:25 PM - 5:40 PM', location: 'Packard Lab 101', instructor: 'Prof. Brian Davison', enrolled: 68, capacity: 70 }
      ],
      prerequisites: ['CSE 109'], 
      materials: []
    },
     {
      id: 'CSE 318',
      crn: '12357',
      title: 'Theory of Computation',
      instructor: 'Prof. Hector Munoz-Avila',
      description: 'Introduction to formal languages, automata, and computability. Explores the fundamental capabilities and limitations of computation.',
      credits: 3,
      subject: 'Engineering',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Lewis Lab 316', instructor: 'Prof. Hector Munoz-Avila', enrolled: 40, capacity: 40 }
      ],
      prerequisites: ['CSE 140'], 
      materials: []
    },
    {
      id: 'CSE 326',
      crn: '12358',
      title: 'Web Systems Programming',
      instructor: 'Prof. Michael Spear',
      description: 'Programming for web-based applications. Covers both client-side and server-side technologies for developing dynamic, data-driven web sites.',
      credits: 3,
      subject: 'Engineering',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 2:10 PM - 3:00 PM', location: 'Packard Lab 212', instructor: 'Prof. Michael Spear', enrolled: 60, capacity: 60 }
      ],
      prerequisites: ['CSE 109'], 
      materials: []
    },
    {
      id: 'ACCT 311',
      crn: '50103',
      title: 'Intermediate Accounting I',
      instructor: 'Prof. Michael Chen',
      description: 'In-depth study of financial accounting theory and practice, focusing on the preparation and analysis of financial statements.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Rauch Business Ctr 120', instructor: 'Prof. Michael Chen', enrolled: 45, capacity: 50 }
      ],
      prerequisites: ['ACCT 152'], 
      materials: []
    },
    {
      id: 'ACCT 321',
      crn: '50104',
      title: 'Cost Accounting',
      instructor: 'Dr. Linda White',
      description: 'Study of cost accumulation, allocation, and control systems for managerial planning and decision making.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 10:10 AM - 11:00 AM', location: 'Rauch Business Ctr 122', instructor: 'Dr. Linda White', enrolled: 38, capacity: 40 }
      ],
      prerequisites: ['ACCT 152'], 
      materials: []
    },
    {
      id: 'MGT 243',
      crn: '50303',
      title: 'Human Resource Management',
      instructor: 'Dr. Susan Adams',
      description: 'Examines the policies and practices of managing human resources, including recruitment, training, compensation, and employee relations.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 9:20 AM - 10:35 AM', location: 'Rauch Business Ctr 111', instructor: 'Dr. Susan Adams', enrolled: 33, capacity: 35 }
      ],
      prerequisites: ['MGT 043'], 
      materials: []
    },
    {
      id: 'MGT 311',
      crn: '50304',
      title: 'Negotiation and Conflict Resolution',
      instructor: 'Dr. Naomi Rothman',
      description: 'Develops skills in negotiation and conflict management through theory, practice, and self-reflection.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MW 3:00 PM - 4:15 PM', location: 'Rauch Business Ctr 171', instructor: 'Dr. Naomi Rothman', enrolled: 30, capacity: 30 }
      ],
      prerequisites: [], 
      materials: []
    },
    {
      id: 'SCM 309',
      crn: '50502',
      title: 'Supply Chain Modeling and Analysis',
      instructor: 'Dr. Robert Garcia',
      description: 'Application of quantitative models and analytical tools to solve problems in supply chain and logistics management.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Rauch Business Ctr 091', instructor: 'Dr. Robert Garcia', enrolled: 25, capacity: 30 }
      ],
      prerequisites: ['SCM 186'], 
      materials: []
    },
    {
      id: 'SCM 320',
      crn: '50503',
      title: 'Transportation and Logistics Management',
      instructor: 'Dr. Zach Zacharia',
      description: 'Examines the role of transportation and logistics in the supply chain, covering modes of transport, network design, and global logistics.',
      credits: 3,
      subject: 'Business',
      reviews: [],
      sections: [
        { id: '10', type: 'Lecture', time: 'MWF 1:10 PM - 2:00 PM', location: 'Rauch Business Ctr 143', instructor: 'Dr. Zach Zacharia', enrolled: 28, capacity: 35 }
      ],
      prerequisites: ['SCM 186'], 
      materials: []
    },
    // More Diverse Courses Start Here
    {
        id: 'MECH 003', crn: '61001', title: 'Intro to Mechanical Engineering',
        instructor: 'Prof. James Wilson',
        description: 'Introduction to mechanical engineering through hands-on projects and case studies. Covers topics like design, thermodynamics, and materials.',
        credits: 3, subject: 'Engineering',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 9:20 AM - 10:35 AM', location: 'Packard Lab 360', instructor: 'Prof. James Wilson', enrolled: 55, capacity: 60 }],
        prerequisites: ['PHY 011'], materials: []
    },
    {
        id: 'ECE 081', crn: '61002', title: 'Fundamentals of Electrical and Computer Engineering',
        instructor: 'Dr. Rosa Diaz',
        description: 'An introduction to the fundamental concepts in electrical and computer engineering, including circuits, signals, and logic design.',
        credits: 4, subject: 'Engineering',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'MWF 1:10 PM - 2:00 PM', location: 'Packard Lab 101', instructor: 'Dr. Rosa Diaz', enrolled: 75, capacity: 80 }],
        prerequisites: ['MATH 022'], materials: []
    },
    {
        id: 'CHE 031', crn: '61003', title: 'Introduction to Chemical Engineering',
        instructor: 'Prof. Raymond Holt',
        description: 'Introduction to the chemical engineering profession. Material and energy balances on chemical processes. Introduction to thermodynamics of single component systems.',
        credits: 3, subject: 'Engineering',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Iacocca Hall B023', instructor: 'Prof. Raymond Holt', enrolled: 80, capacity: 80 }],
        prerequisites: ['CHM 030'], materials: []
    },
    {
        id: 'MAT 021', crn: '61004', title: 'Materials Science and Engineering',
        instructor: 'Dr. Amy Santiago',
        description: 'Structure, properties, processing, and performance of engineering materials including metals, ceramics, polymers, and composites.',
        credits: 3, subject: 'Engineering',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'MWF 10:10 AM - 11:00 AM', location: 'Whitaker Lab 303', instructor: 'Dr. Amy Santiago', enrolled: 65, capacity: 70 }],
        prerequisites: ['CHM 030'], materials: []
    },
    {
        id: 'BIOS 041', crn: '62001', title: 'Introduction to Cellular and Molecular Biology',
        instructor: 'Prof. Terry Jeffords',
        description: 'Fundamental concepts of biology, including cell structure and function, genetics, and molecular biology. With required lab.',
        credits: 4, subject: 'Natural Science',
        reviews: [], sections: [
            { id: '10', type: 'Lecture', time: 'MWF 9:10 AM - 10:00 AM', location: 'Mudd Building 017', instructor: 'Prof. Terry Jeffords', enrolled: 110, capacity: 120 },
            { id: '11L', type: 'Lab', time: 'T 1:35 PM - 4:25 PM', location: 'Iacocca Hall D301', instructor: 'TA', enrolled: 24, capacity: 24 },
        ],
        prerequisites: [], materials: []
    },
    {
        id: 'CHM 030', crn: '62002', title: 'Introduction to Chemical Principles',
        instructor: 'Dr. Charles Boyle',
        description: 'Introduction to modern chemical principles for science and engineering majors. Stoichiometry, atomic and molecular structure, thermodynamics, and kinetics.',
        credits: 4, subject: 'Natural Science',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Seeley G. Mudd 017', instructor: 'Dr. Charles Boyle', enrolled: 150, capacity: 150 }],
        prerequisites: [], materials: []
    },
    {
        id: 'PHY 011', crn: '62003', title: 'Introductory Physics I',
        instructor: 'Prof. Gina Linetti',
        description: 'Mechanics, heat, and sound. Principles of classical mechanics, including kinematics, Newton’s laws, work and energy, momentum, rotational motion, and oscillations.',
        credits: 4, subject: 'Natural Science',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'MWF 2:10 PM - 3:00 PM', location: 'Lewis Lab 316', instructor: 'Prof. Gina Linetti', enrolled: 135, capacity: 140 }],
        prerequisites: ['MATH 021'], materials: []
    },
    {
        id: 'EES 021', crn: '62004', title: 'Geology and Earth Processes',
        instructor: 'Prof. Norm Scully',
        description: 'An introduction to the materials, structures, and processes that shape the Earth. Topics include plate tectonics, minerals, rocks, volcanoes, and earthquakes.',
        credits: 3, subject: 'Natural Science',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 3:00 PM - 4:15 PM', location: 'STEPS 101', instructor: 'Prof. Norm Scully', enrolled: 45, capacity: 50 }],
        prerequisites: [], materials: []
    },
    {
        id: 'ENGL 100', crn: '63001', title: 'Working With Literature',
        instructor: 'Dr. Michael Hitchcock',
        description: 'Introduces students to the analytical tools and critical vocabulary used in literary studies through close reading of poetry, drama, and fiction.',
        credits: 4, subject: 'Humanities',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'MWF 11:10 AM - 12:00 PM', location: 'Drown Hall 104', instructor: 'Dr. Michael Hitchcock', enrolled: 28, capacity: 30 }],
        prerequisites: ['WRT 001'], materials: []
    },
    {
        id: 'HIST 001', crn: '63002', title: 'The Making of the Modern World',
        instructor: 'Prof. Eleanor Shellstrop',
        description: 'A survey of major global developments from the 15th century to the present, focusing on cross-cultural interactions and the rise of modern societies.',
        credits: 4, subject: 'Humanities',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 9:20 AM - 10:35 AM', location: 'Maginnes Hall 101', instructor: 'Prof. Eleanor Shellstrop', enrolled: 85, capacity: 90 }],
        prerequisites: [], materials: []
    },
    {
        id: 'PHIL 001', crn: '63003', title: 'Introduction to Philosophy',
        instructor: 'Prof. Chidi Anagonye',
        description: 'An introduction to fundamental philosophical questions concerning knowledge, reality, and morality through the study of classical and contemporary texts.',
        credits: 4, subject: 'Humanities',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'MWF 1:10 PM - 2:00 PM', location: 'Maginnes Hall 112', instructor: 'Prof. Chidi Anagonye', enrolled: 40, capacity: 40 }],
        prerequisites: [], materials: []
    },
    {
        id: 'ART 001', crn: '63004', title: 'Introduction to Art History',
        instructor: 'Prof. Tahani Al-Jamil',
        description: 'A chronological survey of Western art and architecture from ancient times to the Renaissance, focusing on style, context, and meaning.',
        credits: 4, subject: 'Humanities',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Zoellner Arts Center 101', instructor: 'Prof. Tahani Al-Jamil', enrolled: 60, capacity: 75 }],
        prerequisites: [], materials: []
    },
    {
        id: 'PSYC 001', crn: '64001', title: 'Introduction to Psychology',
        instructor: 'Dr. Jason Mendoza',
        description: 'A survey of the major topics in psychology, including learning, memory, perception, development, personality, and social behavior.',
        credits: 4, subject: 'Social Science',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'MWF 9:10 AM - 10:00 AM', location: 'Chandler-Ullmann 218', instructor: 'Dr. Jason Mendoza', enrolled: 180, capacity: 180 }],
        prerequisites: [], materials: []
    },
    {
        id: 'SOC 001', crn: '64002', title: 'Introduction to Sociology',
        instructor: 'Prof. Janet',
        description: 'The study of human social relationships and institutions. Topics include culture, socialization, social inequality, and social change.',
        credits: 4, subject: 'Social Science',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Price Hall Aud', instructor: 'Prof. Janet', enrolled: 120, capacity: 130 }],
        prerequisites: [], materials: []
    },
    {
        id: 'POLS 001', crn: '64003', title: 'American Political System',
        instructor: 'Prof. Michael',
        description: 'An introduction to the institutions and processes of American government, including the Constitution, presidency, Congress, and political parties.',
        credits: 4, subject: 'Social Science',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'MWF 10:10 AM - 11:00 AM', location: 'Maginnes Hall 101', instructor: 'Prof. Michael', enrolled: 95, capacity: 100 }],
        prerequisites: [], materials: []
    },
    {
        id: 'IR 010', crn: '64004', title: 'Introduction to World Politics',
        instructor: 'Prof. Shawn',
        description: 'Examines key issues in international relations, including war and peace, international law, and the global economy. Introduces major theories of international politics.',
        credits: 4, subject: 'Social Science',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 1:35 PM - 2:50 PM', location: 'Price Hall Aud', instructor: 'Prof. Shawn', enrolled: 125, capacity: 130 }],
        prerequisites: [], materials: []
    },
    {
        id: 'ANTH 001', crn: '64005', title: 'Introduction to Cultural Anthropology',
        instructor: 'Dr. Derek Hoffstetler',
        description: 'Exploration of human cultures and societies from around the world. Topics include kinship, religion, language, and economic systems in a cross-cultural perspective.',
        credits: 4, subject: 'Social Science',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'MWF 2:10 PM - 3:00 PM', location: 'Maginnes Hall 112', instructor: 'Dr. Derek Hoffstetler', enrolled: 35, capacity: 40 }],
        prerequisites: [], materials: []
    },
    {
        id: 'BIS 311', crn: '50701', title: 'Management of Business Information Systems',
        instructor: 'Prof. Glenn',
        description: 'Examines the role of information systems in business and management. Topics include IS strategy, data management, enterprise systems, and cybersecurity from a managerial perspective.',
        credits: 3, subject: 'Business',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 3:00 PM - 4:15 PM', location: 'Rauch Business Ctr 141', instructor: 'Prof. Glenn', enrolled: 48, capacity: 50 }],
        prerequisites: ['BUS 001'], materials: []
    },
    {
        id: 'ECO 119', crn: '45685', title: 'International Economics',
        instructor: 'Dr. Dina Fox',
        description: 'Analysis of international trade, finance, commercial policy, and the effects of globalization on national economies.',
        credits: 3, subject: 'Social Science',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'MWF 1:10 PM - 2:00 PM', location: 'Rauch Business Ctr 085', instructor: 'Dr. Dina Fox', enrolled: 60, capacity: 60 }],
        prerequisites: ['ECO 001'], materials: []
    },
    {
        id: 'CSE 303', crn: '12359', title: 'Operating System Design',
        instructor: 'Prof. Michael Spear',
        description: 'Principles of operating systems: concurrency, synchronization, scheduling, memory management, file systems, and security.',
        credits: 3, subject: 'Engineering',
        reviews: [], sections: [{ id: '10', type: 'Lecture', time: 'TTh 10:45 AM - 12:00 PM', location: 'Packard Lab 101', instructor: 'Prof. Michael Spear', enrolled: 65, capacity: 65 }],
        prerequisites: ['CSE 202'], materials: []
    }
  ];