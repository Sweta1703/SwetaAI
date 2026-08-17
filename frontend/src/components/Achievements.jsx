import useIntersectionObserver from '../hooks/useIntersectionObserver';

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

function AchievementCard({ achievement, index }) {
  const [ref, visible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`bg-[#111118] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Top */}
      <div className="flex items-start gap-3.5 mb-4">
        <div className="w-10 h-10 rounded-xl bg-teal-400/[0.08] border border-teal-400/20 flex items-center justify-center text-teal-400 flex-shrink-0">
          <TrophyIcon />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-[15px] font-bold text-white">{achievement.title}</h3>
            <span className="text-xs text-[#555570]">· {achievement.year}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-teal-400 px-2 py-0.5 rounded-full bg-teal-400/10 border border-teal-400/20">
              {achievement.highlight}
            </span>
            {achievement.organizer && (
              <span className="text-xs text-[#555570]">{achievement.organizer}</span>
            )}
          </div>
        </div>
        <a
          href={achievement.certificate}
          className="text-[11px] text-cyan-400 px-2.5 py-1 border border-cyan-400/20 bg-cyan-400/[0.05] rounded-full hover:bg-cyan-400/10 transition-all whitespace-nowrap flex-shrink-0"
        >
          Certificate
        </a>
      </div>

      {/* Bullets */}
      <ul className="flex flex-col gap-2">
        {achievement.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[#8888a8] leading-relaxed">
            <span className="text-teal-400 text-base leading-5 flex-shrink-0">›</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Achievements({ achievements }) {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={ref}
          className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-[11px] font-bold tracking-[0.15em] text-teal-400 mb-3">ACHIEVEMENTS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-1px] text-white mb-3">Milestones</h2>
          <p className="text-[#8888a8] text-[15px]">Recognition and moments worth noting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
