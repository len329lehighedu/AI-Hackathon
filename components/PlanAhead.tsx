
import React, { useState, useMemo } from 'react';
import { SemesterPlan, Course, Major } from '../types';
import { MAJORS } from '../constants';
import ScheduleVisualizer from './ScheduleVisualizer';
import Chatbot from './Chatbot';

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
        <button onClick={() => onRemove(course.id, semester)} className="text-lehigh-red hover:text-red-700 font-bold text-xl" aria-label={`Remove ${course.title} from plan`}>
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
            <h3 className="text-lg font-bold text-lehigh-gold mb-3 text-center">{semester}</h3>
            <div className="space-y-3 flex-grow overflow-y-auto pr-1">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <PlannedCourseCard
                            key={course.id}
                            course={course}
                            semester={semester}
                            onRemove={onRemoveCourseFromPlan}
                        />
                    ))
                ) : (
                    <p className="text-center text-sm text-lehigh-light-gold/70 pt-4">No courses planned.</p>
                )}
            </div>
            <div className="border-t border-lehigh-brown mt-3 pt-3 text-center">
                <p className="font-bold text-white">Total Credits: {totalCredits}</p>
            </div>
        </div>
    );
};

interface MajorRequirementsProps {
    selectedMajor: Major | null;
    plannedCourses: Course[];
}

const MajorRequirements: React.FC<MajorRequirementsProps> = ({ selectedMajor, plannedCourses }) => {
    if (!selectedMajor) {
        return null;
    }

    const plannedCourseIds = new Set(plannedCourses.map(c => c.id));
    const requiredCourses = selectedMajor.requiredCourses;
    const completedCourses = requiredCourses.filter(id => plannedCourseIds.has(id));
    const remainingCourses = requiredCourses.filter(id => !plannedCourseIds.has(id));

    return (
        <div className="bg-lehigh-brown/30 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-lehigh-gold mb-4">Requirements for {selectedMajor.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-lehigh-light-gold mb-2">Completed ({completedCourses.length}/{requiredCourses.length})</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {completedCourses.length > 0 ? completedCourses.map(id => <li key={id} className="text-green-300">{id}</li>) : <li className="text-gray-400">None</li>}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lehigh-light-gold mb-2">Remaining</h4>
                     <ul className="list-disc list-inside text-sm space-y-1">
                        {remainingCourses.length > 0 ? remainingCourses.map(id => <li key={id} className="text-yellow-300">{id}</li>) : <li className="text-gray-400">All requirements met!</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};


interface PlanAheadProps {
    semesterPlan: SemesterPlan;
    onRemoveCourseFromPlan: (courseId: string, semester: string) => void;
    onAddCourseToPlan: (course: Course, semester: string) => void;
    allCourses: Course[];
}

const PlanAhead: React.FC<PlanAheadProps> = ({ semesterPlan, onRemoveCourseFromPlan, onAddCourseToPlan, allCourses }) => {
    const [selectedMajorName, setSelectedMajorName] = useState<string>('None');
    
    const plannedCourses = useMemo(() => Object.values(semesterPlan).flat(), [semesterPlan]);
    const selectedMajor = useMemo(() => MAJORS.find(m => m.name === selectedMajorName) || null, [selectedMajorName]);
    
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-lehigh-gold text-center">Plan Your Academic Journey</h2>

            <div className="max-w-4xl mx-auto space-y-4">
                 <div>
                    <label htmlFor="major-select" className="block text-lg font-semibold text-lehigh-gold mb-2">Track Major Requirements:</label>
                    <select
                        id="major-select"
                        value={selectedMajorName}
                        onChange={e => setSelectedMajorName(e.target.value)}
                        className="w-full max-w-md bg-lehigh-dark-brown p-2 rounded-md border border-lehigh-light-gold focus:ring-lehigh-gold focus:border-lehigh-gold"
                    >
                        <option value="None">-- Select a Major --</option>
                        {MAJORS.map(major => <option key={major.name} value={major.name}>{major.name}</option>)}
                    </select>
                </div>
                {selectedMajor && <MajorRequirements selectedMajor={selectedMajor} plannedCourses={plannedCourses} />}
            </div>

            <div>
                <h3 className="text-2xl font-bold text-lehigh-gold mb-4">Weekly Schedule</h3>
                <ScheduleVisualizer courses={plannedCourses} />
            </div>

            <div>
                <h3 className="text-2xl font-bold text-lehigh-gold mb-4">Semester Breakdown</h3>
                <div className="overflow-x-auto pb-4">
                     <div className="grid grid-flow-col auto-cols-min sm:auto-cols-fr gap-4 min-w-[1200px] lg:min-w-full">
                        {Object.entries(semesterPlan).map(([semester, courses]) => (
                            <div key={semester} className="w-64 sm:w-auto">
                                <SemesterColumn
                                    semester={semester}
                                    courses={courses}
                                    onRemoveCourseFromPlan={onRemoveCourseFromPlan}
                                />
                             </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <Chatbot allCourses={allCourses} />
        </div>
    );
};

export default PlanAhead;
