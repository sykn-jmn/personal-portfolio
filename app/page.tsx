'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import ExperienceYears from './experience-years';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Plus,
  Minus,
  Menu,
  X,
  Code2,
  Sparkles,
  Coffee,
  MapPin,
  Check,
  Copy,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Heart,
  Waves,
  Camera,
  Music2,
  BookOpen,
  MoveUpRight,
  Download,
  Facebook,
  Linkedin,
  Instagram,
  Phone,
  Palette,
} from 'lucide-react';

const tech = [
  ['java', 'Java'],
  ['spring', 'Spring Boot'],
  ['react', 'React'],
  ['vue', 'Vue 3'],
  ['postgresql', 'PostgreSQL'],
  ['docker', 'Docker'],
  ['kubernetes', 'Kubernetes'],
  ['aws', 'AWS'],
  ['redis', 'Redis'],
  ['kafka', 'Kafka'],
  ['gitlab', 'GitLab CI/CD'],
  ['grafana', 'Grafana'],
] as const;

const food = [
  {
    id: 9,
    restaurant: 'Ginza Gyu',
    name: 'Wagyu Skirt Claypot',
    note: 'My favorite food in the world. No contest.',
    favorite: true,
    type: 'Savory',
    alt: 'Wagyu Skirt Claypot at Ginza Gyu',
    image: '/images/food/ginza-gyu-wagyu-skirt-claypot.webp',
  },
  {
    id: 2,
    restaurant: 'Mendokoro Ramenba',
    name: 'Miso Tonkotsu Ramen',
    note: 'Some days just call for a big bowl of ramen.',
    type: 'Savory',
    alt: 'Miso Tonkotsu Ramen at Mendokoro Ramenba',
    image: '/images/food/mendokoro-ramenba-miso-tonkotsu-ramen.webp',
  },
  {
    id: 3,
    restaurant: 'Everything Yummy',
    name: 'Adobomb',
    note: 'A very good reason to order extra rice.',
    type: 'Savory',
    alt: 'Adobomb at Everything Yummy',
    image: '/images/food/everything-yummy-adobomb.webp',
  },
  {
    id: 4,
    restaurant: 'Mesa',
    name: 'Palitaw',
    note: 'The dessert stomach is a separate system.',
    type: 'Sweet',
    alt: 'Palitaw at Mesa',
    image: '/images/food/mesa-palitaw.webp',
  },
  {
    id: 1,
    restaurant: 'Tiong Bahru Singapore Flavours',
    name: 'Roasted Chicken Rice',
    note: 'A very good lunch decision.',
    type: 'Savory',
    alt: 'Roasted Chicken Rice at Tiong Bahru Singapore Flavours',
    image: '/images/food/tiong-bahru-singapore-flavours-roasted-chicken-rice.webp',
  },
  {
    id: 5,
    restaurant: 'Ding How',
    name: 'Pork Chop Rice, Steamed Cabbage Rolls, Steamed Pork Ribs',
    note: 'A table full of possibilities.',
    type: 'Savory',
    alt: 'Pork Chop Rice, Steamed Cabbage Rolls, Steamed Pork Ribs at Ding How',
    image: '/images/food/ding-how-pork-chop-rice-steamed-cabbage-rolls-steamed-pork-ribs.webp',
  },
  {
    id: 6,
    restaurant: 'Tiong Bahru Singapore Flavours',
    name: 'Fried Tofu in Special Sauce',
    note: 'For the "let\'s get one more thing" moments.',
    type: 'Savory',
    alt: 'Fried Tofu in Special Sauce at Tiong Bahru Singapore Flavours',
    image: '/images/food/tiong-bahru-singapore-flavours-fried-tofu-in-special-sauce.webp',
  },
  {
    id: 7,
    restaurant: 'Pardo',
    name: 'Angus Rib Set',
    note: 'Good food. Good company. A very full plate.',
    type: 'Savory',
    alt: 'Angus Rib Set at Pardo',
    image: '/images/food/pardo-angus-rib-set.webp',
  },
  {
    id: 8,
    restaurant: 'Everything Yummy',
    name: 'The Rib King',
    note: 'The kind of plan I’m happy to commit to.',
    type: 'Savory',
    alt: 'The Rib King at Everything Yummy',
    image: '/images/food/everything-yummy-the-rib-king.webp',
  },
];

