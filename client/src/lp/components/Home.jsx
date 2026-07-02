import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import video from '../assets/video.mp4';

const Home = () => {
  const [reps, setReps] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setReps((r) => (r >= 8 ? 1 : r + 1));
    }, 1400);
    return () => clearInterval(id);
  }, []);

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
            Train like
            <br />
            someone&rsquo;s watching.
            <br />
            <span className="text-[#48C4A4]">Because something is.</span>
          </h1>

          <p className="mt-7 max-w-md text-lg text-[#9CA6A1] leading-relaxed">
            FitFlow reads your form through the webcam, counts every rep, and
            nudges you back on track the moment your posture drifts &mdash;
            no wearables, no coach on retainer.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
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
              Watch a rep get tracked
            </a>
          </div>

          <p className="mt-6 font-mono text-xs tracking-widest uppercase text-[#6C756F]">
            No wearables &middot; No coach &middot; no upload &middot; webcam stays on-device
          </p>
        </div>

        {/* Right: signature pose-tracking card */}
        <div
          id="pose-demo"
          className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#123027] to-[#0B0F0E] p-6 shadow-2xl shadow-black/40"
        >
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase text-[#9CA6A1]">
            <span>Live pose tracking</span>
            <span className="inline-flex items-center gap-1.5 text-[#48C4A4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#48C4A4] animate-pulse" />
              Analyzing
            </span>
          </div>

          <div className="relative mt-6 h-72">
            <svg
              viewBox="0 0 220 260"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* static bones */}
              <line x1="110" y1="40" x2="110" y2="100" stroke="#2E4A41" strokeWidth="3" />
              <line x1="80" y1="70" x2="140" y2="70" stroke="#2E4A41" strokeWidth="3" />
              <line x1="80" y1="70" x2="60" y2="110" stroke="#2E4A41" strokeWidth="3" />
              <line x1="140" y1="70" x2="160" y2="110" stroke="#2E4A41" strokeWidth="3" />

              {/* animated lower body: hips/knees/ankles */}
              <g className="squat-cycle">
                <line x1="110" y1="100" x2="95" y2="160" stroke="#48C4A4" strokeWidth="3" />
                <line x1="110" y1="100" x2="125" y2="160" stroke="#48C4A4" strokeWidth="3" />
                <line x1="95" y1="160" x2="90" y2="220" stroke="#48C4A4" strokeWidth="3" />
                <line x1="125" y1="160" x2="130" y2="220" stroke="#48C4A4" strokeWidth="3" />
                <circle cx="110" cy="100" r="5" fill="#F6F4EE" />
                <circle cx="95" cy="160" r="5" fill="#48C4A4" />
                <circle cx="125" cy="160" r="5" fill="#48C4A4" />
                <circle cx="90" cy="220" r="4" fill="#F6F4EE" />
                <circle cx="130" cy="220" r="4" fill="#F6F4EE" />
              </g>

              {/* head + torso */}
              <circle cx="110" cy="24" r="14" fill="#F6F4EE" />
            </svg>

            <span className="absolute top-4 right-2 font-mono text-[10px] bg-[#48C4A4]/15 text-[#48C4A4] px-2 py-1 rounded-full">
              knee 97%
            </span>
            <span className="absolute bottom-10 left-2 font-mono text-[10px] bg-[#48C4A4]/15 text-[#48C4A4] px-2 py-1 rounded-full">
              hip 94%
            </span>
          </div>

          <div className="mt-2 flex items-end justify-between border-t border-white/10 pt-5">
            <div>
              <div className="font-display text-6xl font-semibold text-[#F6F4EE] tabular-nums">
                {String(reps).padStart(2, '0')}
              </div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#6C756F] mt-1">
                Reps &middot; Set 1
              </div>
            </div>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#6C756F] text-right leading-relaxed">
              Bodyweight Squat
              <br />
              Form: Good
            </div>
          </div>
        </div>
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

      <style>{`
        @keyframes squat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(14px); }
        }
        .squat-cycle {
          animation: squat 1.4s ease-in-out infinite;
          transform-origin: 110px 100px;
        }
        @media (prefers-reduced-motion: reduce) {
          .squat-cycle { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default Home;