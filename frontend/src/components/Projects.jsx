import useIntersectionObserver from '../hooks/useIntersectionObserver';

function SectionHeader({ label, title, sub }) {
  const [ref, visible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <p className="text-[11px] font-bold tracking-[0.15em] text-teal-400 mb-3">PROJECTS</p>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-1px] text-white mb-3">{title}</h2>
      {sub && <p className="text-[#8888a8] text-[15px] max-w-xl">{sub}</p>}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useIntersectionObserver();
  const headerColors = [
    'from-emerald-950 via-teal-950 to-[#0a1428]',
    'from-blue-950 via-indigo-950 to-[#0a0a28]',
  ];
  const color = headerColors[index % headerColors.length];

  return (
    <div
      ref={ref}
      className={`bg-[#111118] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Card header with gradient */}
      <div className={`bg-gradient-to-br ${color} px-6 pt-7 pb-6 min-h-[110px] flex items-end`}>
        <h3 className="text-[17px] font-bold text-white leading-snug">{project.title}</h3>
      </div>

      {/* Card body */}
      <div className="px-6 pb-6 pt-5">
        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[#8888a8] font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bullet points */}
        <ul className="flex flex-col gap-2.5 mb-5">
          {project.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[#8888a8] leading-relaxed">
              <span className="w-3 h-0.5 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className="flex gap-2.5 flex-wrap">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#8888a8] text-xs hover:border-cyan-400/40 hover:text-white hover:bg-cyan-400/5 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Code
          </a>
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#8888a8] text-xs hover:border-cyan-400/40 hover:text-white hover:bg-cyan-400/5 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live demo
          </a>
          <span className="flex items-center text-xs text-[#555570]">· {project.year}</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label="PROJECTS"
          title="Things I've built"
          sub="A selection of end-to-end projects — ask the AI assistant above to learn more about any of them."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
