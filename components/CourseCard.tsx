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

  return (
    <div className="bg-white text-lehigh-dark-brown rounded-lg shadow-lg flex flex-col transition-transform transform hover:scale-105 duration-300 select-none">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-lehigh-dark-brown mr-2">{course.id}: {course.title}</h3>
          <span className="flex-shrink-0 text-sm font-semibold bg-lehigh-light-gold text-lehigh-dark-brown px-2 py-1 rounded-full">{course.credits} credits</span>
        </div>
        <p className="text-sm text-lehigh-brown mt-1">{course.subject}</p>
        <p className="text-sm text-gray-700 mt-2">Instructor: {course.instructor}</p>
        <p className="text-gray-600 mt-2 text-sm flex-grow">{course.description}</p>
      </div>
      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <button 
          onClick={onViewDetails}
          className="w-full sm:w-auto text-center px-4 py-2 bg-lehigh-dark-brown text-white text-sm font-semibold rounded-md hover:bg-lehigh-brown transition-colors duration-200"
        >
          View Details
        </button>
        <div className="relative w-full sm:w-auto">
          <button 
            onClick={() => onToggleDropdown(course.id)}
            className="w-full text-center px-4 py-2 bg-lehigh-gold text-lehigh-dark-brown text-sm font-semibold rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            {currentSemester ? `Added to ${currentSemester.split(' ')[0]} '${currentSemester.split(' ')[1].slice(2)}` : 'Add to Plan'}
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full mb-2 w-full bg-white rounded-md shadow-lg z-20 border border-lehigh-light-gold">
              {Object.keys(semesterPlan).map(semester => (
                <button 
                  key={semester}
                  onClick={() => onAddCourseToPlan(course, semester)}
                  className="block w-full text-left px-4 py-2 text-sm text-lehigh-dark-brown hover:bg-lehigh-light-gold"
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