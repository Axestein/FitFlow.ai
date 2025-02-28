import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-white text-white pt-20 pb-10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column */}
          <div className="backdrop-blur-lg bg-black/5 p-6 rounded-2xl border border-black/5">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              FitFlow
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Achieve your fitness goals with our AI-powered platform. Track your workouts, compete with friends, and access expert guidance to stay on top of your health and fitness journey.
            </p>
            <div className="flex gap-6 text-2xl">
              <a href="#" className="transform hover:scale-110 transition-all duration-300 text-gray-600 hover:text-blue-400">
                <FaFacebook />
              </a>
              <a href="#" className="transform hover:scale-110 transition-all duration-300 text-gray-600 hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="#" className="transform hover:scale-110 transition-all duration-300 text-gray-600 hover:text-blue-400">
                <FaLinkedin />
              </a>
              <a href="#" className="transform hover:scale-110 transition-all duration-300 text-gray-600 hover:text-blue-400">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Middle Column */}
          <div className="backdrop-blur-lg bg-black/5 p-6 rounded-2xl border border-black/5">
            <h4 className="text-xl font-bold text-blue-400 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Features', 'Community', 'Tutorials', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="backdrop-blur-lg bg-black/5 p-6 rounded-2xl border border-black/5">
            <h4 className="text-xl font-bold text-blue-400 mb-6">Contact Us</h4>
            <a
              href="mailto:support@fitflow.com"
              className="text-gray-600 hover:text-blue-400 transition-colors duration-300 block mb-6"
            >
              support@fitflow.com
            </a>
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>
            <p className="text-gray-600">© 2025 FitFlow. All Rights Reserved.</p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;
