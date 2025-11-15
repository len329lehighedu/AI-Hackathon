
import React from 'react';
import { View } from '../App';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItemClasses = "px-4 py-2 rounded-md text-sm sm:text-base font-semibold transition-colors duration-300";
  const activeClasses = "bg-lehigh-gold text-lehigh-dark-brown";
  const inactiveClasses = "bg-lehigh-brown hover:bg-lehigh-light-gold hover:text-lehigh-dark-brown";

  return (
    <header className="bg-lehigh-dark-brown sticky top-0 z-10 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <img src="https://storage.googleapis.com/aistudio-v2-a-prod-gcs-media/694966955006/instances/7279148766128046080/image.png" alt="Lehigh University Logo" className="h-12 w-auto" />
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Lehigh Course Planner</h1>
        </div>
        <nav className="flex space-x-2 sm:space-x-4 bg-lehigh-dark-brown p-1 rounded-lg">
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
        </nav>
      </div>
    </header>
  );
};

export default Header;