import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Trophy, Calendar, Users, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExerciseDropdownOpen, setIsExerciseDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isExerciseDropdownOpen) setIsExerciseDropdownOpen(false);
  };

  const toggleExerciseDropdown = () => {
    setIsExerciseDropdownOpen(!isExerciseDropdownOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
      setIsExerciseDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Prevent propagation for dropdown toggles
  const handleDropdownClick = (e, callback) => {
    e.stopPropagation();
    callback();
  };

  return (
    <nav className={`${scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-gradient-to-r from-gray-900 to-black'} text-white w-full py-3 px-6 fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-extrabold tracking-tight group-hover:scale-105 transition-transform">
                Fit<span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Flow</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/dashboard" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Dashboard
            </Link>
            
            <Link to="/leaderboard" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Link>

            {/* Dropdown for Plan Features */}
            <div className="relative">
              <button 
                onClick={(e) => handleDropdownClick(e, toggleDropdown)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isDropdownOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Plan <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 text-white rounded-lg shadow-lg py-1 z-10 overflow-hidden">
                  <Link to="/kanbanflow" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    Plan Your Day
                  </Link>
                  <Link to="/dietplan" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    Diet Plan
                  </Link>
                  <Link to="/personalized-exercise" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                    Personalized Exercise
                  </Link>
                </div>
              )}
            </div>

            {/* Exercise Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => handleDropdownClick(e, toggleExerciseDropdown)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isExerciseDropdownOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Exercise <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isExerciseDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isExerciseDropdownOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-gray-800 border border-gray-700 text-white rounded-lg shadow-lg py-1 grid grid-cols-3 gap-4 p-4 z-10">
                  {/* Upper Body Exercises */}
                  <div>
                    <h4 className="font-semibold mb-2 text-emerald-300">Upper Body</h4>
                    <Link to="/bicepcurl" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Bicep Curl</Link>
                    <Link to="/frontraises" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Front Raises</Link>
                    <Link to="/shoulderpress" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Shoulder Press</Link>
                    <Link to="/pullup" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Pull Up</Link>
                    <Link to="/pushup" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Push Up</Link>
                  </div>

                  {/* Lower Body Exercises */}
                  <div>
                    <h4 className="font-semibold mb-2 text-cyan-300">Lower Body</h4>
                    <Link to="/lunges" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Lunges</Link>
                    <Link to="/squat" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Squat</Link>
                    <Link to="/highknees" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">High Knees</Link>
                    <Link to="/kneeraises" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Knee Raises</Link>
                  </div>

                  {/* Desk Exercises */}
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-300">Desk Exercises</h4>
                    <Link to="/deskcurls" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Desk Curls</Link>
                    <Link to="/hand" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">Handraises</Link>
                    <Link to="/kneeraises" className="block px-3 py-1.5 text-sm hover:bg-gray-700 rounded-md">legraises</Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/profile" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link to="/event" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
              <Calendar className="w-4 h-4" />
              Event
            </Link>
            <Link to="/community" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
              <Users className="w-4 h-4" />
              Community
            </Link>
          </div>

          {/* Logout Button (Desktop) */}
          <div className="hidden md:block">
            <button
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-medium py-2 px-4 rounded-full hover:shadow-lg hover:from-emerald-300 hover:to-cyan-300 transition-all duration-300 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
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
          <div className="md:hidden bg-gradient-to-b from-indigo-800 to-indigo-900 mt-4 rounded-lg p-4 shadow-inner">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Dashboard
              </Link>
              <Link 
                to="/leaderboard" 
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className="w-5 h-5" />
                Leaderboard
              </Link>
              
              {/* Plan section mobile */}
              <div className="border-t border-indigo-600 my-2 pt-2">
                <h3 className="text-emerald-300 font-medium px-3 mb-1">Plan</h3>
                <Link 
                  to="/kanbanflow" 
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors ml-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  Plan Your Day
                </Link>
                <Link 
                  to="/dietplan" 
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors ml-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  Diet Plan
                </Link>
                <Link 
                  to="/personalized-exercise" 
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors ml-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                  Personalized Exercise
                </Link>
              </div>
              
              {/* Exercise section mobile */}
              <div className="border-t border-indigo-600 my-2 pt-2">
                <h3 className="text-cyan-300 font-medium px-3 mb-1">Exercise</h3>
                <Link 
                  to="/exercise" 
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors ml-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  All Exercises
                </Link>
              </div>
              
              <div className="border-t border-indigo-600 my-2 pt-2">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <Link 
                  to="/event" 
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5" />
                  Event
                </Link>
                <Link 
                  to="/community" 
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="w-5 h-5" />
                  Community
                </Link>
              </div>
              
              <button
                className="mt-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-medium py-2.5 px-4 rounded-md hover:opacity-90 transition-colors shadow-md w-full flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
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