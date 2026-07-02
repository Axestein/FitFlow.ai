import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import navbarlogo2 from '../assets/navbarlogo2.png';

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Features'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div
        className={`max-w-7xl mx-auto rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0F0E]/90 border-white/10 backdrop-blur-xl shadow-lg shadow-black/30'
            : 'bg-[#0B0F0E]/60 border-white/5 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <a href="/" className="flex items-center gap-2 group">
            <img
              src={navbarlogo2}
              className="h-9 rounded-lg transition-transform duration-300 group-hover:scale-105"
              alt="FitFlow"
            />
            <span className="font-display font-semibold text-[#F6F4EE] tracking-tight hidden sm:block">
              FitFlow
            </span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`} />
            <span className={`hamburger-line ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`hamburger-line ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`} />
          </button>

          <div
            className={`lg:flex lg:items-center lg:gap-2 ${
              isOpen
                ? 'block absolute top-full left-0 right-0 mt-2 mx-4 bg-[#0B0F0E]/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg'
                : 'hidden'
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:items-center gap-1 p-4 lg:p-0">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                    className="block px-4 py-2 text-[#C9D0CC] rounded-lg hover:bg-white/5 hover:text-[#48C4A4] transition-all duration-300 font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="lg:ml-3 mt-2 lg:mt-0">
                <Link
                  to="/dashboard"
                  className="block text-center px-5 py-2.5 rounded-full bg-[#48C4A4] text-[#06110D] font-semibold hover:scale-[1.03] transition-transform duration-300"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .hamburger-line {
          position: absolute;
          width: 18px;
          height: 2px;
          background: #C9D0CC;
          transition: all 0.3s ease;
        }
      `}</style>
    </nav>
  );
};

export default Navbar1;