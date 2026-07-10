import React from 'react';
import { Link } from 'react-router-dom';
import video from '../assets/video.mp4';
import PoseScanCard from './PoseScanCard';

const Home = () => {
  return (
    <div id="home" className="relative bg-[#0B0F0E] overflow-hidden">
      {/* Ambient dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, #48C4A4 1px, transparent 1.5px)',
          backgroundSize: '44px 44px',
        }}
      />
      {/* Soft glow */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-[#48C4A4]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-[#F2A93B]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#48C4A4] border border-[#48C4A4]/30 rounded-full px-4 py-2 bg-[#48C4A4]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#48C4A4] animate-pulse" />
            Real-time pose coaching &middot; runs in your browser
          </div>

          <h1 className="font-display mt-8 text-5xl md:text-7xl font-medium leading-[0.98] text-[#F6F4EE]">
          Every rep,
          <br />
          every angle,
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#48C4A4] to-[#7FE0C4] bg-clip-text text-transparent">
              watched like a coach.
            </span>
          <span className="absolute -inset-x-2 -inset-y-1 bg-[#48C4A4]/20 blur-2xl -z-10" />
          </span>
          </h1>

          <p className="mt-7 max-w-md text-lg text-[#9CA6A1] leading-relaxed">
            FitFlow reads your form through the webcam, counts every rep, and
            nudges you back on track the moment your posture drifts &mdash;
            no wearables, no coach on retainer.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-[#48C4A4] text-[#06110D] font-display font-semibold text-lg px-8 py-4 transition-transform duration-300 hover:scale-[1.03]"
            >
              Get Started
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
            <a
              href="#pose-demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 text-[#F6F4EE] font-medium text-lg px-8 py-4 hover:border-white/35 transition-colors duration-300"
            >
              Watch it scan a workout
            </a>
          </div>

          <p className="mt-6 font-mono text-xs tracking-widest uppercase text-[#6C756F]">
            No sign-up &middot; no upload &middot; webcam stays on-device
          </p>
        </div>

        {/* Right: signature 3D scanning rig */}
        <PoseScanCard />
      </div>

      {/* Product video, kept from the original build */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-28">
        <div className="p-1 rounded-3xl bg-gradient-to-r from-[#48C4A4]/40 via-[#48C4A4]/10 to-[#F2A93B]/30">
          <div className="relative w-full h-0 pb-[56.25%] rounded-[22px] overflow-hidden bg-black">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={video}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;