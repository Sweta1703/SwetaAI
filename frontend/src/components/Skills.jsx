import { useEffect, useRef, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const CATEGORY_ICONS = {
  'Languages': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'Web Development': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'Databases': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  'Tools & Technologies': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  'Core Concepts': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
};

function SkillBar({ name, level, visible }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[13px] text-[#8888a8]">{name}</span>
        <span className="text-[13px] text-[#8888a8]">{level}%</span>
      </div>
      <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${level}%`,
            background: 'linear-gradient(90deg, #0be0c0, #00d4ff)',
            transformOrigin: 'left',
            transform: visible ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 1.2s ease-out ${Math.random() * 0.3}s`,
          }}
        />
      </div>
    </div>
  );
}

function SkillCard({ skill, index }) {
  const [ref, visible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`bg-[#111118] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-cyan-400">
          {CATEGORY_ICONS[skill.category] || CATEGORY_ICONS['Core Concepts']}
        </span>
        <h3 className="text-[15px] font-bold text-white">{skill.category}</h3>
      </div>
      <div>
        {skill.items.map((item) => (
          <SkillBar key={item.name} name={item.name} level={item.level} visible={visible} />
        ))}
      </div>
    </div>
  );
}

export default function Skills({ skills }) {
  const [headerRef, headerVisible] = useIntersectionObserver();

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-[11px] font-bold tracking-[0.15em] text-teal-400 mb-3">SKILLS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-1px] text-white mb-3">Technical toolkit</h2>
          <p className="text-[#8888a8] text-[15px]">The technologies Sweta uses to design, build, and ship products.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <SkillCard key={skill.category} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
