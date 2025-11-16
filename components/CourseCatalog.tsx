
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
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ selectedMajor, setSelectedMajor, selectedSubjects, setSelectedSubjects }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects(
      selectedSubjects.includes(subject)
        ? selectedSubjects.filter(s => s !== subject)
        : [...selectedSubjects, subject]
    );
  };
  
  return (
    <div className="bg-brand-surface border border-brand-secondary p-4 rounded-lg">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center text-xl font-bold text-brand-primary"
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
            <h3 className="text-lg font-semibold text-brand-text mb-2">Filter by Major</h3>
            <select value={selectedMajor} onChange={e => setSelectedMajor(e.target.value)} className="w-full bg-brand-surface p-2 rounded-md border border-brand-secondary focus:ring-brand-primary focus:border-brand-primary">
              <option value="All">All Majors</option>
              {MAJORS.map(major => <option key={major.name} value={major.name}>{major.name}</option>)}
            </select>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-text mb-2">Filter by Subject</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-4 gap-y-2">
              {SUBJECTS.map(subject => (
                <label key={subject} className="flex items-center space-x-1.5 cursor-pointer text-sm text-brand-accent hover:text-brand-text">
                  <input 
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                    className="form-checkbox h-4 w-4 rounded bg-brand-surface border-brand-accent/50 text-brand-primary focus:ring-brand-primary"
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openDropdownCourseId, setOpenDropdownCourseId] = useState<string | null>(null);

  const handleToggleDropdown = (courseId: string) => {
    setOpenDropdownCourseId(prevId => (prevId === courseId ? null : courseId));
  };

  const handleAddCourseAndCloseDropdown = (course: Course, semester: string) => {
    onAddCourseToPlan(course, semester);
    setOpenDropdownCourseId(null);
  };

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    if (selectedMajor !== 'All') {
      const major = MAJORS.find(m => m.name === selectedMajor);
      if (major) {
        filtered = filtered.filter(c => c.id && major.requiredCourses?.includes(c.id));
      }
    }

    if (selectedSubjects.length > 0) {
      filtered = filtered.filter(c => c.subject && selectedSubjects.includes(c.subject));
    }

    if (searchTerm.trim() !== '') {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.id?.toLowerCase().includes(lowercasedTerm) || 
        c.title?.toLowerCase().includes(lowercasedTerm) ||
        c.instructor?.toLowerCase().includes(lowercasedTerm) ||
        c.crn?.includes(lowercasedTerm)
      );
    }

    return filtered;
  }, [courses, selectedMajor, selectedSubjects, searchTerm]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <FilterSidebar 
            selectedMajor={selectedMajor}
            setSelectedMajor={setSelectedMajor}
            selectedSubjects={selectedSubjects}
            setSelectedSubjects={setSelectedSubjects}
        />
      </div>
      <div className="lg:col-span-3">
        <h2 className="text-4xl font-bold text-brand-text mb-2">Course Catalog</h2>
        <p className="text-brand-accent mb-6">Browse and search for courses to plan your academic journey</p>
        <div className="relative mb-6">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by course ID, title, instructor, or CRN..."
              className="w-full bg-brand-surface p-3 pl-10 rounded-lg border border-brand-secondary focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
            />
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onViewDetails={() => setSelectedCourse(course)}
                onAddCourseToPlan={handleAddCourseAndCloseDropdown}
                semesterPlan={semesterPlan}
                openDropdownCourseId={openDropdownCourseId}
                onToggleDropdown={handleToggleDropdown}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-brand-secondary/50 rounded-lg">
              <p className="text-brand-accent text-xl">No courses match your criteria.</p>
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