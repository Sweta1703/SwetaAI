import { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const CONTACT_LINKS = [
  {
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    key: 'github',
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
    key: 'linkedin',
  },
  {
    label: 'Portfolio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    key: 'portfolio',
  },
];

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Contact({ profile }) {
  const [ref, visible] = useIntersectionObserver();
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const linkMap = {
    github: profile.github,
    linkedin: profile.linkedin,
    portfolio: profile.portfolio,
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={ref}
          className={`bg-[#111118] border border-white/[0.07] rounded-2xl p-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <p className="text-[11px] font-bold tracking-[0.15em] text-teal-400 mb-3">CONTACT</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-1px] text-white mb-3">
            Let's build something together
          </h2>
          <p className="text-[#8888a8] text-[15px] mb-8 max-w-xl">
            Recruiting for a role or have an opportunity? Reach out — Sweta would love to hear from you.
          </p>

          {/* Contact link grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* Regular external links */}
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.key}
                href={linkMap[link.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 rounded-xl border border-white/[0.07] bg-white/[0.02] text-[#8888a8] hover:border-cyan-400/30 hover:text-white hover:bg-cyan-400/[0.04] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">{link.icon}</span>
                  <span className="text-[15px] font-semibold">{link.label}</span>
                </div>
                <ExternalIcon />
              </a>
            ))}

            {/* Email card — split: left opens mail client, right copies to clipboard */}
            <div className="flex rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-cyan-400/30 transition-all duration-200 group">
              {/* Left portion: opens mail client */}
              <a
                href={`mailto:${profile.email}`}
                className="flex flex-1 items-center gap-3 px-5 py-4 text-[#8888a8] group-hover:text-white transition-colors duration-200"
              >
                <span className="text-cyan-400"><EmailIcon /></span>
                <span className="text-[15px] font-semibold">Email</span>
              </a>

              {/* Vertical divider */}
              <div className="w-px bg-white/[0.07] my-3 flex-shrink-0" />

              {/* Right portion: copy email to clipboard */}
              <button
                onClick={handleCopy}
                title="Copy email address"
                className={`flex items-center gap-1.5 px-4 py-4 transition-all duration-200 text-sm font-medium flex-shrink-0 cursor-pointer ${
                  copied
                    ? 'text-teal-400 bg-teal-400/[0.08]'
                    : 'text-[#555570] hover:text-cyan-400 hover:bg-cyan-400/[0.06]'
                }`}
              >
                {copied ? (
                  <>
                    <CheckIcon />
                    <span className="text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </button>
            </div>

          </div>


        </div>
      </div>
    </section>
  );
}
