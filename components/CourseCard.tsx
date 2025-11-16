
import React from 'react';
import { Course, SemesterPlan } from '../types';

interface CourseCardProps {
  course: Course;
  onViewDetails: () => void;
  onAddCourseToPlan: (course: Course, semester: string) => void;
  semesterPlan: SemesterPlan;
  openDropdownCourseId: string | null;
  onToggleDropdown: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onViewDetails, onAddCourseToPlan, semesterPlan, openDropdownCourseId, onToggleDropdown }) => {
  const isDropdownOpen = openDropdownCourseId === course.id;

  const getCourseSemester = () => {
    for(const semester in semesterPlan) {
      if(semesterPlan[semester].find(c => c.id === course.id)) {
        return semester;
      }
    }
    return null;
  };
  
  const currentSemester = getCourseSemester();

  const totalEnrolled = course.sections.reduce((sum, sec) => sum + sec.enrolled, 0);
  const totalCapacity = course.sections.reduce((sum, sec) => sum + sec.capacity, 0);
  const occupancy = totalCapacity > 0 ? totalEnrolled / totalCapacity : 0;
  
  const occupancyColor = occupancy >= 1 ? 'text-lehigh-red' : occupancy > 0.85 ? 'text-yellow-600' : 'text-green-600';

  return (
    <div className="bg-brand-surface text-brand-text rounded-xl shadow-md border border-brand-secondary flex flex-col transition-shadow hover:shadow-lg duration-300 select-none">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-brand-text mr-2">{course.id}: {course.title}</h3>
          <span className="flex-shrink-0 text-xs font-semibold bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full">{course.credits} credits</span>
        </div>
        <p className="text-sm text-brand-accent mt-1">{course.subject}</p>
        <p className="text-sm text-brand-accent mt-2">Instructor: {course.instructor}</p>
        <p className={`text-sm font-semibold ${occupancyColor} mt-1`}>Seats: {totalEnrolled} / {totalCapacity}</p>
        <p className="text-brand-accent mt-3 text-sm flex-grow line-clamp-3">{course.description}</p>
      </div>
      <div className="border-t border-brand-secondary p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <button 
          onClick={onViewDetails}
          className="w-full sm:w-auto text-center px-4 py-2 bg-transparent border border-brand-secondary text-brand-text text-sm font-semibold rounded-md hover:bg-brand-secondary/50 transition-colors duration-200"
        >
          View Details
        </button>
        <div className="relative w-full sm:w-auto">
          <button 
            onClick={() => onToggleDropdown(course.id)}
            className="w-full text-center px-4 py-2 bg-brand-primary text-white text-sm font-semibold rounded-md hover:bg-opacity-90 transition-colors duration-200"
          >
            {currentSemester ? `Added to ${currentSemester.split(' ')[0]} '${currentSemester.split(' ')[1].slice(2)}` : 'Add to Plan'}
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full mb-2 w-full bg-brand-surface rounded-md shadow-lg z-20 border border-brand-secondary">
              {Object.keys(semesterPlan).map(semester => (
                <button 
                  key={semester}
                  onClick={() => onAddCourseToPlan(course, semester)}
                  className="block w-full text-left px-4 py-2 text-sm text-brand-text hover:bg-brand-secondary/50"
                >
                  {semester}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;