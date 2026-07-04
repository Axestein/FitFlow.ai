import React from 'react';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import sameer0101 from '../assets/sameer0101.jpg';
import aditya0101 from '../assets/aditya0101.jpg';
import atharv from '../assets/atharv.jpeg';
import arhaan0101 from '../assets/arhaan0101.jpg';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Sameer',
      image: sameer0101,
      email: 'hisameer0026@gmail.com',
      linkedin: 'https://www.linkedin.com/in/sameer-yadav-214a01282',
      twitter: 'https://x.com/ysameer001?s=09',
    },
    {
      name: 'Aditya',
      image: aditya0101,
      email: 'adityandmb@gmail.com',
      linkedin: 'https://www.linkedin.com/in/adityakumarsingh2005',
      twitter: 'https://x.com/adityasingh7211',
    },
    {
      name: 'Arhaan',
      image: arhaan0101,
      email: 'siddiqueearhaan@gmail.com',
      linkedin: 'https://www.linkedin.com/in/arhaansiddiquee',
      twitter: 'https://x.com/ArhaanSiddique0',
    },
    {
      name: 'Atharv',
      image: atharv,
      email: 'arkadyutichaudhuri@gmail.com',
      linkedin: 'https://www.linkedin.com/in/arkadyuti-chaudhuri',
      twitter: 'https://x.com/CArkadyuti',
    },
  ];

  return (
    <div id="aboutus" className="relative bg-[#0B0F0E] py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #48C4A4 1px, transparent 1.5px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="mb-24 max-w-3xl">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#48C4A4]">
            About FitFlow
          </span>
          <h2 className="font-display mt-4 text-4xl md:text-5xl font-medium text-[#F6F4EE] leading-tight">
            Built for people who want to train hard without booking a coach.
          </h2>
          <p className="mt-6 text-[#9CA6A1] leading-relaxed text-lg">
            FitFlow pairs computer-vision pose tracking with a plain-language
            coach that fits into a packed schedule &mdash; personalized
            routines, live form correction, and a community that keeps you
            honest, all in the browser.
          </p>
        </div>

        {/* <div className="mb-10">
          <h3 className="font-display text-2xl font-medium text-[#F6F4EE] mb-10">
            Meet the team
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-transform duration-300 hover:-translate-y-1 hover:border-[#48C4A4]/30"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-24 h-24 object-cover mx-auto border border-white/10"
                />
                <h4 className="mt-5 text-lg font-display font-medium text-[#F6F4EE]">
                  {member.name}
                </h4>
                <div className="mt-4 flex justify-center gap-4 text-[#6C756F]">
                  <a href={`mailto:${member.email}`} className="hover:text-[#48C4A4] transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                  <a href={member.linkedin} className="hover:text-[#48C4A4] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={member.twitter} className="hover:text-[#48C4A4] transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AboutUs;