import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-black text-white w-full py-4 px-6 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-extrabold tracking-tight">Fit<span className="text-emerald-300">Flow</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">Dashboard</Link>
            <Link to="/leaderboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">Leaderboard</Link>
            
            {/* Dropdown for Plan Features */}
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Plan <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
                  <Link to="/kanbanflow" className="block px-4 py-2 text-sm hover:bg-gray-100">Plan Your Day</Link>
                  <Link to="/dietplan" className="block px-4 py-2 text-sm hover:bg-gray-100">Diet Plan</Link>
                  <Link to="/excercise" className="block px-4 py-2 text-sm hover:bg-gray-100">Exercise</Link>
                  <Link to="/personalized-exercise" className="block px-4 py-2 text-sm hover:bg-gray-100"> Personalized Exercise</Link>
                </div>
              )}
            </div>
            
            <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">Profile</Link>
            <Link to="/event" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">Event</Link>
            <Link to="/community" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">Community</Link>
          </div>
          
          {/* Logout Button (Desktop) */}
          <div className="hidden md:block">
            <button
              className="bg-white text-indigo-600 font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition-colors shadow-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-700 mt-4 rounded-lg p-4 shadow-inner">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/dashboard" 
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/leaderboard" 
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link 
                to="/kanbanflow" 
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Plan Your Day
              </Link>
              <Link 
                to="/dietplan" 
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Diet Plan
              </Link>
              <Link 
                to="/excercise" 
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Exercise
              </Link>
              <Link 
                to="/personalized-excercise" 
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Personalized Exercise
              </Link>
              <Link 
                to="/profile" 
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                className="mt-2 bg-white text-cyan-400 font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition-colors shadow-md w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;