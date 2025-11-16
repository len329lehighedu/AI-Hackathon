
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CourseCatalog from './components/CourseCatalog';
import PlanAhead from './components/PlanAhead';
import Evaluate from './components/Evaluate';
import Login from './components/Login';
import LiveChat from './components/LiveChat';
import { Course, SemesterPlan, ReviewRatings } from './types';
import { ALL_COURSES } from './constants';

export type View = 'catalog' | 'planner' | 'feedback';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
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

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setIsAuthenticated(false);
    setCurrentView('catalog'); // Reset to default view on logout
  };

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
  
  const handleAddReview = (courseId: string, review: { ratings: ReviewRatings; comment: string; author: string; date: string }) => {
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

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="bg-brand-bg min-h-screen font-sans text-brand-text">
      <Header currentView={currentView} setCurrentView={setCurrentView} userEmail={userEmail} onLogout={handleLogout} />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentView === 'catalog' && <CourseCatalog courses={courses} onAddCourseToPlan={handleAddCourseToPlan} semesterPlan={semesterPlan} onAddReview={handleAddReview} />}
        {currentView === 'planner' && <PlanAhead semesterPlan={semesterPlan} onRemoveCourseFromPlan={handleRemoveCourseFromPlan} onAddCourseToPlan={handleAddCourseToPlan} allCourses={courses} />}
        {currentView === 'feedback' && <Evaluate courses={courses} onAddReview={handleAddReview} />}
      </main>
      <LiveChat />
    </div>
  );
};

export default App;