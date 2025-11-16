
import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import ReviewsModal from './modals/ReviewsModal';

interface EvaluationCourseCardProps {
    course: Course;
    onWriteReview: () => void;
}

const EvaluationCourseCard: React.FC<EvaluationCourseCardProps> = ({ course, onWriteReview }) => (
    <div className="bg-brand-surface border border-brand-secondary p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4 select-none">
        <div>
            <h3 className="font-bold text-brand-text">{course.id}: {course.title}</h3>
            <p className="text-sm text-brand-accent">Instructor: {course.instructor}</p>
        </div>
        <button 
            onClick={onWriteReview} 
            className="flex-shrink-0 px-4 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-opacity-90 transition-colors"
        >
            Write a Review
        </button>
    </div>
);

interface EvaluateProps {
    courses: Course[];
    onAddReview: (courseId: string, review: { rating: number; comment: string; author: string; date: string }) => void;
}

const Evaluate: React.FC<EvaluateProps> = ({ courses, onAddReview }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const filteredCourses = useMemo(() => {
        if (searchTerm.trim().length < 2) return [];
        const lowercasedTerm = searchTerm.toLowerCase();
        return courses.filter(c =>
            c.id?.toLowerCase().includes(lowercasedTerm) ||
            c.title?.toLowerCase().includes(lowercasedTerm) ||
            c.instructor?.toLowerCase().includes(lowercasedTerm)
        ).slice(0, 10); // Limit results for performance
    }, [courses, searchTerm]);

    return (
        <div>
            <h2 className="text-3xl font-bold text-brand-text mb-6 text-center">Provide Feedback on a Course</h2>
            <div className="max-w-3xl mx-auto">
                <p className="text-center text-brand-accent mb-4">Find a course you've taken to share your experience with other students.</p>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by course ID, title, or instructor..."
                    className="w-full bg-brand-surface p-3 rounded-md border border-brand-secondary focus:ring-1 focus:ring-brand-primary focus:border-brand-primary text-lg mb-6"
                    aria-label="Search for a course or professor to review"
                />
                <div className="space-y-4">
                    {filteredCourses.map(course => (
                        <EvaluationCourseCard key={course.id} course={course} onWriteReview={() => setSelectedCourse(course)} />
                    ))}
                    {searchTerm.length > 1 && filteredCourses.length === 0 && <p className="text-center text-brand-accent bg-brand-secondary/50 p-4 rounded-lg">No matching courses found.</p>}
                </div>
            </div>
            {selectedCourse && (
                <ReviewsModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                    onAddReview={onAddReview}
                    startWithAddReview={true}
                />
            )}
        </div>
    );
};

export default Evaluate;