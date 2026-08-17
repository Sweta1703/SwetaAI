import useIntersectionObserver from '../hooks/useIntersectionObserver';

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);

export default function Experience({ internship }) {
  const [ref, visible] = useIntersectionObserver();
  const [cardRef, cardVisible] = useIntersectionObserver();

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-[11px] font-bold tracking-[0.15em] text-teal-400 mb-3">EXPERIENCE</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-1px] text-white mb-3">Where I've worked</h2>
          <p className="text-[#8888a8] text-[15px]">Internship where Sweta shipped real software.</p>
        </div>

        {/* Internship Card */}
        <div
          ref={cardRef}
          className={`bg-[#111118] border border-white/[0.07] rounded-2xl p-7 hover:border-white/[0.14] transition-all duration-500 ${
            cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Top row */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/[0.08] border border-cyan-400/15 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <BriefcaseIcon />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white mb-1">
                {internship.title}
                <span className="text-[#8888a8] font-normal text-sm"> ({internship.type})</span>
              </h3>
              <p className="text-[13px] text-[#555570]">{internship.company}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] text-[#555570] px-3 py-1.5 border border-white/[0.07] rounded-full whitespace-nowrap">
                {internship.year}
              </span>
              <a
                href={internship.certificate}
                className="text-[13px] text-cyan-400 px-3 py-1.5 border border-cyan-400/20 bg-cyan-400/[0.05] rounded-full hover:bg-cyan-400/10 transition-all whitespace-nowrap"
              >
                Certificate
              </a>
            </div>
          </div>

          {/* Bullet points */}
          <ul className="flex flex-col gap-3">
            {internship.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#8888a8] leading-relaxed">
                <span className="text-cyan-400 text-base leading-5 flex-shrink-0">›</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
