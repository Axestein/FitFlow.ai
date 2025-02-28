import React, { useState, useEffect } from 'react';
import navbarlogo2 from "../assets/navbarlogo2.png";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-2 ${scrolled ? 'mt-0' : 'mt-4'}`}>
      <div className={`max-w-7xl mx-auto rounded-2xl backdrop-blur-xl border border-black transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 shadow-lg shadow-gray-200' 
          : 'bg-white/80'
      }`}>
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img
              src={navbarlogo2}
              className="h-12 transform transition-transform rounded-xl duration-300 group-hover:scale-105"
              alt="Logo"
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
          >
            <span className={`hamburger-line ${isOpen ? 'rotate-45 translate-y-1.5 bg-gray-800' : 'bg-gray-600'}`}></span>
            <span className={`hamburger-line ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`hamburger-line ${isOpen ? '-rotate-45 -translate-y-1.5 bg-gray-800' : 'bg-gray-600'}`}></span>
          </button>

          {/* Desktop & Mobile Menu */}
          <div className={`lg:flex ${
            isOpen 
              ? 'block absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl border-gray-200 border shadow-lg' 
              : 'hidden'
          }`}>
            <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-1 p-4 lg:p-0">
              {['Home', 'Features', 'USP', 'About Us'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                    className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-all duration-300 font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hamburger-line {
          @apply absolute w-5 h-0.5 bg-gray-600 transform transition-all duration-300;
        }
        .hamburger-line:nth-child(1) {
          @apply -translate-y-1.5;
        }
        .hamburger-line:nth-child(3) {
          @apply translate-y-1.5;
        }
      `}</style>
    </nav>
  );
};

export default Navbar1;