const projects = [
  {
    number: '01',
    title: 'Lending operations that survive a bad batch day.',
    subtitle: 'Lending Operations Platform',
    category: 'MAJOR FINTECH CLIENT · MAR 2026–PRESENT',
    description:
      'I lead six developers and still write code: turning solution architecture into working services, unblocking delivery, and getting the system ready for production.',
    tags: ['Java', 'Spring Boot', 'Flowable', 'gRPC'],
    status: 'In development',
    color: 'sage',
    details: [
      [
        'The challenge',
        'Daily batch processing needed persistent execution state, retry handling, and clear failure visibility across system boundaries.',
      ],
      [
        'My contribution',
        'Implemented Flowable-based batch execution around a backend processing service using gRPC. The workflow persists aggregate status, retries configured errors, and supports manual retriggering. The processing service owns downstream execution and any internal checkpointing.',
      ],
      [
        'Beyond the code',
        'I lead development-side reviews, deployment runbooks, prerequisites, and cross-team coordination under the primary solution architect. The system has not yet received production traffic.',
      ],
    ],
  },
  {
    number: '02',
    title: 'Credit applications that reach partner banks safely.',
    subtitle: 'Digital Credit Application Platform',
    category: 'MAJOR FINTECH CLIENT · JUL 2024–OCT 2025',
    description:
      'Led full-stack delivery from a blank slate through gradual production rollout, connecting loan applicants with three partner banks.',
    tags: ['Vue 3', 'Spring Boot', 'OpenPGP', 'Kubernetes'],
    status: 'Delivered to production',
    color: 'peach',
    details: [
      [
        'The challenge',
        'Bring a digital credit application experience into mobile webviews and securely forward application information and supporting documents to partner banks.',
      ],
      [
        'My contribution',
        'Implemented a secure document delivery process: collect data and documents, create a ZIP, encrypt with OpenPGP, and deliver through internal SFTP synchronized with partner banks. The overall integration architecture was defined by the project architect.',
      ],
      [
        'Delivery & scale',
        'Used Firebase Remote Config for gradual frontend rollout and participated in the client\'s standard Kubernetes canary process. Approximate recalled scale: 100 TPS, predominantly reads, and 2,000 loan applications per month.',
      ],
    ],
  },
  {
    number: '03',
    title: 'Advisor consultations that stay in sync live.',
    subtitle: 'Financial Advisor Presentation Platform',
    category: 'FINANCIAL SERVICES · FEB 2023–FEB 2024',
    description:
      'Led a four-person team building shared financial consultations, covering platform work when we had no dedicated architect or DevOps engineer.',
    tags: ['React', 'WebSockets', 'AWS EKS', 'Tanzu'],
    status: 'Client engagement',
    color: 'lavender',
    details: [
      [
        'The challenge',
        'Let advisors and participants work through presentations and enter information together, with the backend remaining authoritative.',
      ],
      [
        'My contribution',
        'Helped implement real-time shared state with WebSockets and STOMP, including debounced inputs to reduce backend updates. Integrated consultation features across authentication, payments, document signing, and visualizations.',
      ],
      [
        'Platform ownership',
        'Installed Tanzu Application Platform and Tanzu PostgreSQL on AWS EKS and deployed the application. Sized infrastructure around the minimum practical platform requirements to keep cloud costs in view.',
      ],
    ],
  },
];

