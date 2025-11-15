import React, { useState } from 'react';
import { SemesterPlan, Course, Major } from '../types';
import { MAJORS } from '../constants';

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
        <div className="bg-lehigh-darker-brown rounded-lg p-4 flex flex-col h-full">
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
  onAddCourseToPlan: (course: Course, semester: string) => void;
  allCourses: Course[];
}

const PlanAhead: React.FC<PlanAheadProps> = ({ semesterPlan, onRemoveCourseFromPlan, onAddCourseToPlan, allCourses }) => {
    const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

    // Fix: Explicitly type `c` as `Course` to help TypeScript's type inference,
    // which can sometimes fail with chained methods like `.flat().map()`.
    const plannedCourseIds = Object.values(semesterPlan).flat().map((c: Course) => c.id);
    const requiredCoursesForMajor = selectedMajor ? allCourses.filter(c => selectedMajor.requiredCourses.includes(c.id)) : [];
    const unselectedRequired = requiredCoursesForMajor.filter(c => !plannedCourseIds.includes(c.id));
  
    return (
    <div>
        <h2 className="text-3xl font-bold text-lehigh-gold mb-6">Your Academic Plan</h2>
        
        <div className="bg-lehigh-darker-brown p-4 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-lehigh-gold mb-3">Plan by Major Requirements</h3>
            <select 
                onChange={e => setSelectedMajor(MAJORS.find(m => m.name === e.target.value) || null)} 
                className="w-full md:w-1/2 bg-lehigh-dark-brown p-2 rounded-md border border-lehigh-light-gold focus:ring-lehigh-gold focus:border-lehigh-gold"
            >
                <option value="">Select a Major...</option>
                {MAJORS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
            </select>
            
            {selectedMajor && (
                <div className="mt-4">
                    <h4 className="font-semibold text-lehigh-light-gold mb-2">Remaining requirements for {selectedMajor.name}:</h4>
                    {unselectedRequired.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {unselectedRequired.map(course => (
                            <div key={course.id} className="bg-lehigh-brown/50 p-3 rounded-md flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{course.id}</p>
                                    <p className="text-xs">{course.title}</p>
                                </div>
                                <div className="relative group">
                                    <button className="bg-lehigh-gold text-lehigh-dark-brown px-2 py-1 rounded-md text-sm font-semibold">+</button>
                                    <div className="absolute bottom-full mb-2 w-48 bg-white rounded-md shadow-lg z-10 border border-lehigh-light-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                                        {Object.keys(semesterPlan).map(semester => (
                                            <button 
                                                key={semester}
                                                onClick={() => onAddCourseToPlan(course, semester)}
                                                className="block w-full text-left px-4 py-2 text-sm text-lehigh-dark-brown hover:bg-lehigh-light-gold"
                                            >
                                                Add to {semester}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p className="text-green-400 italic">All required courses for this major are in your plan!</p>
                    )}
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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