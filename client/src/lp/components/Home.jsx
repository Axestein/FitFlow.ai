import React from 'react';
import video from "../assets/video.mp4"; // You can use a fitness-related video here

const LandingPage = () => {
  return (
    <div id="home" className="relative min-h-screen bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `radial-gradient(circle at center, black 1px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative w-full pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-7xl font-bold text-center mb-8 leading-tight">
            <span className="bg-gray-700 bg-clip-text text-transparent">
              Achieve Your 
            </span>
            <div className="inline-flex flex-wrap items-center gap-2 mx-2">
              <span className="relative">
                <span className="relative inline-block transform transition-transform hover:scale-105 duration-300">
                  <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 relative inline-block">
                    <span className="relative text-white px-2">Fitness Goals</span>
                  </span>
                </span>
              </span>
            </div>
          </h1>

          {/* Subheading with Gradient Border */}
          <p className="text-xl text-center font-medium text-gray-500 leading-relaxed">
            Balancing fitness with a busy schedule is challenging, but we make it easy and fun! 
            <br className="hidden md:block" />
            Our AI-powered platform helps you track physical activities in real-time, offers engaging multiplayer challenges.
          </p>

          {/* Get Started Button */}
          <div className="mt-8 text-center">
            <a 
              href="/dashboard" 
              className="inline-block py-3 px-8 mt-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl hover:scale-105 transition-transform duration-300">
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="w-full px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Video Container with Gradient Border */}
          <div className="p-1 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="relative w-full h-0 pb-[56.25%] rounded-3xl overflow-hidden bg-gray-900">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                src={video}
                type="video/mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl" />
    </div>
  );
};

export default LandingPage;
