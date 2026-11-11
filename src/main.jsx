import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, AtSign, Braces, Check, ChevronDown,
  Code2, Cpu, Download, ExternalLink, Mail, Menu, Moon,
  Send, Sparkles, Sun, Terminal, X, Zap, Database, Globe, Layers, Workflow,
  BriefcaseBusiness, GraduationCap, Award, MapPin, CalendarDays, Filter,
  FileText, MessageCircle, CheckCircle2, AlertCircle, Heart, Command,
} from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import './styles.css';

const PROFILE = '/assets/kaveri-profile.jpg';
const RESUME = '/Kaveri-Kumari-Resume.pdf';
const LINKS = {
  email: 'kumarikaver1214@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kaveri-kumari',
  github: 'https://github.com/Kaveri-kumari',
};

const projects = [
  {
    id: 'queryai', number: '01', title: 'Query AI', eyebrow: 'AI / DEVELOPER TOOL',
    description: 'Turning natural language into executable SQL. A practical AI application that discovers database structure, understands relationships and brings generated queries to life.',
    features: ['Natural-language to SQL', 'Schema & relationship discovery', 'PostgreSQL query execution'],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Groq LLM'],
    category: 'AI', tone: 'violet', icon: Database, repo: '', demo: 'ai-sql-query-generator-nu.vercel.app',
  },
  {
    id: 'vectordb', number: '02', title: 'VectorDB & RAG Pipeline', eyebrow: 'SYSTEMS / AI ENGINEERING',
    description: 'A from-scratch exploration of vector retrieval: comparing search strategies, visualizing high-dimensional data and connecting retrieval to language models.',
    features: ['Brute Force, KD-Tree & HNSW', 'Vector similarity search', 'PCA visualization + Ollama'],
    stack: ['C++', 'JavaScript', 'Ollama', 'REST APIs'],
    category: 'AI', tone: 'blue', icon: Workflow, repo: '', demo: '',
  },
  {
    id: 'collab', number: '03', title: 'Real-Time Collaborative Editor', eyebrow: 'FULL-STACK / REAL-TIME',
    description: 'A shared coding space where multiple people can write and edit together, powered by room-based collaboration and live code synchronization.',
    features: ['Multi-user collaboration', 'Socket.IO synchronization', 'Responsive React interface'],
    stack: ['React', 'Node.js', 'Express', 'Socket.IO'],
    category: 'Full Stack', tone: 'peach', icon: Code2, repo: '', demo: 'https://github.com/Kaveri-kumari/realtime-collaborative-code-editor',
  },
  {
    id: 'sprite', number: '04', title: 'Sprite AI Assistant', eyebrow: 'PRODUCT / AI EXPERIENCE',
    description: 'An AI-powered business website with an intelligent virtual assistant for customer interactions, supported by custom APIs and MongoDB data structures.',
    features: ['AI-driven customer conversations', 'Responsive business website', 'Backend APIs + MongoDB'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    category: 'Full Stack', tone: 'mint', icon: Sparkles, repo: '', demo: 'sprite-website.vercel.app',
  },
];

const skills = [
  { name: 'Languages', icon: Braces, items: ['C++', 'JavaScript', 'Python'] },
  { name: 'Frontend', icon: Layers, items: ['React.js', 'HTML5', 'CSS3', 'Bootstrap'] },
  { name: 'Backend', icon: Terminal, items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Socket.IO'] },
  { name: 'Databases', icon: Database, items: ['SQL Server', 'MongoDB', 'PostgreSQL'] },
  { name: 'AI & Retrieval', icon: Cpu, items: ['Generative AI', 'RAG', 'LLM Integration', 'Vector Embeddings', 'Ollama'] },
  { name: 'Tools & Platforms', icon: Command, items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Render'] },
];

const certifications = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle University', year: '2025', icon: Cpu, verification: 'https://www.coursera.org/account/accomplishments/verify/L26DKZTAQCRB' },
  { name: 'HTML & CSS Essentials', issuer: 'Cisco Networking Academy', year: '', icon: Globe, verification: 'https://www.credly.com/earner/earned/badge/984ade79-5de7-470d-bb9c-b702fb3191ea' },
  { name: 'JavaScript Essentials 1 & 2', issuer: 'Cisco Networking Academy', year: '', icon: Code2, verification: 'https://www.credly.com/earner/earned/badge/a4b6fcd6-a1af-41a8-b8bb-2e75453ce586' },
  { name: 'SQL', issuer: 'HackerRank', year: '', icon: Database, verification: '' },
  { name: 'Introduction to Artificial Intelligence', issuer: 'Google · Coursera', year: '', icon: Sparkles, verification: 'https://www.coursera.org/account/accomplishments/verify/E0BZ7HRRUFOH' },
];

const navItems = [
  ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'],
  ['Education', '#education'], ['Certifications', '#certifications'], ['Contact', '#contact'],
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function IconLink({ href, label, children, className = '' }) {
  const external = href?.startsWith('http');
  return <a className={className} href={href || undefined} aria-label={label} title={label}
    target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}
    onClick={!href ? (e) => e.preventDefault() : undefined}>{children}</a>;
}

function SectionHeading({ kicker, title, description, side }) {
  return <div className="section-heading" data-reveal>
    <div><span className="eyebrow"><span className="eyebrow-dot" />{kicker}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>
    {side && <div className="section-side">{side}</div>}
  </div>;
}

function ProjectVisual({ project }) {
  const Icon = project.icon;
  return <div className={`project-visual visual-${project.tone}`}>
    <div className="visual-grid" />
    <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
    <div className="visual-window">
      <div className="window-top"><span /><span /><span /><i>{project.id === 'queryai' ? 'query.sql' : project.id === 'collab' ? 'collab.dev' : project.id === 'vectordb' ? 'vector.search' : 'sprite.ai'}</i></div>
      {project.id === 'queryai' ? <div className="sql-preview"><small>ASK YOUR DATABASE</small><strong>“Show the top 5 customers”</strong><div className="sql-line"><span>SELECT</span> name, revenue</div><div className="sql-line"><span>FROM</span> customers</div><div className="sql-line"><span>ORDER BY</span> revenue DESC;</div><div className="result-pill"><Check size={12}/> Query executed successfully</div></div>
        : project.id === 'collab' ? <div className="code-preview"><div className="code-line"><b>01</b><span><i>const</i> room = <em>"build-together"</em>;</span></div><div className="code-line"><b>02</b><span><i>await</i> editor.<em>connect</em>(room);</span></div><div className="code-line"><b>03</b><span>socket.<em>on</em>(<em>"code:update"</em>, sync);</span></div><div className="collab-users"><span>K</span><span>A</span><span>J</span><small>3 collaborators online</small></div></div>
        : project.id === 'vectordb' ? <div className="vector-preview"><div className="vector-label">VECTOR SPACE <span>3D · PCA</span></div><div className="vector-points">{Array.from({length:26},(_,i)=><span key={i} style={{'--i':i}} />)}</div><div className="vector-legend"><span>● Semantic cluster</span><span>● Retrieved result</span></div></div>
        : <div className="assistant-preview"><div className="assistant-avatar"><Sparkles size={17}/></div><div><small>SPRITE ASSISTANT</small><strong>How can I help you today?</strong><p>I'm here to make things easier.</p></div><div className="assistant-input">Ask me anything <ArrowUpRight size={13}/></div></div>}
    </div>
    <div className="visual-icon"><Icon size={19}/></div>
    <span className="visual-index">/{project.number}</span>
  </div>;
}

function ProjectCard({ project, index }) {
  return <motion.article className={`project-card project-${project.tone}`} data-reveal
    initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .55, delay: index * .06 }}>
    <ProjectVisual project={project}/>
    <div className="project-body">
      <div className="project-meta"><span>{project.eyebrow}</span><span>PROJECT {project.number}</span></div>
      <h3>{project.title}</h3><p className="project-description">{project.description}</p>
      <ul className="project-features">{project.features.map((f)=><li key={f}><Check size={13}/>{f}</li>)}</ul>
      <div className="tag-list">{project.stack.map((tag)=><span key={tag}>{tag}</span>)}</div>
      <div className="project-actions">
        {project.repo ? <a href={project.repo} target="_blank" rel="noreferrer">GitHub <Github size={14}/></a> : <span className="link-placeholder"><Github size={14}/> Repository link to add</span>}
        {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14}/></a> : <span className="link-placeholder">Demo link to add <ArrowUpRight size={14}/></span>}
      </div>
    </div>
  </motion.article>;
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('kaveri-theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [typed, setTyped] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [contact, setContact] = useState({ name: '', email: '', subject: '', message: '' });
  const [formState, setFormState] = useState('idle');
  const [formMessage, setFormMessage] = useState('');
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const roles = ['Aspiring Software Developer', 'MERN Stack Developer', 'Problem Solver'];
  const filters = ['All', 'AI', 'Full Stack'];
  const shownProjects = useMemo(() => activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter), [activeFilter]);
  useReveal();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('kaveri-theme', theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false; let timeout;
    const word = roles[roleIndex];
    if (typed.length < word.length) timeout = setTimeout(() => !cancelled && setTyped(word.slice(0, typed.length + 1)), 75);
    else timeout = setTimeout(() => { if (!cancelled) { setTyped(''); setRoleIndex((i) => (i + 1) % roles.length); } }, 1700);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [typed, roleIndex]);

  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => { if (!menuOpen) return; const close = (e) => e.key === 'Escape' && setMenuOpen(false); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [menuOpen]);

  const updateContact = (e) => setContact({ ...contact, [e.target.name]: e.target.value });
  const submitContact = async (e) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (!endpoint) { setFormState('error'); setFormMessage('The contact form is not connected yet. Add VITE_CONTACT_ENDPOINT in your deployment environment to enable delivery.'); return; }
    setFormState('loading'); setFormMessage('');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contact) });
      if (!response.ok) throw new Error('The service could not send your message. Please try again.');
      setFormState('success'); setFormMessage('Your message has been sent. Thank you for reaching out!');
      setContact({ name: '', email: '', subject: '', message: '' });
    } catch (error) { setFormState('error'); setFormMessage(error.message || 'Something went wrong. Please try again.'); }
  };

  return <div className="site-shell">
    <div className="cursor-glow" style={{ transform: `translate3d(${cursor.x - 180}px, ${cursor.y - 180}px, 0)` }} />
    <header className="navbar">
      <a href="#home" className="brand" onClick={()=>setMenuOpen(false)}><span className="brand-mark">k<span>.</span></span><span className="brand-name">KAVERI<span>KUMARI</span></span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        {navItems.map(([label, href])=><a key={href} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}
        <a className="mobile-resume" href={RESUME} download>Resume <Download size={14}/></a>
      </nav>
      <div className="nav-actions">
        <a className="nav-resume" href={RESUME} download><span>Resume</span><Download size={14}/></a>
        <button className="theme-toggle" onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label={`Switch to ${theme==='light'?'dark':'light'} mode`} title="Toggle theme">
          <AnimatePresence mode="wait" initial={false}>{theme==='light'?<motion.span key="moon" initial={{rotate:-55,opacity:0,scale:.7}} animate={{rotate:0,opacity:1,scale:1}} exit={{rotate:55,opacity:0,scale:.7}}><Moon size={17}/></motion.span>:<motion.span key="sun" initial={{rotate:55,opacity:0,scale:.7}} animate={{rotate:0,opacity:1,scale:1}} exit={{rotate:-55,opacity:0,scale:.7}}><Sun size={17}/></motion.span>}</AnimatePresence>
        </button>
        <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?'Close menu':'Open menu'}>{menuOpen?<X size={21}/>:<Menu size={21}/>}</button>
      </div>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <motion.div className="availability" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.15}}><span className="availability-pulse"/> OPEN TO SOFTWARE DEVELOPER OPPORTUNITIES</motion.div>
          <motion.p className="hero-pretitle" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.25}}>Hello, world! I'm</motion.p>
          <motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.35}}>Kaveri <span>Kumari<span className="name-period">.</span></span></motion.h1>
          <div className="hero-role"><span className="role-prefix">I build as a</span><span className="typed-role">{typed}<i className="typing-caret"/></span></div>
          <motion.p className="hero-description" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.5}}>I build full-stack, real-time and AI-powered web applications. I love turning complex ideas into useful digital experiences — with thoughtful interfaces and clean, reliable code.</motion.p>
          <motion.div className="hero-ctas" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.6}}>
            <a href="#projects" className="button button-primary">Explore my work <ArrowUpRight size={16}/></a>
            <a href="#contact" className="button button-quiet">Let's connect <ArrowRight size={15}/></a>
          </motion.div>
          <motion.div className="hero-socials" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.75}}>
            <span>FIND ME ON</span><i/><IconLink href={LINKS.github} label="GitHub"><Github size={17}/></IconLink><IconLink href={LINKS.linkedin} label="LinkedIn"><Linkedin size={17}/></IconLink><IconLink href={`mailto:${LINKS.email}`} label="Email"><Mail size={17}/></IconLink>
          </motion.div>
        </div>
        <motion.div className="hero-art" initial={{opacity:0,scale:.94,x:20}} animate={{opacity:1,scale:1,x:0}} transition={{duration:.8,delay:.25}}>
          <div className="portrait-stage">
            <div className="portrait-backdrop"/><div className="portrait-ring ring-a"/><div className="portrait-ring ring-b"/>
            <div className="portrait-image-wrap"><img src={PROFILE} alt="Portrait of Kaveri Kumari" fetchPriority="high"/></div>
            <span className="orbit-dot dot-one"/><span className="orbit-dot dot-two"/><span className="orbit-dot dot-three"/>
