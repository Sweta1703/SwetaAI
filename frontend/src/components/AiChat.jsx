import { useState, useRef, useEffect } from 'react';
import { profile } from '../data/cvData';

// Icon components
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const AiOrb = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    {/* Outer rings */}
    <div className="absolute inset-[-14px] rounded-full border border-cyan-400/20 animate-ring-pulse" />
    <div className="absolute inset-[-28px] rounded-full border border-cyan-400/10 animate-ring-pulse" style={{ animationDelay: '0.5s' }} />
    {/* Main orb */}
    <div className="relative w-20 h-20 rounded-full orb animate-float animate-pulse-glow shadow-[0_0_30px_rgba(6,182,212,0.5),0_0_60px_rgba(59,130,246,0.3)]">
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#0c1a3a] to-[#091228]" />
    </div>
  </div>
);

function formatTime() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/✦/g, '<span class="text-teal-400">✦</span>')
    .replace(/🎓|🏫|🏆|🎬|📧|📱|💼|🐙|🌐/g, (m) => `<span>${m}</span>`)
    .replace(/\n\n/g, '</p><p class="mb-1">')
    .replace(/\n/g, '<br/>')
    .replace(/^/, '<p class="mb-1">')
    .replace(/$/, '</p>');
}


const PROMPTS = [
  { label: 'Strongest skills', query: "What are Sweta's strongest skills?" },
  { label: 'Best project', query: "Tell me about her best project." },
  { label: 'Internship', query: "Tell me about her internship experience." },
  { label: 'Tech stack', query: "What is her tech stack?" },
  { label: 'Why hire me?', query: "Why should I hire Sweta?" },
];

const RECRUITER_BTNS = [
  { label: 'Skills', href: '#skills', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
  { label: 'Projects', href: '#projects', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>) },
  { label: 'Experience', href: '#experience', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>) },
  { label: 'Education', href: '#about', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>) },
  { label: 'Resume', href: profile.portfolio, icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>), external: true },
  { label: 'GitHub', href: profile.github, icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>), external: true },
  { label: 'LinkedIn', href: profile.linkedin, icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>), external: true },
];

export default function AiChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: `Hi! I'm Sweta's AI assistant. Ask me anything about her skills, projects, internship, or why she'd be a great hire. Tap a suggested prompt below to get started.`,
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isTyping) return;
    setInput('');

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', content: trimmed, time: formatTime() },
    ]);

    setIsTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', content: data.answer, time: formatTime() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          content: `⚠️ Could not reach the AI backend. Please make sure the server is running at **localhost:8000**.`,
          time: formatTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="ai-assistant" className="min-h-screen pt-24 pb-16 px-6 flex items-start justify-center">
      <div className="max-w-[880px] w-full flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[#8888a8] text-xs font-medium mb-7">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-cyan-400">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Powered by AI · Ask me anything
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-3px] mb-5 leading-[1.05]">
          Meet <span className="text-white">Sweta's</span>{' '}
          <span className="text-cyan-400">AI</span>
        </h1>
        <p className="text-[#8888a8] text-lg mb-10">
          Ask questions. Explore projects. Discover my technical journey.
        </p>

        {/* AI Orb */}
        <div className="mb-9">
          <AiOrb />
        </div>

        {/* Chat Window */}
        <div className="w-full bg-[#111118] border border-white/[0.07] rounded-2xl overflow-hidden text-left">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07]">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
            <div>
              <div className="text-sm font-semibold text-white">AI Assistant</div>
              <div className="text-xs text-[#555570]">Representing Sweta Mondal · online</div>
            </div>
          </div>

          {/* Messages */}
          <div className="px-5 py-5 flex flex-col gap-4 min-h-[100px] max-h-[360px] overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'ai' && (
                  <div className="w-9 h-9 rounded-full orb flex-shrink-0 relative shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    <div className="absolute inset-[7px] rounded-full bg-gradient-to-br from-[#0c1a3a] to-[#091228]" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-xl text-sm leading-relaxed max-w-[80%] ${msg.role === 'ai'
                      ? 'bg-white/[0.04] border border-white/[0.07] text-[#f0f0f8]'
                      : 'bg-cyan-400/[0.08] border border-cyan-400/20 text-[#f0f0f8]'
                    }`}
                >
                  {msg.role === 'ai' ? (
                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                  ) : (
                    msg.content
                  )}
                  <div className="text-[11px] text-[#555570] mt-2">{msg.time}</div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full orb flex-shrink-0 relative shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <div className="absolute inset-[7px] rounded-full bg-gradient-to-br from-[#0c1a3a] to-[#091228]" />
                </div>
                <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center gap-1.5">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#555570] animate-typing"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested prompts */}
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {PROMPTS.map((p) => (
              <button
                key={p.label}
                onClick={() => sendMessage(p.query)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-transparent text-[#8888a8] text-xs hover:border-cyan-400/40 hover:text-white hover:bg-cyan-400/5 transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-cyan-400">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {p.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="mx-5 mb-2 flex items-center gap-3 border border-white/10 rounded-xl bg-white/[0.02] px-4 py-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask about Sweta's skills, projects, experience..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-[#555570] resize-none leading-relaxed"
              style={{ maxHeight: '100px' }}
            />
            <button
              onClick={() => sendMessage()}
              className="w-8 h-8 rounded-lg bg-white/[0.07] border border-white/10 flex items-center justify-center text-[#8888a8] hover:bg-cyan-400/20 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200 flex-shrink-0"
            >
              <SendIcon />
            </button>
          </div>
          <p className="text-[11px] text-[#555570] px-5 pb-4">
            Enter to send · Shift+Enter for a new line
          </p>

          {/* Recruiter Mode */}
          <div className="border-t border-white/[0.07] px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
              <span className="text-[11px] font-bold tracking-widest text-[#555570]">RECRUITER MODE</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {RECRUITER_BTNS.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target={btn.external ? '_blank' : undefined}
                  rel={btn.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-white/[0.07] bg-white/[0.02] text-[#8888a8] text-xs font-medium hover:border-cyan-400/30 hover:text-white hover:bg-cyan-400/5 transition-all duration-200"
                >
                  <span className="text-cyan-400">{btn.icon}</span>
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Explore hint */}
        <div className="flex flex-col items-center gap-1.5 mt-10 text-[#555570] text-[11px] font-bold tracking-[0.15em] animate-explore-float">
          <span>EXPLORE</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </div>
    </section>
  );
}
