import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { profile } from '../data/cvData';

export default function About({ education }) {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [bioRef, bioVisible] = useIntersectionObserver();
  const [eduRef, eduVisible] = useIntersectionObserver();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* ABOUT Header */}
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-[11px] font-bold tracking-[0.15em] text-teal-400 mb-3">ABOUT</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-1px] text-white mb-3">A full-stack developer who builds with purpose</h2>
          <p className="text-[#8888a8] text-[15px]">Get to know Sweta beyond the résumé.</p>
        </div>

        {/* Bio + Meta */}
        <div
          ref={bioRef}
          className={`grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 mb-16 transition-all duration-700 ${bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Bio card */}
          <div className="bg-[#111118] border border-white/[0.07] rounded-2xl p-7 text-[15px] text-[#8888a8] leading-[1.85]">
            <p>
              I'm a Computer Science graduate from Techno International New Town, Kolkata, and a full-stack developer passionate about turning ideas and ambiguous problems into clean, scalable, and user-focused products. I work across the MERN stack — from building responsive React interfaces to developing robust backend APIs and database-driven applications.
            </p>
            <br />
            <p>
              My recent work includes a production-grade E-Commerce platform and a resilient AI-powered testing platform. I learn fast, communicate clearly, and care deeply about code quality and user experience.
            </p>
          </div>

          {/* Meta card */}
          <div className="bg-[#111118] border border-white/[0.07] rounded-2xl p-7">
            {[
              { label: 'ROLE', value: 'Full-Stack Developer (MERN)', color: false },
              { label: 'LOCATION', value: profile.location, color: false },
              { label: 'FOCUS', value: 'Full-stack · AI-assisted UX', color: false },
              { label: 'CGPA', value: '7.81', color: false },
              { label: 'STATUS', value: 'Open to opportunities', color: true },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className={`py-3.5 ${i < arr.length - 1 ? 'border-b border-white/[0.06]' : ''} ${i === 0 ? 'pt-0' : ''} ${i === arr.length - 1 ? 'pb-0' : ''}`}
              >
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#555570] mb-1">{item.label}</p>
                <p className={`text-[15px] font-semibold ${item.color ? 'text-teal-400' : 'text-white'}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div
          ref={eduRef}
          className={`transition-all duration-700 ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-[11px] font-bold tracking-[0.15em] text-teal-400 mb-3">EDUCATION</p>
          <h2 className="text-3xl font-extrabold tracking-[-1px] text-white mb-8">Academic background</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {education.map((edu, i) => (
              <div
                key={edu.id}
                className="bg-[#111118] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Top: icon + year */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/[0.08] border border-cyan-400/15 flex items-center justify-center text-cyan-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <span className="text-xs text-[#555570] px-2.5 py-1 border border-white/[0.07] rounded-full">
                    {edu.period}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-white mb-1.5">{edu.degree}</h3>
                <p className="text-xs text-cyan-400/80 mb-1">{edu.institution}</p>
                <p className="text-xs text-[#555570] mb-1">{edu.location}</p>
                <p className="text-xs text-[#8888a8] font-medium">{edu.score}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
