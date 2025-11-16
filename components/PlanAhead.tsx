
import React, { useState, useMemo } from 'react';
import { SemesterPlan, Course, Major } from '../types';
import { MAJORS } from '../constants';
import ScheduleVisualizer from './ScheduleVisualizer';
import Chatbot from './Chatbot';

interface PlannedCourseCardProps {
    course: Course;
    semester: string;
    onRemove: (courseId: string, semester: string) => void;
    isConflicting?: boolean;
    conflictText?: string;
}

const PlannedCourseCard: React.FC<PlannedCourseCardProps> = ({ course, semester, onRemove, isConflicting, conflictText }) => (
    <div className={`bg-brand-surface p-3 rounded-lg shadow-sm flex justify-between items-center text-brand-text select-none transition-all duration-300 ${isConflicting ? 'ring-2 ring-lehigh-red' : 'border border-brand-secondary'}`} title={conflictText}>
        <div>
            <p className="font-bold">{course.id}</p>
            <p className="text-sm text-brand-accent">{course.title}</p>
        </div>
        <div className="flex items-center space-x-2">
            {isConflicting && <span className="text-lehigh-red text-xl font-bold" title={conflictText}>!</span>}
            <button onClick={() => onRemove(course.id, semester)} className="text-lehigh-red hover:text-red-700 font-bold text-xl" aria-label={`Remove ${course.title} from plan`}>
                &times;
            </button>
        </div>
    </div>
);


interface SemesterColumnProps {
    semester: string;
    courses: Course[];
    onRemoveCourseFromPlan: (courseId: string, semester: string) => void;
    conflicts?: Map<string, string[]>;
}

