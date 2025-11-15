
import React from 'react';
import { View } from '../App';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  userEmail: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, userEmail, onLogout }) => {
  const navItemClasses = "px-4 py-2 rounded-md text-sm sm:text-base font-semibold transition-colors duration-300";
  const activeClasses = "bg-lehigh-gold text-lehigh-dark-brown";
  const inactiveClasses = "bg-lehigh-brown hover:bg-lehigh-light-gold hover:text-lehigh-dark-brown";

  return (
    <header className="bg-lehigh-dark-brown sticky top-0 z-10 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center py-4 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <img src="https://image2url.com/images/1763230135301-08ad8a08-f02f-4835-92a9-14af60f15d53.png" alt="Lehigh University Logo" className="h-10 sm:h-12 w-auto" />
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Lehigh Course Planner</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <nav className="w-full sm:w-auto flex justify-center space-x-2 sm:space-x-4 bg-lehigh-dark-brown p-1 rounded-lg">
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
              onClick={() => setCurrentView('evaluate')}
              className={`${navItemClasses} ${currentView === 'evaluate' ? activeClasses : inactiveClasses}`}
            >
              Evaluate
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            {userEmail && <span className="text-sm text-lehigh-light-gold hidden md:block">{userEmail}</span>}
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-lehigh-red text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors duration-200"
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
