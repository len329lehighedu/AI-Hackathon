
import React from 'react';
import { SemesterPlan, Course } from '../types';

interface PlannedCourseCardProps {
    course: Course;
    semester: string;
    onRemove: (courseId: string, semester: string) => void;
}

const PlannedCourseCard: React.FC<PlannedCourseCardProps> = ({ course, semester, onRemove }) => (
    <div className="bg-white p-3 rounded-lg shadow flex justify-between items-center text-lehigh-dark-brown">
        <div>
            <p className="font-bold">{course.id}</p>
            <p className="text-sm text-gray-600">{course.title}</p>
        </div>
        <button onClick={() => onRemove(course.id, semester)} className="text-lehigh-red hover:text-red-700 font-bold text-xl">
            &times;
        </button>
    </div>
);


interface SemesterColumnProps {
    semester: string;
    courses: Course[];
    onRemoveCourseFromPlan: (courseId: string, semester: string) => void;
}

const SemesterColumn: React.FC<SemesterColumnProps> = ({ semester, courses, onRemoveCourseFromPlan }) => {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

    return (
        <div className="bg-lehigh-brown/30 rounded-lg p-4 flex flex-col h-full">
            <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-xl font-bold text-lehigh-gold">{semester}</h3>
                <p className="text-sm font-semibold text-lehigh-light-gold">{totalCredits} Credits</p>
            </div>
            {courses.length > 0 ? (
                <div className="space-y-3 overflow-y-auto flex-grow">
                    {courses.map(course => (
                        <PlannedCourseCard 
                            key={course.id} 
                            course={course} 
                            semester={semester}
                            onRemove={onRemoveCourseFromPlan} 
                        />
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-lehigh-light-gold italic">No courses planned.</p>
                </div>
            )}
        </div>
    );
}

interface PlanAheadProps {
  semesterPlan: SemesterPlan;
  onRemoveCourseFromPlan: (courseId: string, semester: string) => void;
}

const PlanAhead: React.FC<PlanAheadProps> = ({ semesterPlan, onRemoveCourseFromPlan }) => {
  return (
    <div>
        <h2 className="text-3xl font-bold text-lehigh-gold mb-6">Your Academic Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(semesterPlan).map(([semester, courses]) => (
                <SemesterColumn 
                    key={semester} 
                    semester={semester} 
                    courses={courses}
                    onRemoveCourseFromPlan={onRemoveCourseFromPlan}
                />
            ))}
        </div>
    </div>
  );
};

export default PlanAhead;
