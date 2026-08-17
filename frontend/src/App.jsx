import './index.css';
import { profile, education, skills, projects, internship, achievements } from './data/cvData';
import Navbar from './components/Navbar';
import AiChat from './components/AiChat';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import About from './components/About';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Blue edge glow as a fixed overlay
function EdgeGlow() {
  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 w-[3px] z-50 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, #1a3a6a 30%, #1a3a6a 70%, transparent)' }} />
      <div className="fixed right-0 top-0 bottom-0 w-[3px] z-50 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, #1a3a6a 30%, #1a3a6a 70%, transparent)' }} />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#070710] text-[#f0f0f8] font-sans">
      <EdgeGlow />
      <Navbar profile={profile} />
      <main>
        <AiChat />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Experience internship={internship} />
        <About education={education} />
        <Achievements achievements={achievements} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
