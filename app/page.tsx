'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ExperienceTimer from './experience-timer';
import { ArrowUpRight, ArrowDown, ArrowRight, Plus, Minus, Menu, X, Code2, Sparkles, Coffee, MapPin, Check, Copy, Shuffle, ChevronLeft, ChevronRight, Utensils, Heart, Waves, Camera, Music2, BookOpen, MoveUpRight, Download, Facebook, Linkedin, Instagram, Phone, Palette } from 'lucide-react';

const tech = [ ['java','Java'], ['spring','Spring Boot'], ['react','React'], ['vue','Vue 3'], ['postgresql','PostgreSQL'], ['docker','Docker'], ['kubernetes','Kubernetes'], ['aws','AWS'], ['redis','Redis'], ['kafka','Kafka'], ['gitlab','GitLab CI/CD'], ['grafana','Grafana'] ];
const food = [
  {
    "id": 9,
    "restaurant": "Ginza Gyu",
    "name": "Wagyu Skirt Claypot",
    "note": "My favorite food in the world. No contest.",
    "favorite": true,
    "type": "Savory",
    "alt": "Wagyu Skirt Claypot at Ginza Gyu",
    "image": "/images/food/ginza-gyu-wagyu-skirt-claypot.webp"
  },
  {
    "id": 2,
    "restaurant": "Mendokoro Ramenba",
    "name": "Miso Tonkotsu Ramen",
    "note": "Some days just call for a big bowl of ramen.",
    "type": "Savory",
    "alt": "Miso Tonkotsu Ramen at Mendokoro Ramenba",
    "image": "/images/food/mendokoro-ramenba-miso-tonkotsu-ramen.webp"
  },
  {
    "id": 3,
    "restaurant": "Everything Yummy",
    "name": "Adobomb",
    "note": "A very good reason to order extra rice.",
    "type": "Savory",
    "alt": "Adobomb at Everything Yummy",
    "image": "/images/food/everything-yummy-adobomb.webp"
  },
  {
    "id": 4,
    "restaurant": "Mesa",
    "name": "Palitaw",
    "note": "The dessert stomach is a separate system.",
    "type": "Sweet",
    "alt": "Palitaw at Mesa",
    "image": "/images/food/mesa-palitaw.webp"
  },
  {
    "id": 1,
    "restaurant": "Tiong Bahru Singapore Flavours",
    "name": "Roasted Chicken Rice",
    "note": "A very good lunch decision.",
    "type": "Savory",
    "alt": "Roasted Chicken Rice at Tiong Bahru Singapore Flavours",
    "image": "/images/food/tiong-bahru-singapore-flavours-roasted-chicken-rice.webp"
  },
  {
    "id": 5,
    "restaurant": "Ding How",
    "name": "Pork Chop Rice, Steamed Cabbage Rolls, Steamed Pork Ribs",
    "note": "A table full of possibilities.",
    "type": "Savory",
    "alt": "Pork Chop Rice, Steamed Cabbage Rolls, Steamed Pork Ribs at Ding How",
    "image": "/images/food/ding-how-pork-chop-rice-steamed-cabbage-rolls-steamed-pork-ribs.webp"
  },
  {
    "id": 6,
    "restaurant": "Tiong Bahru Singapore Flavours",
    "name": "Fried Tofu in Special Sauce",
    "note": "For the “let’s get one more thing” moments.",
    "type": "Savory",
    "alt": "Fried Tofu in Special Sauce at Tiong Bahru Singapore Flavours",
    "image": "/images/food/tiong-bahru-singapore-flavours-fried-tofu-in-special-sauce.webp"
  },
  {
    "id": 7,
    "restaurant": "Pardo",
    "name": "Angus Rib Set",
    "note": "Good food. Good company. A very full plate.",
    "type": "Savory",
    "alt": "Angus Rib Set at Pardo",
    "image": "/images/food/pardo-angus-rib-set.webp"
  },
  {
    "id": 8,
    "restaurant": "Everything Yummy",
    "name": "The Rib King",
    "note": "The kind of plan I’m happy to commit to.",
    "type": "Savory",
    "alt": "The Rib King at Everything Yummy",
    "image": "/images/food/everything-yummy-the-rib-king.webp"
  }
];
const projects = [
  { number: '01', title: 'Making lending work, end to end.', subtitle: 'Lending Operations Platform', category: 'MAJOR FINTECH CLIENT · MAR 2026–PRESENT', description: 'Leading six developers while staying in the code: translating solution architecture into implementation, unblocking delivery, and preparing for production.', tags: ['Java', 'Spring Boot', 'Flowable', 'gRPC'], status: 'In development', color: 'sage', details: [ ['The challenge', 'Daily batch processing needed persistent execution state, retry handling, and clear failure visibility across system boundaries.'], ['My contribution', 'Implemented Flowable-based batch execution around a backend processing service using gRPC. The workflow persists aggregate status, retries configured errors, and supports manual retriggering. The processing service owns downstream execution and any internal checkpointing.'], ['Beyond the code', 'I lead development-side reviews, deployment runbooks, prerequisites, and cross-team coordination under the primary solution architect. The system has not yet received production traffic.'] ] },
  { number: '02', title: 'From application to opportunity.', subtitle: 'Digital Credit Application Platform', category: 'MAJOR FINTECH CLIENT · JUL 2024–OCT 2025', description: 'Led full-stack delivery from a blank slate through gradual production rollout, connecting loan applicants with three partner banks.', tags: ['Vue 3', 'Spring Boot', 'OpenPGP', 'Kubernetes'], status: 'Delivered to production', color: 'peach', details: [ ['The challenge', 'Bring a digital credit application experience into mobile webviews and securely forward application information and supporting documents to partner banks.'], ['My contribution', 'Implemented a secure document delivery process: collect data and documents, create a ZIP, encrypt with OpenPGP, and deliver through internal SFTP synchronized with partner banks. The overall integration architecture was defined by the project architect.'], ['Delivery & scale', 'Used Firebase Remote Config for gradual frontend rollout and participated in the client’s standard Kubernetes canary process. Approximate recalled scale: 100 TPS, predominantly reads, and 2,000 loan applications per month.'] ] },
  { number: '03', title: 'Better conversations, in real time.', subtitle: 'Financial Advisor Presentation Platform', category: 'FINANCIAL SERVICES · FEB 2023–FEB 2024', description: 'Led a four-person team building shared financial consultations, taking on platform responsibilities without a dedicated architect or DevOps engineer.', tags: ['React', 'WebSockets', 'AWS EKS', 'Tanzu'], status: 'Client engagement', color: 'lavender', details: [ ['The challenge', 'Let advisors and participants work through presentations and enter information together, with the backend remaining authoritative.'], ['My contribution', 'Helped implement real-time shared state with WebSockets and STOMP, including debounced inputs to reduce backend updates. Integrated consultation features across authentication, payments, document signing, and visualizations.'], ['Platform ownership', 'Installed Tanzu Application Platform and Tanzu PostgreSQL on AWS EKS and deployed the application. Sized infrastructure around the minimum practical platform requirements to keep cloud costs in view.'] ] },
];
const workflow = [
  ['Refine', 'Give AI the business and repository context. Surface unclear requirements and edge cases, then bring the meaningful questions to refinement.'],
  ['Plan', 'Validate an implementation plan against the ticket, architecture, and team conventions before any implementation begins.'],
  ['Build', 'Use agents to help implement and test features. Keep the work grounded in an approved plan and the existing codebase.'],
  ['Review', 'Human developers review the implementation. I remain a primary reviewer, checking requirements, engineering quality, and team conventions.'],
  ['Ship', 'Keep SIT and QA validation in place. Use AI to support prerequisite checks, then coordinate a prepared, human-owned deployment.'],
];

