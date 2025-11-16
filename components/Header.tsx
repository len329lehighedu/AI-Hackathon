
import React from 'react';
import { View } from '../App';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  userEmail: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, userEmail, onLogout }) => {
  const navItemClasses = "px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-300";
  const activeClasses = "bg-brand-primary/20 text-brand-primary";
  const inactiveClasses = "text-brand-accent hover:text-brand-primary hover:bg-brand-primary/10";

  return (
    <header className="bg-brand-bg/80 backdrop-blur-sm sticky top-0 z-10 border-b border-brand-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center py-3 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <img src="https://image2url.com/images/1763230135301-08ad8a08-f02f-4835-92a9-14af60f15d53.png" alt="Lehigh University Logo" className="h-10 sm:h-12 w-auto" />
          <h1 className="text-xl sm:text-2xl font-bold text-brand-text tracking-tight">Lehigh Course Planner</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
          <nav className="w-full sm:w-auto flex justify-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setCurrentView('catalog')}
              className={`${navItemClasses} ${currentView === 'catalog' ? activeClasses : inactiveClasses}`}
            >
              Course Catalog
            </button>
            <button
              onClick={() => setCurrentView('planner')}
              className={`${navItemClasses} ${currentView === 'planner' ? activeClasses : inactiveClasses}`}
            >
              Plan Ahead
            </button>
            <button
              onClick={() => setCurrentView('feedback')}
              className={`${navItemClasses} ${currentView === 'feedback' ? activeClasses : inactiveClasses}`}
            >
              Feedback
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            {userEmail && <span className="text-sm text-brand-accent hidden md:block">{userEmail}</span>}
            <button
              onClick={onLogout}
              className="px-3 py-2 bg-lehigh-red text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;