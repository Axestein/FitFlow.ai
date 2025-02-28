import React from 'react';
import { FiMail, FiLinkedin, FiTwitter } from 'react-icons/fi';
import sameer0101 from '../Assets/sameer0101.jpg';
import aditya0101 from '../Assets/aditya0101.jpg';
import atharv from '../Assets/atharv.jpeg';
import arhaan0101 from '../Assets/arhaan0101.jpg';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sameer",
      image: sameer0101,
      email: "hisameer0026@gmail.com",
      linkedin: "https://www.linkedin.com/in/sameer-yadav-214a01282",
      twitter: "https://x.com/ysameer001?s=09"
    },
    {
      name: "Aditya",
      image: aditya0101,
      email: "adityandmb@gmail.com",
      linkedin: "https://www.linkedin.com/in/adityakumarsingh2005",
      twitter: "https://x.com/adityasingh7211"
    },
    {
      name: "Arhaan",
      image: arhaan0101,
      email: "siddiqueearhaan@gmail.com",
      linkedin: "https://www.linkedin.com/in/arhaansiddiquee",
      twitter: "https://x.com/ArhaanSiddique0"
    },
    {
      name: "Atharv",
      image: atharv,
      email: "arkadyutichaudhuri@gmail.com",
      linkedin: "https://www.linkedin.com/in/arkadyuti-chaudhuri",
      twitter: "https://x.com/CArkadyuti"
    },
  ];

  return (
    <div id="about%20us" className="relative bg-white text-gray-800 py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `radial-gradient(circle at center, black 1px, transparent 2px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* About Section */}
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            About FitFlow
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-12"></div>
          
          <div className="max-w-4xl mx-auto backdrop-blur-lg bg-black/5 p-8 rounded-2xl border border-black/5">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">What we provide</h3>
            <p className="mb-6 text-gray-600 leading-relaxed">
              FitFlow is an innovative platform designed to help individuals of all fitness levels achieve their health and wellness goals. Whether you're just beginning your fitness journey or an experienced athlete, FitFlow offers personalized workout plans, AI-powered insights, and expert coaching to help you stay on track and reach new heights.
            </p>
            <p className="text-gray-600 leading-relaxed hidden md:block">
              But we don't stop there. FitFlow goes beyond fitness tracking—our platform offers smart workout analysis, performance optimization, and a supportive community to keep you motivated. Stay engaged with live fitness challenges, expert nutrition tips, and join our growing network of fitness enthusiasts to share progress and tips along the way.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-16">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative p-1 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-white shadow-xl p-6 rounded-2xl h-full border border-gray-200">
                  <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative rounded-full w-32 h-32 object-cover mx-auto border-2 border-white/10"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{member.name}</h3>
                  
                  <div className="flex justify-center space-x-4">
                    <a href={`mailto:${member.email}`} className="transform hover:scale-110 transition-transform duration-300">
                      <FiMail className="text-3xl text-blue-500 hover:text-blue-400" />
                    </a>
                    <a href={member.linkedin} className="transform hover:scale-110 transition-transform duration-300">
                      <FiLinkedin className="text-3xl text-blue-500 hover:text-blue-400" />
                    </a>
                    <a href={member.twitter} className="transform hover:scale-110 transition-transform duration-300">
                      <FiTwitter className="text-3xl text-blue-500 hover:text-blue-400" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