function ProjectVisual({ index }: { index: number }) {
  if (index === 0) return <div className="system-art"><div className="art-heading"><span className="tiny-dot"/> DAILY BATCH WORKFLOW <span>01:00</span></div><div className="flow-line"><div><Code2 size={21}/><b>Batch Coordinator</b><small>Flowable</small></div><ArrowRight size={18}/><div><Sparkles size={21}/><b>Processing Service</b><small>gRPC processing</small></div></div><div className="batch-status"><span className="status-dot"/> PROCESSING <span>State persisted ↗</span></div><div className="art-bottom">Initialize <span>→</span> Process <span>→</span> Complete</div></div>;
  if (index === 1) return <div className="market-art"><div className="mini-document"><span className="document-icon">↗</span><small>AN APPLICATION.<br/>A NEW POSSIBILITY.</small><div className="doc-lines"><i/><i/><i/></div><div className="encrypted"><Check size={12}/> Encrypted & ready</div></div><div className="bank-list"><div><span>01</span> Collect</div><div><span>02</span> Encrypt</div><div><span>03</span> Deliver <ArrowUpRight size={15}/></div></div><span className="visual-footnote">SIMPLIFIED SECURE DOCUMENT DELIVERY</span></div>;
  return <div className="advisor-art"><div className="presentation"><div className="presentation-bar"><i/><i/><i/><span>Shared consultation</span></div><div className="chart-area"><div><small>A CLEARER PICTURE</small><b>Plan together.</b><p>Make the next step visible.</p></div><div className="chart-bars"><i/><i/><i/><i/><i/></div></div><div className="connected"><span/><span/> Connected in real time <span className="live-dot"/></div></div><div className="cursor-label"><MoveUpRight size={15}/> Your advisor</div></div>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [filter, setFilter] = useState('All cravings');
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState(food.map(f => f.id));
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const ordered = order.map(id => food.find(f => f.id === id)!);
  const filtered = ordered.filter(f => filter === 'All cravings' || f.type === filter);
  const visibleFood = showAll ? filtered : filtered.slice(0, 4);
  const selectedFood = food.find(f => f.id === selected);
  useEffect(() => {
    if (selected === null) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const current = filtered.findIndex(f => f.id === selected);
        const delta = e.key === 'ArrowRight' ? 1 : -1;
        setSelected(filtered[(current + delta + filtered.length) % filtered.length].id);
      }
      if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll<HTMLButtonElement>('.lightbox button'));
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); lastFocus.current?.focus(); };
  }, [selected, filter, order]); // eslint-disable-line react-hooks/exhaustive-deps
  async function copyEmail() {
    try { await navigator.clipboard.writeText('jemanmama@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2400); }
    catch { window.location.href = 'mailto:jemanmama@gmail.com'; }
  }
  function shuffleFood() {
    setOrder(prev => { const favoriteId = food.find(f => f.favorite)?.id; const next = prev.filter(id => id !== favoriteId); for (let i = next.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [next[i], next[j]] = [next[j], next[i]]; } return favoriteId === undefined ? next : [favoriteId, ...next]; });
  }
  function movePhoto(delta: number) { const i = filtered.findIndex(f => f.id === selected); setSelected(filtered[(i + delta + filtered.length) % filtered.length].id); }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="nav-wrap"><a href="#" className="wordmark" aria-label="Jeman Mama home">jeman<span>✳</span><i/></a><nav aria-label="Main navigation" className={menu ? 'nav-open' : ''}>{[['Work','#work'],['Approach','#approach'],['Beyond the code','#about'],['The food side','#food']].map(([label,href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}<a href="#contact" className="nav-contact" onClick={() => setMenu(false)}>Say hello <ArrowUpRight size={16}/></a></nav><button className="menu-toggle icon-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? 'Close navigation' : 'Open navigation'}>{menu ? <X/> : <Menu/>}</button></div></header>
    <main id="main">
      <section className="hero section-wrap" aria-labelledby="hero-title"><div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> SOFTWARE ENGINEER. DEV LEAD. CURIOUS HUMAN.</div><h1 id="hero-title">Thoughtful code.<br/><em>Curious human.</em></h1><p className="hero-intro">Hey, I’m Jeman Mama <span className="wave">✳</span><br/>I build software, help teams find their way, and believe the best solutions start with the right questions.</p><p className="hero-aside">Usually thinking about architecture. Occasionally, my next meal.</p><ExperienceTimer /><div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowUpRight size={17}/></a><a className="button secondary" href="/Jeman-Mama-CV.pdf" download="Jeman-Mama-CV.pdf">Download CV <Download size={17}/></a><a className="text-link" href="#about">Meet the person <ArrowRight size={16}/></a></div><div className="location"><MapPin size={13}/> Based in the Philippines <span>·</span> Building with curiosity</div></div><div className="hero-image-wrap"><div className="image-label"><span/> A LITTLE WORK. A LITTLE LIFE.</div><div className="hero-photo"><Image src="/images/jeman-restaurant.webp" alt="Jeman Mama enjoying time at a restaurant" fill priority sizes="(max-width: 700px) 90vw, 440px"/></div><div className="photo-caption"><span>Jeman, off the clock.</span><span>01 / THE HUMAN SIDE</span></div><div className="food-sticker"><Utensils size={22}/><span>Will code<br/><em>for good food.</em></span><span className="sticker-star">✦</span></div><svg className="hand-arrow" width="90" height="85" viewBox="0 0 90 85" aria-hidden="true"><path d="M8 9C75 0 84 53 39 66M39 66l12-18M39 66l21 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div></section>
      <div className="intro-strip section-wrap"><p><span>Currently at</span> Orange & Bronze Software Labs</p><span className="strip-star">✳</span><p>Hands-on engineering <span>meets</span> human-centered leadership.</p><a href="#work" aria-label="Scroll to selected work"><ArrowDown size={18}/></a></div>
      <section id="work" className="work-section section-wrap"><div className="section-heading"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>Real problems.<br/><em>Considered solutions.</em></h2></div><p>From real-time conversations to secure financial systems, I like turning complicated requirements into software that makes sense.</p></div><div className="projects">{projects.map((p,i) => <article className="project" key={p.number}><div className={`project-visual ${p.color}`} aria-label={`${p.subtitle} simplified illustration`}><div className="visual-top"><span>{p.number} / PROJECT NOTES</span><span>↗</span></div><ProjectVisual index={i}/><div className="visual-name">{p.subtitle}</div></div><div className="project-copy"><div className="eyebrow project-category">{p.category}</div><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div><div className="project-footer"><span className="project-status"><span className="tiny-dot"/>{p.status}</span><button className="project-toggle" onClick={() => setOpenProject(openProject === i ? null : i)} aria-expanded={openProject === i} aria-controls={`project-${i}`}>{openProject === i ? 'Close story' : 'The project story'}{openProject === i ? <Minus size={17}/> : <Plus size={17}/>}</button></div></div>{openProject === i && <div id={`project-${i}`} className="project-details">{p.details.map(([title,content]) => <div key={title}><h4>{title}</h4><p>{content}</p></div>)}</div>}</article>)}</div><p className="work-note"><span>↳</span> Client work delivered through Orange & Bronze. Fintech client name kept confidential.</p></section>
      <section className="toolkit section-wrap" aria-labelledby="toolkit-title"><div className="toolkit-heading"><div className="eyebrow">THE TOOLKIT</div><h2 id="toolkit-title">Good tools. <em>Thoughtful choices.</em></h2><p>A few technologies I’ve worked with. The problem always comes first.</p></div><div className="tech-grid">{tech.map(([id,name]) => <div className="tech" key={id}><Image src={`/logos/${id}.svg`} width={30} height={30} alt=""/><span>{name}</span></div>)}</div></section>
      <section id="approach" className="approach"><div className="section-wrap"><div className="approach-top"><div><div className="eyebrow">02 / HOW I THINK & BUILD</div><h2>Keep it simple.<br/>Make it <em>matter.</em></h2></div><div className="approach-principles"><p>“What does the business need?<br/>And what’s the budget?”</p><span>That’s usually where I start. Clear boundaries, practical decisions, and just enough architecture for the problem in front of us.</span></div></div><div className="approach-divider"/><div className="ai-layout"><div><div className="ai-label"><Sparkles size={16}/> AI-ASSISTED. HUMAN-OWNED.</div><h3>A better workflow.<br/>The same accountability.</h3><p>I brought a structured AI-assisted development workflow to my six-developer team. AI helps across the lifecycle. People own the decisions, reviews, and quality.</p><div className="ai-metric"><strong>~3×</strong><span>Observed feature implementation speed<br/><small>Team estimate, not a controlled measurement.</small></span></div></div><div className="workflow"><div className="workflow-tabs" role="tablist" aria-label="AI-assisted workflow">{workflow.map(([label],i) => <button key={label} id={`step-${i}`} role="tab" aria-selected={step===i} aria-controls="workflow-panel" tabIndex={step===i?0:-1} onClick={() => setStep(i)} onKeyDown={e => { if (e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='Home'||e.key==='End') { e.preventDefault(); const next=e.key==='Home'?0:e.key==='End'?4:(i+(e.key==='ArrowRight'?1:4))%5;setStep(next); document.getElementById(`step-${next}`)?.focus(); } }}><span>0{i+1}</span>{label}</button>)}</div><div className="workflow-panel" role="tabpanel" id="workflow-panel" aria-labelledby={`step-${step}`}><span className="workflow-number">0{step+1}</span><h4>{workflow[step][0]} with intention.</h4><p>{workflow[step][1]}</p><div className="workflow-note"><Check size={14}/> Human judgment at every step</div></div></div></div></div></section>
      <section id="about" className="about section-wrap"><div className="about-photo-wrap"><div className="about-photo"><Image src="/images/jeman-candid.webp" alt="A candid side view of Jeman at a laptop, wearing a blue bucket hat" fill sizes="(max-width: 700px) 90vw, 500px"/></div><div className="photo-tape"/><div className="about-caption">Same curiosity. Different tabs open. <span>↗</span></div><div className="little-note">a work in progress,<br/>in the best way.</div></div><div className="about-copy"><div className="eyebrow">03 / BEYOND THE CODE</div><h2>More than<br/><em>my browser tabs.</em></h2><p>I like understanding how things work. That curiosity follows me everywhere: into science fiction, layered music, unfamiliar places, and the little ideas I can’t help bringing to life.</p><p>I experiment with music, photography, and short films. I swim, skate, travel, and try to keep showing up for my fitness goals. Sometimes I make things just because making them is fun.</p><aside className="art-note" aria-labelledby="art-note-title"><div className="art-note-icon"><Palette size={21}/></div><div><h3 id="art-note-title">An artist, too.</h3><p>Digital art was a bigger part of my high school and college days. I create less often now, but that creative side is still part of me.</p><a className="text-link" href="https://www.instagram.com/orange_overlay/" target="_blank" rel="noopener noreferrer">Visit @orange_overlay <ArrowUpRight size={14}/></a></div></aside><blockquote>“I can do anything.”<span>Not because I know everything. Because I can learn.</span></blockquote><div className="interest-tags"><span><Music2 size={14}/> Making music</span><span><Camera size={14}/> Photography</span><span><BookOpen size={14}/> Science fiction</span><span><Waves size={14}/> Swimming & skating</span><span><Coffee size={14}/> Coffee & good company</span></div></div></section>
      <section id="food" className="food-section"><div className="section-wrap"><div className="food-heading"><div><div className="eyebrow">04 / THE VERY IMPORTANT FOOD SECTION</div><h2>Good code.<br/><em>Even better lunch plans.</em></h2></div><div className="food-intro"><span className="food-doodle">✳</span><p>A considerable portion of my extra money becomes dinner. No regrets. Here’s a little photo journal of the things I’ve happily eaten.</p><span>My camera eats first. Usually.</span></div></div><div className="food-toolbar"><div className="food-filters" aria-label="Filter food photos">{['All cravings','Savory','Sweet'].map(f => <button key={f} className={filter===f?'active':''} onClick={() => {setFilter(f);setShowAll(false);}} aria-pressed={filter===f}>{f}{f==='All cravings' && <span>{String(food.length).padStart(2, '0')}</span>}</button>)}</div><button className="shuffle-button" onClick={shuffleFood}><Shuffle size={14}/><span>Surprise me</span></button></div><div className="food-grid">{visibleFood.map((f) => <button className={`food-card${f.favorite ? " food-card-favorite" : ""}`} key={f.id} onClick={() => setSelected(f.id)} aria-label={`View photo: ${f.name} at ${f.restaurant}${f.favorite ? ", my favorite food in the world" : ""}`}><div className="food-photo"><Image src={f.image} alt={f.alt} fill sizes="(max-width: 600px) 85vw, (max-width: 900px) 45vw, 25vw"/><span className="food-zoom"><Plus size={20}/></span>{f.favorite && <span className="favorite-badge"><Heart size={11} fill="currentColor"/> ALL-TIME FAVORITE</span>}<span className="food-index">{String(f.id).padStart(2,'0')} / FOOD DIARY</span></div><div className="food-card-caption"><span><small className="food-restaurant">{f.restaurant}</small>{f.name}{f.favorite && <span className="favorite-caption">My favorite food in the world.</span>}</span><ArrowUpRight size={16}/></div></button>)}</div><div className="food-bottom"><p><Heart size={14}/> A personal collection. Best viewed when you’re not hungry.</p>{filtered.length>4 && <button className="text-link" onClick={() => setShowAll(!showAll)}>{showAll?'A little less temptation':'More from the camera roll'}{showAll?<Minus size={16}/>:<Plus size={16}/>}</button>}</div></div></section>
      <section id="contact" className="contact section-wrap"><div className="eyebrow">05 / LET’S CONNECT</div><div className="contact-layout"><div><h2>Something on your mind?<br/><em>Let’s talk about it.</em></h2><p>A software challenge, an interesting idea, or a restaurant I absolutely need to try. My inbox has room.</p></div><a href="mailto:jemanmama@gmail.com" className="contact-orb" aria-label="Email Jeman"><ArrowUpRight size={44} strokeWidth={1}/><span>Say hello</span></a></div><div className="contact-bottom"><a className="email-link" href="mailto:jemanmama@gmail.com">jemanmama@gmail.com <ArrowUpRight size={20}/></a><button className="copy-button" aria-label={copied ? "Email copied" : "Copy email address"} onClick={copyEmail}>{copied?<Check size={14}/>:<Copy size={14}/>}<span role="status">{copied?'Copied!':'Copy email'}</span></button><span className="contact-note">Good conversations start somewhere.</span></div><div className="contact-channels"><div className="phone-contact"><span className="eyebrow">CALL OR TEXT</span><a href="tel:+639614184490"><Phone size={17}/> +63 961 418 4490 <ArrowUpRight size={16}/></a></div><div className="social-contact"><span className="eyebrow">AROUND THE INTERNET</span><nav className="social-links" aria-label="Social profiles"><a href="https://www.facebook.com/jeman.daw/" target="_blank" rel="noopener noreferrer"><Facebook size={16}/> Facebook <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/jemanmama/" target="_blank" rel="noopener noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={13}/></a><a href="https://www.instagram.com/orange_overlay/" target="_blank" rel="noopener noreferrer"><Instagram size={16}/><span>Instagram <small>Digital art</small></span><ArrowUpRight size={13}/></a></nav></div></div></section>
    </main>
    <footer className="section-wrap"><a href="#" className="wordmark">jeman<span>✳</span><i/></a><span>© {new Date().getFullYear()} Jeman Mama <span className="footer-dot">·</span> Made with curiosity & a full stomach.</span><a className="back-top" href="#">Back to top <ArrowUpRight size={14}/></a></footer>
    {selectedFood && <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="photo-title" onClick={e => {if(e.target===e.currentTarget) setSelected(null);}}><button ref={closeRef} className="lightbox-close icon-button" aria-label="Close photo" onClick={() => setSelected(null)}><X/></button><button className="lightbox-prev icon-button" aria-label="Previous photo" onClick={() => movePhoto(-1)}><ChevronLeft/></button><div className="lightbox-content"><div className="lightbox-image"><Image src={selectedFood.image} alt={selectedFood.alt} fill sizes="(max-width:700px) 90vw, 800px" style={{objectFit:'contain'}}/></div>{selectedFood.favorite && <div className="lightbox-favorite"><Heart size={12} fill="currentColor"/> MY ALL-TIME FAVORITE</div>}<div className="lightbox-restaurant">{selectedFood.restaurant}</div><h3 id="photo-title">{selectedFood.name}</h3><p>{selectedFood.note}</p><small>{filtered.findIndex(f=>f.id===selectedFood.id)+1} / {filtered.length} · Use arrow keys to explore</small></div><button className="lightbox-next icon-button" aria-label="Next photo" onClick={() => movePhoto(1)}><ChevronRight/></button></div>}
  </>;
}