const workflow = [
  [
    'Refine',
    'Feed AI the business and repository context. Pull unclear requirements and edge cases into the open, then take the useful questions into refinement.',
  ],
  [
    'Plan',
    'Check the implementation plan against the ticket, architecture, and team conventions before anyone writes production code.',
  ],
  [
    'Build',
    'Use agents to help implement and test features, always against an approved plan and the existing codebase.',
  ],
  [
    'Review',
    'Human developers review the implementation. I stay a primary reviewer for requirements, engineering quality, and team conventions.',
  ],
  [
    'Ship',
    'Keep SIT and QA in place. Use AI for prerequisite checks, then coordinate a prepared deployment that people still own.',
  ],
] as const;

const navLinks = [
  ['Work', '#work'],
  ['Approach', '#approach'],
  ['Beyond the code', '#about'],
  ['The food side', '#food'],
] as const;

function ProjectVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="system-art">
        <div className="art-heading">
          <span className="tiny-dot" /> DAILY BATCH WORKFLOW <span>01:00</span>
        </div>
        <div className="flow-line">
          <div>
            <Code2 size={21} />
            <b>Batch Coordinator</b>
            <small>Flowable</small>
          </div>
          <ArrowRight size={18} />
          <div>
            <Sparkles size={21} />
            <b>Processing Service</b>
            <small>gRPC processing</small>
          </div>
        </div>
        <div className="batch-status">
          <span className="status-dot" /> PROCESSING <span>State persisted ↗</span>
        </div>
        <div className="art-bottom">
          Initialize <span>→</span> Process <span>→</span> Complete
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="market-art">
        <div className="mini-document">
          <span className="document-icon">↗</span>
          <small>
            APPLICATION PACKET
            <br />
            ZIP + OpenPGP
          </small>
          <div className="doc-lines">
            <i />
            <i />
            <i />
          </div>
          <div className="encrypted">
            <Check size={12} /> Encrypted & ready
          </div>
        </div>
        <div className="bank-list">
          <div>
            <span>01</span> Collect
          </div>
          <div>
            <span>02</span> Encrypt
          </div>
          <div>
            <span>03</span> Deliver <ArrowUpRight size={15} />
          </div>
        </div>
        <span className="visual-footnote">SIMPLIFIED SECURE DOCUMENT DELIVERY</span>
      </div>
    );
  }

  return (
    <div className="advisor-art">
      <div className="presentation">
        <div className="presentation-bar">
          <i />
          <i />
          <i />
          <span>Shared consultation</span>
        </div>
        <div className="chart-area">
          <div>
            <small>SHARED SESSION</small>
            <b>Same deck. Same form.</b>
            <p>Backend stays the source of truth.</p>
          </div>
          <div className="chart-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="connected">
          <span />
          <span /> Connected in real time <span className="live-dot" />
        </div>
      </div>
      <div className="cursor-label">
        <MoveUpRight size={15} /> Your advisor
      </div>
    </div>
  );
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.classList.add('is-visible');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show();
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [filter, setFilter] = useState('All cravings');
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState(food.map((f) => f.id));
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const ordered = order.map((id) => food.find((f) => f.id === id)!);
  const filtered = ordered.filter((f) => filter === 'All cravings' || f.type === filter);
  const visibleFood = showAll ? filtered : filtered.slice(0, 4);
  const selectedFood = food.find((f) => f.id === selected);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (selected === null) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const current = filtered.findIndex((f) => f.id === selected);
        const delta = e.key === 'ArrowRight' ? 1 : -1;
        setSelected(filtered[(current + delta + filtered.length) % filtered.length].id);
      }
      if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll<HTMLButtonElement>('.lightbox button'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
      lastFocus.current?.focus();
    };
  }, [selected, filter, order]); // eslint-disable-line react-hooks/exhaustive-deps

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('jemanmama@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = 'mailto:jemanmama@gmail.com';
    }
  }

  function shuffleFood() {
    setOrder((prev) => {
      const favoriteId = food.find((f) => f.favorite)?.id;
      const next = prev.filter((id) => id !== favoriteId);
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return favoriteId === undefined ? next : [favoriteId, ...next];
    });
  }

  function movePhoto(delta: number) {
    const i = filtered.findIndex((f) => f.id === selected);
    setSelected(filtered[(i + delta + filtered.length) % filtered.length].id);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav-wrap">
          <a href="#" className="wordmark" aria-label="Jeman Mama home">
            jeman <span aria-hidden="true" />
          </a>
          <nav aria-label="Main navigation" className={menu ? 'nav-open' : ''}>
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <a href="#contact" className="nav-contact" onClick={() => setMenu(false)}>
              Email me <ArrowUpRight size={16} />
            </a>
          </nav>
          <button
            className="menu-toggle icon-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-label={menu ? 'Close navigation' : 'Open navigation'}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero hero-animate" aria-labelledby="hero-brand">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> Software engineer · Dev lead · Usually hungry
            </p>
            <h1 id="hero-brand" className="hero-brand">
              Jeman <span>Mama</span>
            </h1>
            <p className="hero-title">I lead delivery. I still write the code.</p>
            <p className="hero-intro">
              At Orange & Bronze, I lead six developers on lending and credit systems. I stay close
              to the architecture, the tickets, and the questions that save us rework later.
            </p>
            <ExperienceYears />
            <div className="hero-actions">
              <a className="button primary" href="#work">
                See selected work <ArrowUpRight size={17} />
              </a>
              <a className="button secondary" href="/Jeman-Mama-CV.pdf" download="Jeman-Mama-CV.pdf">
                Download CV <Download size={17} />
              </a>
              <a className="text-link" href="#about">
                About me <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-meta">
              <span className="location">
                <MapPin size={13} /> Based in the Philippines
              </span>
              <span>
                Currently at <strong>Orange & Bronze Software Labs</strong>
              </span>
            </div>
          </div>
          <div className="hero-media" aria-hidden={false}>
            <Image
              src="/images/jeman-restaurant.webp"
              alt="Jeman Mama enjoying time at a restaurant"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="hero-media-caption">
              <span>Jeman, off the clock.</span>
              <span>01 / Outside work</span>
            </div>
          </div>
        </section>

        <div className="intro-strip section-wrap">
          <p>
            <span>In the code</span> and in the room when decisions get made.
          </p>
          <p>
            Usually thinking about architecture. <span>Occasionally, my next meal.</span>
          </p>
          <a href="#work" aria-label="Scroll to selected work">
            <ArrowDown size={18} />
          </a>
        </div>

        <section id="work" className="work-section section-wrap">
          <Reveal>
            <div className="section-heading">
              <div>
                <div className="eyebrow">01 / Selected work</div>
                <h2>
                  Lending, credit,
                  <br />
                  <em>and live consultations.</em>
                </h2>
              </div>
              <p>
                Recent client work through Orange & Bronze: a lending operations platform, a digital
                credit application flow, and a shared advisor consultation product.
              </p>
            </div>
          </Reveal>

          <div className="projects">
            {projects.map((p, i) => (
              <Reveal key={p.number}>
                <article className="project">
                  <div
                    className={`project-visual ${p.color}`}
                    aria-label={`${p.subtitle} simplified illustration`}
                  >
                    <div className="visual-top">
                      <span>{p.number} / Project notes</span>
                      <span>↗</span>
                    </div>
                    <ProjectVisual index={i} />
                    <div className="visual-name">{p.subtitle}</div>
                  </div>
                  <div className="project-copy">
                    <div className="eyebrow project-category">{p.category}</div>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="project-footer">
                      <span className="project-status">
                        <span className="tiny-dot" />
                        {p.status}
                      </span>
                      <button
                        className="project-toggle"
                        onClick={() => setOpenProject(openProject === i ? null : i)}
                        aria-expanded={openProject === i}
                        aria-controls={`project-${i}`}
                      >
                        {openProject === i ? 'Close story' : 'The project story'}
                        {openProject === i ? <Minus size={17} /> : <Plus size={17} />}
                      </button>
                    </div>
                  </div>
                  {openProject === i && (
                    <div id={`project-${i}`} className="project-details">
                      {p.details.map(([title, content]) => (
                        <div key={title}>
                          <h4>{title}</h4>
                          <p>{content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
          <p className="work-note">
            <span>↳</span> Client work delivered through Orange & Bronze. Fintech client name kept
            confidential.
          </p>
        </section>

        <section className="toolkit section-wrap" aria-labelledby="toolkit-title">
          <Reveal>
            <div className="toolkit-heading">
              <div className="eyebrow">The toolkit</div>
              <h2 id="toolkit-title">
                What I reach for <em>on the job.</em>
              </h2>
              <p>
                Java and Spring on the backend. React or Vue up front. Postgres, Redis, Kafka, and
                the usual cloud tooling when the system needs them.
              </p>
            </div>
            <div className="tech-grid">
              {tech.map(([id, name]) => (
                <div className="tech" key={id}>
                  <Image src={`/logos/${id}.svg`} width={30} height={30} alt="" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="approach" className="approach">
          <div className="section-wrap">
            <Reveal>
              <div className="approach-top">
                <div>
                  <div className="eyebrow">02 / How I think & build</div>
                  <h2>
                    Start with the need
                    <br />
                    and the <em>budget.</em>
                  </h2>
                </div>
                <div className="approach-principles">
                  <p>
                    "What does the business need?
                    <br />
                    And what's the budget?"
                  </p>
                  <span>
                    That's usually where I start: clear boundaries, and only as much architecture as
                    the problem needs.
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="approach-divider" />

            <Reveal>
              <div className="ai-layout">
                <div>
                  <div className="ai-label">
                    <Sparkles size={16} /> AI in the workflow. People on the decisions.
                  </div>
                  <h3>
                    We implement faster.
                    <br />
                    Reviews still catch the hard parts.
                  </h3>
                  <p>
                    I brought a structured AI-assisted development workflow to my six-developer team.
                    AI helps across refine, plan, build, review, and ship. People still own the
                    reviews and the quality bar.
                  </p>
                  <div className="ai-metric">
                    <strong>~3×</strong>
                    <span>
                      Observed feature implementation speed
                      <small>Team estimate, not a controlled measurement.</small>
                    </span>
                  </div>
                </div>
                <div className="workflow">
                  <div className="workflow-tabs" role="tablist" aria-label="AI-assisted workflow">
                    {workflow.map(([label], i) => (
                      <button
                        key={label}
                        id={`step-${i}`}
                        role="tab"
                        aria-selected={step === i}
                        aria-controls="workflow-panel"
                        tabIndex={step === i ? 0 : -1}
                        onClick={() => setStep(i)}
                        onKeyDown={(e) => {
                          if (
                            e.key === 'ArrowRight' ||
                            e.key === 'ArrowLeft' ||
                            e.key === 'Home' ||
                            e.key === 'End'
                          ) {
                            e.preventDefault();
                            const next =
                              e.key === 'Home'
                                ? 0
                                : e.key === 'End'
                                  ? 4
                                  : (i + (e.key === 'ArrowRight' ? 1 : 4)) % 5;
                            setStep(next);
                            document.getElementById(`step-${next}`)?.focus();
                          }
                        }}
                      >
                        <span>0{i + 1}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div
                    className="workflow-panel"
                    role="tabpanel"
                    id="workflow-panel"
                    aria-labelledby={`step-${step}`}
                  >
                    <span className="workflow-number">0{step + 1}</span>
                    <h4>{workflow[step][0]}</h4>
                    <p>{workflow[step][1]}</p>
                    <div className="workflow-note">
                      <Check size={14} /> A person still signs off
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="about section-wrap">
          <Reveal>
            <div className="about-photo-wrap">
              <div className="about-photo">
                <Image
                  src="/images/jeman-candid.webp"
                  alt="A candid side view of Jeman at a laptop, wearing a blue bucket hat"
                  fill
                  sizes="(max-width: 900px) 90vw, 500px"
                />
              </div>
              <div className="about-caption">
                Different tabs open. Same curiosity. <span>↗</span>
              </div>
              <div className="little-note">still figuring things out, happily.</div>
            </div>
          </Reveal>

          <Reveal>
            <div className="about-copy">
              <div className="eyebrow">03 / Beyond the code</div>
              <h2>
                Outside the IDE,
                <br />
                <em>I'm still poking at things.</em>
              </h2>
              <p>
                I like knowing how things work. That habit follows me into science fiction, layered
                music, unfamiliar places, and small ideas I end up building anyway.
              </p>
              <p>
                I dabble in music, photography, and short films. I swim, skate, travel, and keep
                showing up for fitness goals. Sometimes I make things because making them is fun.
              </p>
              <aside className="art-note" aria-labelledby="art-note-title">
                <div className="art-note-icon">
                  <Palette size={21} />
                </div>
                <div>
                  <h3 id="art-note-title">An artist, too.</h3>
                  <p>
                    Digital art took up a lot of my high school and college years. I make less now,
                    but that side of me never really left.
                  </p>
                  <a
                    className="text-link"
                    href="https://www.instagram.com/orange_overlay/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit @orange_overlay <ArrowUpRight size={14} />
                  </a>
                </div>
              </aside>
              <blockquote>
                "I can do anything."
                <span>I just learn whatever I'm missing.</span>
              </blockquote>
              <div className="interest-tags">
                <span>
                  <Music2 size={14} /> Making music
                </span>
                <span>
                  <Camera size={14} /> Photography
                </span>
                <span>
                  <BookOpen size={14} /> Science fiction
                </span>
                <span>
                  <Waves size={14} /> Swimming & skating
                </span>
                <span>
                  <Coffee size={14} /> Coffee & good company
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="food" className="food-section">
          <div className="section-wrap">
            <Reveal>
              <div className="food-heading">
                <div>
                  <div className="eyebrow">04 / The very important food section</div>
                  <h2>
                    My camera roll
                    <br />
                    <em>is mostly lunch.</em>
                  </h2>
                </div>
                <div className="food-intro">
                  <p>
                    A considerable portion of my extra money becomes dinner. No regrets. Here's a
                    photo journal of meals I've been happy to eat.
                  </p>
                  <span>My camera eats first. Usually.</span>
                </div>
              </div>
            </Reveal>

            <div className="food-toolbar">
              <div className="food-filters" aria-label="Filter food photos">
                {['All cravings', 'Savory', 'Sweet'].map((f) => (
                  <button
                    key={f}
                    className={filter === f ? 'active' : ''}
                    onClick={() => {
                      setFilter(f);
                      setShowAll(false);
                    }}
                    aria-pressed={filter === f}
                  >
                    {f}
                    {f === 'All cravings' && <span>{String(food.length).padStart(2, '0')}</span>}
                  </button>
                ))}
              </div>
              <button className="shuffle-button" onClick={shuffleFood}>
                <Shuffle size={14} />
                <span>Surprise me</span>
              </button>
            </div>

            <div className="food-grid">
              {visibleFood.map((f) => (
                <button
                  className={`food-card${f.favorite ? ' food-card-favorite' : ''}`}
                  key={f.id}
                  onClick={() => setSelected(f.id)}
                  aria-label={`View photo: ${f.name} at ${f.restaurant}${f.favorite ? ', my favorite food in the world' : ''}`}
                >
                  <div className="food-photo">
                    <Image
                      src={f.image}
                      alt={f.alt}
                      fill
                      sizes="(max-width: 600px) 85vw, (max-width: 900px) 45vw, 25vw"
                    />
                    <span className="food-zoom">
                      <Plus size={20} />
                    </span>
                    {f.favorite && (
                      <span className="favorite-badge">
                        <Heart size={11} fill="currentColor" /> ALL-TIME FAVORITE
                      </span>
                    )}
                    <span className="food-index">{String(f.id).padStart(2, '0')} / Food diary</span>
                  </div>
                  <div className="food-card-caption">
                    <span>
                      <small className="food-restaurant">{f.restaurant}</small>
                      {f.name}
                      {f.favorite && (
                        <span className="favorite-caption">My favorite food in the world.</span>
                      )}
                    </span>
                    <ArrowUpRight size={16} />
                  </div>
                </button>
              ))}
            </div>

            <div className="food-bottom">
              <p>
                <Heart size={14} /> Best viewed when you're not hungry.
              </p>
              {filtered.length > 4 && (
                <button className="text-link" onClick={() => setShowAll(!showAll)}>
                  {showAll ? 'Show fewer dishes' : 'More from the camera roll'}
                  {showAll ? <Minus size={16} /> : <Plus size={16} />}
                </button>
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-wrap">
          <Reveal>
            <div className="eyebrow">05 / Let's connect</div>
            <div className="contact-layout">
              <div>
                <h2>
                  Got a project,
                  <br />
                  <em>a question, or a restaurant tip?</em>
                </h2>
                <p>
                  Software challenges, odd ideas, and places I should eat are all fair game. Email,
                  call, or text works.
                </p>
              </div>
              <a href="mailto:jemanmama@gmail.com" className="contact-orb" aria-label="Email Jeman">
                <ArrowUpRight size={44} strokeWidth={1} />
                <span>Email me</span>
              </a>
            </div>
            <div className="contact-bottom">
              <a className="email-link" href="mailto:jemanmama@gmail.com">
                jemanmama@gmail.com <ArrowUpRight size={20} />
              </a>
              <button
                className="copy-button"
                aria-label={copied ? 'Email copied' : 'Copy email address'}
                onClick={copyEmail}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span role="status">{copied ? 'Copied' : 'Copy email'}</span>
              </button>
              <span className="contact-note">I read every message.</span>
            </div>
            <div className="contact-channels">
              <div className="phone-contact">
                <span className="eyebrow">Call or text</span>
                <a href="tel:+639614184490">
                  <Phone size={17} /> +63 961 418 4490 <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="social-contact">
                <span className="eyebrow">Around the internet</span>
                <nav className="social-links" aria-label="Social profiles">
                  <a
                    href="https://www.facebook.com/jeman.daw/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={16} /> Facebook <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jemanmama/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://www.instagram.com/orange_overlay/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={16} />
                    <span>
                      Instagram <small>Digital art</small>
                    </span>
                    <ArrowUpRight size={13} />
                  </a>
                </nav>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="section-wrap">
        <a href="#" className="wordmark">
          jeman <span aria-hidden="true" />
        </a>
        <span>
          © {new Date().getFullYear()} Jeman Mama <span className="footer-dot">·</span> Made with
          curiosity & a full stomach.
        </span>
        <a className="back-top" href="#">
          Back to top <ArrowUpRight size={14} />
        </a>
      </footer>

      {selectedFood && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <button
            ref={closeRef}
            className="lightbox-close icon-button"
            aria-label="Close photo"
            onClick={() => setSelected(null)}
          >
            <X />
          </button>
          <button
            className="lightbox-prev icon-button"
            aria-label="Previous photo"
            onClick={() => movePhoto(-1)}
          >
            <ChevronLeft />
          </button>
          <div className="lightbox-content">
            <div className="lightbox-image">
              <Image
                src={selectedFood.image}
                alt={selectedFood.alt}
                fill
                sizes="(max-width:700px) 90vw, 800px"
                style={{ objectFit: 'contain' }}
              />
            </div>
            {selectedFood.favorite && (
              <div className="lightbox-favorite">
                <Heart size={12} fill="currentColor" /> MY ALL-TIME FAVORITE
              </div>
            )}
            <div className="lightbox-restaurant">{selectedFood.restaurant}</div>
            <h3 id="photo-title">{selectedFood.name}</h3>
            <p>{selectedFood.note}</p>
            <small>
              {filtered.findIndex((f) => f.id === selectedFood.id) + 1} / {filtered.length} · Use
              arrow keys to explore
            </small>
          </div>
          <button
            className="lightbox-next icon-button"
            aria-label="Next photo"
            onClick={() => movePhoto(1)}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </>
  );
}