const SemesterColumn: React.FC<SemesterColumnProps> = ({ semester, courses, onRemoveCourseFromPlan, conflicts }) => {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const CREDIT_LIMIT = 18;
    const isOverloaded = totalCredits > CREDIT_LIMIT;

    return (
        <div className={`bg-brand-surface rounded-lg p-4 flex flex-col h-full border transition-all duration-300 ${isOverloaded ? 'border-yellow-500 ring-1 ring-yellow-400/50' : 'border-brand-secondary'}`}>
            <h3 className="text-lg font-bold text-brand-text mb-3 text-center flex items-center justify-center">
                {semester}
                {conflicts && conflicts.size > 0 && <span className="ml-2 text-lehigh-red" title="Time conflict detected!">⚠️</span>}
                {isOverloaded && <span className="ml-2 text-yellow-600" title={`Credit Overload: ${totalCredits} credits. An overload form may be required.`}>⚠️</span>}
            </h3>
            <div className="space-y-3 flex-grow overflow-y-auto pr-1">
                {courses.length > 0 ? (
                    courses.map(course => {
                        const conflictWith = conflicts?.get(course.id);
                        const isConflicting = !!conflictWith && conflictWith.length > 0;
                        const conflictText = isConflicting ? `Conflicts with: ${conflictWith.join(', ')}` : undefined;

                        return (
                            <PlannedCourseCard
                                key={course.id}
                                course={course}
                                semester={semester}
                                onRemove={onRemoveCourseFromPlan}
                                isConflicting={isConflicting}
                                conflictText={conflictText}
                            />
                        )
                    })
                ) : (
                    <p className="text-center text-sm text-brand-accent pt-4">No courses planned.</p>
                )}
            </div>
            <div className="border-t border-brand-secondary mt-3 pt-3 text-center">
                <p className={`font-bold ${isOverloaded ? 'text-yellow-700' : 'text-brand-text'}`}>Total Credits: {totalCredits}</p>
                {isOverloaded && (
                    <p className="text-xs text-yellow-700 mt-1">
                       Credit limit exceeded. An overload form may be required.
                    </p>
                )}
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
        <div className="bg-brand-surface border border-brand-secondary p-4 rounded-lg select-none">
            <h3 className="text-xl font-bold text-brand-text mb-4">Requirements for {selectedMajor.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-brand-accent mb-2">Completed ({completedCourses.length}/{requiredCourses.length})</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {completedCourses.length > 0 ? completedCourses.map(id => <li key={id} className="text-green-600">{id}</li>) : <li className="text-gray-500">None</li>}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-brand-accent mb-2">Remaining</h4>
                     <ul className="list-disc list-inside text-sm space-y-1">
                        {remainingCourses.length > 0 ? remainingCourses.map(id => <li key={id} className="text-yellow-600">{id}</li>) : <li className="text-gray-400">All requirements met!</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};


const parseTime = (timeStr: string) => {
    const parts = timeStr.split(' ');
    if (parts.length < 2) return { days: [], startMinutes: 0, endMinutes: 0 };
    const daysStr = parts[0];
    const timeRange = parts.slice(1).join(' ');
    const timeParts = timeRange.split('-').map(s => s.trim());
    const [startTimeStr, endTimeStr] = timeParts;
    if (!startTimeStr || !endTimeStr) return { days: [], startMinutes: 0, endMinutes: 0 };
    // FIX: Explicitly type `days` as string[] to prevent `never[]` type inference on the empty array fallback.
    const days: string[] = daysStr.match(/Su|Sa|Th|M|T|W|F/g) || [];
    const parseTime12hr = (t: string) => {
        const isPM = t.toUpperCase().includes('PM');
        const [hour, minute] = t.replace(/AM|PM/i, '').trim().split(':').map(Number);
        let finalHour = hour;
        if (isPM && hour < 12) finalHour += 12;
        if (!isPM && hour === 12) finalHour = 0;
        return finalHour * 60 + (minute || 0);
    };
    return { days, startMinutes: parseTime12hr(startTimeStr), endMinutes: parseTime12hr(endTimeStr) };
};

interface PlanAheadProps {
    semesterPlan: SemesterPlan;
    onRemoveCourseFromPlan: (courseId: string, semester: string) => void;
    onAddCourseToPlan: (course: Course, semester: string) => void;
    allCourses: Course[];
}

const PlanAhead: React.FC<PlanAheadProps> = ({ semesterPlan, onRemoveCourseFromPlan, onAddCourseToPlan, allCourses }) => {
    const [selectedMajorName, setSelectedMajorName] = useState<string>('None');
    const [selectedSemesterTab, setSelectedSemesterTab] = useState(Object.keys(semesterPlan)[0] || '');

    const plannedCourses = useMemo(() => Object.values(semesterPlan).flat(), [semesterPlan]);
    // FIX: Explicitly type selectedMajor to prevent type inference issues.
    const selectedMajor: Major | null = useMemo(() => MAJORS.find(m => m.name === selectedMajorName) || null, [selectedMajorName]);
    const coursesForVisualizer = useMemo(() => semesterPlan[selectedSemesterTab] || [], [semesterPlan, selectedSemesterTab]);

    const conflictsBySemester = useMemo(() => {
        const conflictsMap = new Map<string, Map<string, string[]>>(); // semester -> { courseId -> [conflictingCourseIds] }
        // FIX: Cast Object.entries result to fix type inference issues where `courses` becomes `unknown`.
        (Object.entries(semesterPlan) as [string, Course[]][]).forEach(([semester, courses]) => {
            const semesterConflicts = new Map<string, string[]>();
            for (let i = 0; i < courses.length; i++) {
                for (let j = i + 1; j < courses.length; j++) {
                    const courseA = courses[i];
                    const courseB = courses[j];
                    for (const secA of courseA.sections) {
                        const timeA = parseTime(secA.time);
                        if (timeA.days.length === 0) continue;
                        for (const secB of courseB.sections) {
                            const timeB = parseTime(secB.time);
                            if (timeB.days.length === 0) continue;

                            const daysOverlap = timeA.days.some(day => timeB.days.includes(day));
                            const timesOverlap = timeA.startMinutes < timeB.endMinutes && timeB.startMinutes < timeA.endMinutes;
                            
                            if (daysOverlap && timesOverlap) {
                                const conflictsOfA = semesterConflicts.get(courseA.id) || [];
                                if (!conflictsOfA.includes(courseB.id)) conflictsOfA.push(courseB.id);
                                semesterConflicts.set(courseA.id, conflictsOfA);

                                const conflictsOfB = semesterConflicts.get(courseB.id) || [];
                                if (!conflictsOfB.includes(courseA.id)) conflictsOfB.push(courseA.id);
                                semesterConflicts.set(courseB.id, conflictsOfB);
                            }
                        }
                    }
                }
            }
            if (semesterConflicts.size > 0) {
                conflictsMap.set(semester, semesterConflicts);
            }
        });
        return conflictsMap;
    }, [semesterPlan]);
    
    const handleExportCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Semester,Course ID,Title,Credits,Instructor,Sections\r\n";

        // FIX: Cast Object.entries result to fix type inference issues where `courses` becomes `unknown`.
        (Object.entries(semesterPlan) as [string, Course[]][]).forEach(([semester, courses]) => {
            courses.forEach(course => {
                const sections = course.sections.map(s => `${s.type} ${s.time} @ ${s.location}`).join('; ');
                const row = [semester, course.id, `"${course.title.replace(/"/g, '""')}"`, course.credits, `"${course.instructor.replace(/"/g, '""')}"`, `"${sections.replace(/"/g, '""')}"`].join(',');
                csvContent += row + "\r\n";
            });
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "lehigh_semester_plan.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-brand-text text-center">Plan Your Academic Journey</h2>
                <button onClick={handleExportCSV} className="px-4 py-2 bg-lehigh-green text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-colors duration-200">
                    Export as CSV
                </button>
            </div>


            <div className="max-w-4xl mx-auto space-y-4">
                 <div>
                    <label htmlFor="major-select" className="block text-lg font-semibold text-brand-text mb-2">Track Major Requirements:</label>
                    <select
                        id="major-select"
                        value={selectedMajorName}
                        onChange={e => setSelectedMajorName(e.target.value)}
                        className="w-full max-w-md bg-brand-surface p-2 rounded-md border border-brand-secondary focus:ring-brand-primary focus:border-brand-primary"
                    >
                        <option value="None">-- Select a Major --</option>
                        {MAJORS.map(major => <option key={major.name} value={major.name}>{major.name}</option>)}
                    </select>
                </div>
                {selectedMajor && <MajorRequirements selectedMajor={selectedMajor} plannedCourses={plannedCourses} />}
            </div>

            <div>
                <h3 className="text-2xl font-bold text-brand-text mb-4">Weekly Schedule</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {Object.keys(semesterPlan).map(semester => (
                        <button
                            key={semester}
                            onClick={() => setSelectedSemesterTab(semester)}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
                                selectedSemesterTab === semester
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-brand-surface text-brand-text hover:bg-brand-secondary'
                            }`}
                        >
                            {semester}
                        </button>
                    ))}
                </div>
                <ScheduleVisualizer courses={coursesForVisualizer} />
            </div>

            <div>
                <h3 className="text-2xl font-bold text-brand-text mb-4">Semester Breakdown</h3>
                <div className="overflow-x-auto pb-4">
                     <div className="grid grid-flow-col auto-cols-[16rem] gap-4">
                        {Object.entries(semesterPlan).map(([semester, courses]) => (
                            <SemesterColumn
                                key={semester}
                                semester={semester}
                                courses={courses}
                                onRemoveCourseFromPlan={onRemoveCourseFromPlan}
                                conflicts={conflictsBySemester.get(semester)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <Chatbot allCourses={allCourses} majors={MAJORS} />
        </div>
    );
};

export default PlanAhead;
