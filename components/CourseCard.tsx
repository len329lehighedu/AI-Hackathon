
import React, { useState } from 'react';
import { Course, SemesterPlan } from '../types';

interface CourseCardProps {
  course: Course;
  onViewReviews: () => void;
  onAddCourseToPlan: (course: Course, semester: string) => void;
  semesterPlan: SemesterPlan;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onViewReviews, onAddCourseToPlan, semesterPlan }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddToPlan = (semester: string) => {
    onAddCourseToPlan(course, semester);
    setIsDropdownOpen(false);
  };
  
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
    <div className="bg-white text-lehigh-dark-brown rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 duration-300">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-lehigh-dark-brown">{course.id}: {course.title}</h3>
          <span className="text-sm font-semibold bg-lehigh-light-gold text-lehigh-dark-brown px-2 py-1 rounded-full">{course.credits} Cr</span>
        </div>
        <p className="text-sm text-lehigh-brown mt-1">{course.subject}</p>
        <p className="text-sm text-gray-700 mt-2">Instructor: {course.instructor}</p>
        <p className="text-gray-600 mt-2 text-sm flex-grow">{course.description}</p>
      </div>
      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <button 
          onClick={onViewReviews}
          className="w-full sm:w-auto text-center px-4 py-2 bg-lehigh-dark-brown text-white text-sm font-semibold rounded-md hover:bg-lehigh-brown transition-colors duration-200"
        >
          {course.reviews.length > 0 ? `View Reviews (${course.reviews.length})` : 'No Reviews Yet'}
        </button>
        <div className="relative w-full sm:w-auto">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-center px-4 py-2 bg-lehigh-gold text-lehigh-dark-brown text-sm font-semibold rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            {currentSemester ? `Added to ${currentSemester.split(' ')[0]} '${currentSemester.split(' ')[1].slice(2)}` : 'Add to Plan'}
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full mb-2 w-full sm:w-48 bg-white rounded-md shadow-lg z-10 border border-lehigh-light-gold">
              {Object.keys(semesterPlan).map(semester => (
                <button 
                  key={semester}
                  onClick={() => handleAddToPlan(semester)}
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