<div className="float-card float-code !text-gray-800 dark:!text-white">
  <span><Code2 size={15}/></span>
  <div>
    <b className="!text-gray-800 dark:!text-white">Clean code</b>
    <small className="!text-gray-600 dark:!text-gray-300">
      Built with purpose
    </small>
  </div>
</div>            <div className="float-card float-stack "><span><Cpu size={16}/></span><div><b>Curious mind</b><small>Always learning</small></div></div>
            <div className="portrait-caption"><span className="caption-line"/>BUILDING. LEARNING. CREATING.</div>
          </div>
        </motion.div>
        <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><span className="scroll-cue-line"/></a>
        <div className="hero-index">01 <span>/</span> 06</div>
      </section>

      <section className="about section-wrap section-pad" id="about">
        <SectionHeading kicker="A LITTLE INTRODUCTION" title={<>Curiosity in mind.<br/><em>Code in motion.</em></>} description="A developer who enjoys learning how things work — and making them work better." side={<span className="side-note">01 / ABOUT</span>}/>
        <div className="about-grid">
          <div className="about-copy" data-reveal><p className="large-copy">I'm a <strong>Computer Science & Information Technology</strong> student and software developer with a passion for building things that are both useful and well-crafted.</p><p>My work spans full-stack web development, real-time systems and AI-powered applications. I enjoy moving between the details of a user interface and the thinking behind a reliable backend — understanding the whole product, not just one layer.</p><p>I'm always exploring, experimenting and looking for the next problem worth solving.</p><a href={RESUME} download className="text-link">A little more about my journey <Download size={14}/></a></div>
          <div className="about-note" data-reveal><div className="note-top"><span>DEVELOPER'S NOTE</span><Sparkles size={17}/></div><div className="note-mark">“</div><p>I believe good software is a balance of <em>clear thinking, thoughtful design</em> and code that makes a real difference.</p><div className="note-signature">— Kaveri</div><div className="note-foot"><span>BHOPAL, INDIA</span><span>ALWAYS IN PROGRESS <span className="tiny-star">✳</span></span></div></div>
        </div>
        <div className="stat-strip" data-reveal>
          <div><strong>03<span>+</span></strong><small>FEATURED PROJECTS</small></div><div><strong>06<span>+</span></strong><small>TECHNOLOGY AREAS</small></div><div><strong>05</strong><small>CERTIFICATIONS</small></div><div><strong>∞</strong><small>THINGS TO LEARN</small></div>
        </div>
        <p className="stat-disclaimer">Counts reflect items currently listed in this portfolio; update them as your work grows.</p>
      </section>

      <section className="skills section-wrap section-pad" id="skills">
        <SectionHeading kicker="MY TOOLKIT" title={<>Tools I use to <em>make things happen.</em></>} description="A growing toolkit across frontend, backend, databases and AI." side={<span className="side-note">02 / SKILLS</span>}/>
        <div className="skills-grid">{skills.map((group,i)=>{const Icon=group.icon;return <motion.article className="skill-card" key={group.name} data-reveal initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{delay:i*.06,duration:.45}}><div className="skill-card-top"><span className="skill-icon"><Icon size={18}/></span><span className="skill-number">0{i+1}</span></div><h3>{group.name}</h3><div className="skill-items">{group.items.map(item=><span key={item}>{item}</span>)}</div><div className="skill-card-line"/></motion.article>})}</div>
        <div className="skills-bottom" data-reveal><span className="skills-star">✳</span><p>Currently deepening my understanding of <strong>data structures, system design, backend engineering</strong> and practical AI.</p><span className="mono-note">LEARN → BUILD → ITERATE</span></div>
      </section>



      <section className="projects section-wrap section-pad" id="projects">
        <SectionHeading kicker="SELECTED WORK" title={<>A few things I've <em>put into the world.</em></>} description="Projects that reflect my curiosity for product engineering, collaboration and intelligent systems." side={<span className="side-note">03 / PROJECTS</span>}/>
        <div className="project-toolbar" data-reveal><div className="filter-label"><Filter size={14}/> FILTER PROJECTS</div><div className="filter-buttons">{filters.map(f=><button className={activeFilter===f?'active':''} key={f} onClick={()=>setActiveFilter(f)}>{f}<span>{f==='All'?projects.length:projects.filter(p=>p.category===f).length}</span></button>)}</div></div>
        <motion.div layout className="projects-grid">{shownProjects.map((project,i)=><ProjectCard project={project} index={i} key={project.id}/>)}</motion.div>
        <div className="projects-note" data-reveal><span className="note-bullet"/><p>More experiments are always in progress. Repository and live-demo links will be added once each destination is verified.</p><a href={LINKS.github} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={14}/></a></div>
      </section>

      <section className="education section-wrap section-pad" id="education">
        <SectionHeading kicker="THE FOUNDATION" title={<>Learning never <em>graduates.</em></>} description="The academic foundation behind my engineering journey." side={<span className="side-note">04 / EDUCATION</span>}/>
        <div className="education-card" data-reveal><div className="education-visual"><div className="edu-orbit"/><div className="edu-icon"><GraduationCap size={36}/></div><span className="edu-year">2023 — PRESENT</span><span className="edu-label">BACHELOR'S DEGREE</span></div><div className="education-content"><span className="timeline-kind">UNDERGRADUATE</span><h3>Bachelor of Technology</h3><h4>Computer Science & Information Technology</h4><p className="edu-institute">Sagar Institute of Research & Technology <span>·</span> Bhopal</p><div className="edu-meta"><div><small>UNIVERSITY</small><strong>Rajiv Gandhi Proudyogiki Vishwavidyalaya</strong><span>RGPV</span></div><div><small>CGPA</small><strong>7.03 <i>/ 10</i></strong><span>As listed on current resume</span></div></div></div><div className="edu-side-mark">B.TECH <span>·</span> CSIT</div></div>
        <div className="school-row" data-reveal><div><span>PRE-UNIVERSITY</span><strong>Class XII · BSEB</strong><small>74.6% · Bihar School Examination Board</small></div><div><span>SECONDARY</span><strong>Class X · CBSE</strong><small>78.8% · Central Board of Secondary Education</small></div></div>
      </section>

      <section className="certifications section-wrap section-pad" id="certifications">
        <SectionHeading kicker="ALWAYS EVOLVING" title={<>Knowledge, <em>made tangible.</em></>} description="Certifications and learning milestones along the way." side={<span className="side-note">05 / CERTIFICATIONS</span>}/>
        <div className="cert-grid">{certifications.map((cert,i)=>{const Icon=cert.icon;return <article className="cert-card" data-reveal key={cert.name}><div className="cert-icon"><Icon size={20}/></div><div className="cert-content"><span className="cert-issuer">{cert.issuer}{cert.year?` · ${cert.year}`:''}</span><h3>{cert.name}</h3>{cert.verification?<a href={cert.verification} target="_blank" rel="noreferrer">Verify credential <ExternalLink size={12}/></a>:<span className="cert-pending">Verification link to add</span>}</div><span className="cert-index">0{i+1}</span></article>})}</div>
      </section>

      <section className="contact section-wrap section-pad" id="contact">
        <div className="contact-panel">
          <div className="contact-intro" data-reveal><span className="eyebrow"><span className="eyebrow-dot"/> HAVE A PROJECT IN MIND?</span><h2>Let's build<br/><em>something good.</em></h2><p>Have an opportunity, an exciting project, or just want to connect? I'd love to hear from you.</p><div className="contact-direct"><span>THE BEST WAY TO START</span><a href={`mailto:${LINKS.email}`}>{LINKS.email}<ArrowUpRight size={15}/></a></div><div className="contact-socials"><IconLink href={LINKS.linkedin} label="LinkedIn"><Linkedin size={17}/></IconLink><IconLink href={LINKS.github} label="GitHub"><Github size={17}/></IconLink><IconLink href={`mailto:${LINKS.email}`} label="Email"><Mail size={17}/></IconLink></div></div>
          <div className="contact-form-wrap" data-reveal><div className="form-heading"><span>01 — SAY HELLO</span><span className="form-spark">✳</span></div><form onSubmit={submitContact} className="contact-form">
            <label>Your name<input name="name" value={contact.name} onChange={updateContact} placeholder="Jane Smith" autoComplete="name" required minLength={2}/></label>
            <label>Email address<input name="email" type="email" value={contact.email} onChange={updateContact} placeholder="jane@example.com" autoComplete="email" required/></label>
            <label>Subject<input name="subject" value={contact.subject} onChange={updateContact} placeholder="What's on your mind?" required minLength={3}/></label>
            <label>Your message<textarea name="message" value={contact.message} onChange={updateContact} placeholder="Tell me a little about it..." rows={3} required minLength={10}/></label>
            <button className="button button-primary send-button" type="submit" disabled={formState==='loading'}>{formState==='loading'?'Sending…':'Send message'}{formState==='loading'?<span className="button-spinner"/>:<Send size={15}/>}</button>
            <AnimatePresence>{formMessage&&<motion.div className={`form-feedback ${formState}`} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}} exit={{opacity:0}} role="status">{formState==='success'?<CheckCircle2 size={16}/>:<AlertCircle size={16}/>}<span>{formMessage}</span></motion.div>}</AnimatePresence>
          </form><p className="form-privacy"><AtSign size={12}/> Your details are only used to respond to your message.</p></div>
        </div>
      </section>
    </main>

    <footer className="footer"><div className="footer-main"><a href="#home" className="brand"><span className="brand-mark">k<span>.</span></span><span className="brand-name">KAVERI<span>KUMARI</span></span></a><p>Aspiring software developer.<br/>Curious by nature, builder by choice.</p><div className="footer-links"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#education">Education</a><a href="#certifications">Certifications</a><a href="#contact">Contact</a></div><div className="footer-socials"><IconLink href={LINKS.linkedin} label="LinkedIn"><Linkedin size={16}/></IconLink><IconLink href={LINKS.github} label="GitHub"><Github size={16}/></IconLink><IconLink href={`mailto:${LINKS.email}`} label="Email"><Mail size={16}/></IconLink></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} KAVERI KUMARI. BUILT WITH CURIOSITY.</span><span>MADE WITH <Heart size={11}/> & A LITTLE BIT OF COFFEE</span><a href="#home">BACK TO TOP <ArrowUpRight size={12}/></a></div></footer>
    <a className="back-top" href="#home" aria-label="Back to top"><ArrowUpRight size={17}/></a>
    <div className="page-grain" aria-hidden="true"/>
  </div>;
}

function NotFound() { return <main className="not-found"><span>404 / PAGE NOT FOUND</span><h1>Looks like a<br/><em>missing semicolon.</em></h1><p>The page you're looking for doesn't exist.</p><a className="button button-primary" href="/">Back to home <ArrowRight size={15}/></a></main>; }

const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';
createRoot(document.getElementById('root')).render(isHome ? <App/> : <NotFound/>);
