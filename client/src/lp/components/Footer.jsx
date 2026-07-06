import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const SOCIALS = [
  { Icon: FaFacebook, href: "#", label: "Facebook" },
  { Icon: FaTwitter, href: "#", label: "Twitter" },
  { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
];

const QUICK_LINKS = [
  "Home",
  "Features",
  "Community",
  "Tutorials",
  "Contact",
];

const Footer = () => {
  return (
    <footer className="relative bg-[#0B0F0E] text-[#F6F4EE] pt-24 pb-10 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #48C4A4 1px, transparent 1.5px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Glow Effects */}
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-[#48C4A4]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[26rem] h-[26rem] bg-[#F2A93B]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Brand */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <h3 className="font-display text-3xl font-medium text-[#F6F4EE] mb-4">
              Fit<span className="text-[#48C4A4]">Flow</span>
            </h3>

            <p className="text-[#9CA6A1] leading-relaxed mb-7">
              Real-time pose coaching that runs in your browser. Track every
              rep, catch every form break, and train like someone's watching —
              because something is.
            </p>

            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-[#9CA6A1] hover:text-[#48C4A4] hover:border-[#48C4A4]/40 transition-colors duration-300"
                >
                  <social.Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#48C4A4] mb-6">
              Quick Links
            </h4>

            <ul className="space-y-3.5">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="group flex items-center text-[#9CA6A1] hover:text-[#F6F4EE] transition-colors duration-300"
                  >
                    <span className="w-0 group-hover:w-3.5 h-px bg-[#48C4A4] mr-0 group-hover:mr-2.5 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#48C4A4] mb-6">
              Contact Us
            </h4>

            <a
              href="mailto:support@fitflow.com"
              className="text-[#F6F4EE] hover:text-[#48C4A4] transition-colors duration-300 block mb-5"
            >
              support@fitflow.com
            </a>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

            <p className="font-mono text-[11px] tracking-widest uppercase text-[#6C756F]">
              No sign-up · no upload · webcam stays on-device
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-[#6C756F]">
            &copy; {new Date().getFullYear()} FitFlow. All rights reserved.
          </p>

          <div className="flex gap-6 font-mono text-[11px] tracking-widest uppercase text-[#6C756F]">
            <a
              href="/privacy"
              className="hover:text-[#48C4A4] transition-colors duration-300"
            >
              Privacy
            </a>

            <a
              href="/terms"
              className="hover:text-[#48C4A4] transition-colors duration-300"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;