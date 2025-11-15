
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CourseCatalog from './components/CourseCatalog';
import PlanAhead from './components/PlanAhead';
import Evaluate from './components/Evaluate';
import { Course, SemesterPlan } from './types';
import { ALL_COURSES } from './constants';

export type View = 'catalog' | 'planner' | 'evaluate';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [courses, setCourses] = useState<Course[]>(ALL_COURSES);
  const [semesterPlan, setSemesterPlan] = useState<SemesterPlan>({
    'Fall 2025': [],
    'Spring 2026': [],
    'Fall 2026': [],
    'Spring 2027': [],
    'Fall 2027': [],
    'Spring 2028': [],
    'Fall 2028': [],
    'Spring 2029': [],
  });

  const handleAddCourseToPlan = useCallback((course: Course, semester: string) => {
    setSemesterPlan(prevPlan => {
      const newPlan = { ...prevPlan };
      for (const sem in newPlan) {
        newPlan[sem] = newPlan[sem].filter(c => c.id !== course.id);
      }
      if (newPlan[semester]) {
        newPlan[semester] = [...newPlan[semester], course];
      }
      return newPlan;
    });
  }, []);

  const handleRemoveCourseFromPlan = useCallback((courseId: string, semester: string) => {
    setSemesterPlan(prevPlan => ({
      ...prevPlan,
      [semester]: prevPlan[semester].filter(c => c.id !== courseId)
    }));
  }, []);
  
  const handleAddReview = (courseId: string, review: { rating: number; comment: string; author: string; date: string }) => {
    setCourses(prevCourses => {
      return prevCourses.map(course => {
        if (course.id === courseId) {
          const newReview = { id: Date.now(), ...review };
          return { ...course, reviews: [newReview, ...course.reviews] };
        }
        return course;
      });
    });
  };

  return (
    <div className="bg-lehigh-dark-brown min-h-screen font-sans text-white">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentView === 'catalog' && <CourseCatalog courses={courses} onAddCourseToPlan={handleAddCourseToPlan} semesterPlan={semesterPlan} onAddReview={handleAddReview} />}
        {currentView === 'planner' && <PlanAhead semesterPlan={semesterPlan} onRemoveCourseFromPlan={handleRemoveCourseFromPlan} onAddCourseToPlan={handleAddCourseToPlan} allCourses={courses} />}
        {currentView === 'evaluate' && <Evaluate courses={courses} onAddReview={handleAddReview} />}
      </main>
    </div>
  );
};

export default App;
