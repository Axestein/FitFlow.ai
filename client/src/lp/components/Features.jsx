import React from 'react';
import { FaClipboardList, FaPen, FaRoad, FaRobot } from 'react-icons/fa';

const features = [
  {
    Icon: FaClipboardList,
    name: "Prepare for Interview & Get AI Analytics",
    description: "Receive personalized AI insights and analytics to improve your interview performance.",
    href: "/",
    cta: "Learn more",
    background: "/src/assets/interview.png",
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    Icon: FaPen,
    name: "Create & Enhance Your Resume",
    description: "Build a professional resume or enhance your existing one with smart suggestions.",
    href: "/",
    cta: "Learn more",
    background: "/src/assets/resume.png",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: FaRobot,
    name: "AI-powered Personalized Doubt Solving",
    description: "Get personalized AI-driven answers to your technical queries at any time.",
    href: "/",
    cta: "Learn more",
    background: "/src/assets/esmoai.png",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: FaRoad,
    name: "Roadmaps, Resources & Communities",
    description: "Access curated roadmaps, resources, and events to stay updated in the tech industry.",
    href: "/",
    cta: "Learn more",
    background: "/src/assets/roadmap.png",
    className: "lg:col-span-2 lg:row-span-1",
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full py-32 bg-white text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at center, black 1px, transparent 2px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Key Features to Jumpstart Your Tech Career
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className={`relative group ${feature.className} transform transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-700 p-8 border border-gray-700">
                {/* Background Overlay */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  <img
                    src={feature.background}
                    alt=""
                    className="h-full w-full object-cover filter blur-sm"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                    <feature.Icon className="h-6 w-6 text-blue-400" />
                  </div>

                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">
                    {feature.name}
                  </h3>

                  <p className="mb-8 text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  <a
                    href={feature.href}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    <span>{feature.cta}</span>
                    <svg
                      className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/50 transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
