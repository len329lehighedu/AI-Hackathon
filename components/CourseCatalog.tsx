
import React, { useState, useMemo } from 'react';
import { Course, Major, SemesterPlan, Subject } from '../types';
import { MAJORS, SUBJECTS } from '../constants';
import CourseCard from './CourseCard';
import ReviewsModal from './modals/ReviewsModal';

interface FilterSidebarProps {
  selectedMajor: string;
  setSelectedMajor: (major: string) => void;
  selectedSubjects: string[];
  setSelectedSubjects: (subjects: string[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  instructorSearchTerm: string;
  setInstructorSearchTerm: (term: string) => void;
  crnSearchTerm: string;
  setCrnSearchTerm: (term: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ selectedMajor, setSelectedMajor, selectedSubjects, setSelectedSubjects, searchTerm, setSearchTerm, instructorSearchTerm, setInstructorSearchTerm, crnSearchTerm, setCrnSearchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects(
      selectedSubjects.includes(subject)
        ? selectedSubjects.filter(s => s !== subject)
        : [...selectedSubjects, subject]
    );
  };
  
  return (
    <div className="bg-lehigh-brown/30 p-4 rounded-lg">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center text-lg font-semibold text-lehigh-gold"
        aria-expanded={isExpanded}
        aria-controls="filter-panel"
      >
        <span>Filter & Search</span>
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div
        id="filter-panel"
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-lehigh-gold mb-2">Search Courses</h3>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., CSE 109, Programming..."
              className="w-full bg-lehigh-dark-brown p-2 rounded-md border border-lehigh-light-gold focus:ring-lehigh-gold focus:border-lehigh-gold"
            />
          </div>
           <div>
            <h3 className="text-lg font-semibold text-lehigh-gold mb-2">Search Instructor</h3>
            <input 
              type="text"
              value={instructorSearchTerm}
              onChange={(e) => setInstructorSearchTerm(e.target.value)}
              placeholder="e.g., Johnson"
              className="w-full bg-lehigh-dark-brown p-2 rounded-md border border-lehigh-light-gold focus:ring-lehigh-gold focus:border-lehigh-gold"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-lehigh-gold mb-2">Search by CRN</h3>
            <input 
              type="text"
              value={crnSearchTerm}
              onChange={(e) => setCrnSearchTerm(e.target.value)}
              placeholder="e.g., 12345"
              className="w-full bg-lehigh-dark-brown p-2 rounded-md border border-lehigh-light-gold focus:ring-lehigh-gold focus:border-lehigh-gold"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-lehigh-gold mb-2">Filter by Major</h3>
            <select value={selectedMajor} onChange={e => setSelectedMajor(e.target.value)} className="w-full bg-lehigh-dark-brown p-2 rounded-md border border-lehigh-light-gold focus:ring-lehigh-gold focus:border-lehigh-gold">
              <option value="All">All Majors</option>
              {MAJORS.map(major => <option key={major.name} value={major.name}>{major.name}</option>)}
            </select>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-lehigh-gold mb-2">Filter by Subject</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              {SUBJECTS.map(subject => (
                <label key={subject} className="flex items-center space-x-1.5 cursor-pointer text-sm">
                  <input 
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                    className="form-checkbox h-4 w-4 rounded bg-lehigh-dark-brown border-lehigh-light-gold text-lehigh-gold focus:ring-lehigh-gold"
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


interface CourseCatalogProps {
  courses: Course[];
  onAddCourseToPlan: (course: Course, semester: string) => void;
  semesterPlan: SemesterPlan;
  onAddReview: (courseId: string, review: { rating: number; comment:string; author: string; date: string }) => void;
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({ courses, onAddCourseToPlan, semesterPlan, onAddReview }) => {
  const [selectedMajor, setSelectedMajor] = useState('All');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [instructorSearchTerm, setInstructorSearchTerm] = useState('');
  const [crnSearchTerm, setCrnSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    if (selectedMajor !== 'All') {
      const major = MAJORS.find(m => m.name === selectedMajor);
      if (major) {
        filtered = filtered.filter(c => major.requiredCourses.includes(c.id));
      }
    }

    if (selectedSubjects.length > 0) {
      filtered = filtered.filter(c => selectedSubjects.includes(c.subject));
    }

    if (searchTerm.trim() !== '') {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.id.toLowerCase().includes(lowercasedTerm) || 
        c.title.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    if (instructorSearchTerm.trim() !== '') {
        const lowercasedTerm = instructorSearchTerm.toLowerCase();
        filtered = filtered.filter(c => 
            c.instructor.toLowerCase().includes(lowercasedTerm)
        );
    }
    
    if (crnSearchTerm.trim() !== '') {
        filtered = filtered.filter(c => c.crn.includes(crnSearchTerm.trim()));
    }

    return filtered;
  }, [courses, selectedMajor, selectedSubjects, searchTerm, instructorSearchTerm, crnSearchTerm]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <FilterSidebar 
            selectedMajor={selectedMajor}
            setSelectedMajor={setSelectedMajor}
            selectedSubjects={selectedSubjects}
            setSelectedSubjects={setSelectedSubjects}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            instructorSearchTerm={instructorSearchTerm}
            setInstructorSearchTerm={setInstructorSearchTerm}
            crnSearchTerm={crnSearchTerm}
            setCrnSearchTerm={setCrnSearchTerm}
        />
      </div>
      <div className="lg:col-span-3">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onViewDetails={() => setSelectedCourse(course)}
                onAddCourseToPlan={onAddCourseToPlan}
                semesterPlan={semesterPlan}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-lehigh-brown/30 rounded-lg">
              <p className="text-lehigh-light-gold text-xl">No courses match your criteria.</p>
          </div>
        )}
      </div>
      {selectedCourse && (
        <ReviewsModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)}
          onAddReview={onAddReview}
        />
      )}
    </div>
  );
};

export default CourseCatalog;
