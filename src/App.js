// src/App.js
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import profilePic from "./assets/profile.jpg";

const RESUME_URL = `${process.env.PUBLIC_URL}/Ali-Ashraf-Resume.pdf`;

const NAV_LINKS = [
  { href: "#hero", label: "Home", id: "hero" },
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#resume", label: "Resume", id: "resume" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

const sectionMotion = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="section-heading">
    <h2>{title}</h2>
    <span className="section-heading-line" aria-hidden="true" />
    {subtitle && <p className="section-heading-sub">{subtitle}</p>}
  </div>
);

const Loader = ({ fading }) => (
  <div className={`loader-overlay ${fading ? "fade-out" : ""}`}>
    <div className="loader">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  </div>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {open && (
        <button
          type="button"
          className="nav-overlay"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="brand" onClick={closeMenu} aria-label="Ali Ashraf — Home">
          <span className="brand-wordmark">Ali Ashraf</span>
          <span className="brand-tagline">AI Backend Developer</span>
        </a>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {NAV_LINKS.map(({ href, label, id }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className={activeSection === id ? "active" : ""}
            >
              {label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`} />
        </button>
      </nav>
    </>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <i className="bi bi-arrow-up" />
    </button>
  );
};

const HERO_SKILLS = [
  "Generative AI & LLMs",
  "FastAPI & Python",
  "LangChain & Prompt Engineering",
  "REST APIs & Pydantic",
  "PostgreSQL | MongoDB | DynamoDB",
  "Docker & AWS",
  "RPA Automation",
];

const Typewriter = ({ strings, typeMs = 72, deleteMs = 42, pauseMs = 2400 }) => {
  const [text, setText] = useState("");
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    let timeoutId;

    const tick = () => {
      const i = indexRef.current;
      const current = strings[i];
      const deleting = deletingRef.current;

      if (!deleting) {
        charRef.current += 1;
        setText(current.slice(0, charRef.current));

        if (charRef.current >= current.length) {
          timeoutId = setTimeout(() => {
            deletingRef.current = true;
            tick();
          }, pauseMs);
          return;
        }
        timeoutId = setTimeout(tick, typeMs);
      } else {
        charRef.current -= 1;
        setText(current.slice(0, charRef.current));

        if (charRef.current <= 0) {
          deletingRef.current = false;
          indexRef.current = (i + 1) % strings.length;
          timeoutId = setTimeout(tick, typeMs);
          return;
        }
        timeoutId = setTimeout(tick, deleteMs);
      }
    };

    timeoutId = setTimeout(tick, typeMs);
    return () => clearTimeout(timeoutId);
  }, [strings, typeMs, deleteMs, pauseMs]);

  return (
    <span className="hero-typed" aria-live="polite">
      {text}
      <span className="hero-cursor" aria-hidden="true" />
    </span>
  );
};

const HeroSection = () => (
  <section id="hero" className="hero-section">
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid" />
    </div>

    <motion.div
      className="hero-content"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="profile-pic-wrap"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <img
          src={profilePic}
          alt="Ali Ashraf"
          className="profile-pic"
          width={168}
          height={168}
          decoding="async"
        />
      </motion.div>

      <h1>
        Hi, I am <span className="highlight">Ali Ashraf</span>
      </h1>
      <p className="hero-role">AI Backend Developer</p>
      <div className="hero-typed-wrap">
        <Typewriter strings={HERO_SKILLS} typeMs={72} deleteMs={42} pauseMs={2400} />
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <span className="hero-stat-value">6+</span>
          <span className="hero-stat-label">Months Experience</span>
        </div>
        <div className="hero-stat-divider" aria-hidden="true" />
        <div className="hero-stat">
          <span className="hero-stat-value">6</span>
          <span className="hero-stat-label">AI Projects</span>
        </div>
        <div className="hero-stat-divider" aria-hidden="true" />
        <div className="hero-stat">
          <span className="hero-stat-value">10+</span>
          <span className="hero-stat-label">Core Skills</span>
        </div>
      </div>

      <div className="hero-cta">
        <a href="#projects" className="btn btn-primary">
          <i className="bi bi-folder2-open" /> View Projects
        </a>
        <a href="#resume" className="btn btn-outline">
          <i className="bi bi-file-earmark-pdf" /> Resume
        </a>
        <a href="#contact" className="btn btn-ghost">
          <i className="bi bi-envelope" /> Contact
        </a>
      </div>
    </motion.div>

    <a href="#about" className="scroll-hint" aria-label="Scroll down">
      <span>Scroll</span>
      <i className="bi bi-chevron-down" />
    </a>
  </section>
);

const About = () => (
  <motion.section id="about" className="section" {...sectionMotion}>
    <SectionHeading
      title="About Me"
      subtitle="Building intelligent backends with Generative AI"
    />
    <div className="about-content">
      <p>
        Results-driven <strong>AI Backend Developer</strong> with strong expertise in
        Generative AI and backend system development. I build AI-powered applications by
        integrating <strong>Large Language Models (LLMs)</strong> into scalable backends
        using <strong>Python</strong>, <strong>FastAPI</strong>, and modern AI frameworks.
      </p>
      <p>
        Skilled in designing <strong>RESTful APIs</strong>, AI chatbots, intelligent
        automation, and maintainable backend workflows. Experienced with{" "}
        <strong>PostgreSQL</strong>, <strong>MongoDB</strong>, <strong>SQLite</strong>, and{" "}
        <strong>SQLAlchemy ORM</strong>, plus <strong>Docker</strong>, <strong>AWS S3</strong>,
        and <strong>RPA</strong> for deploying and managing AI backend services.
      </p>
      <p>
        <strong>6 months</strong> of hands-on experience in AI backend development — focused on
        AI integration, backend optimization, and intelligent data processing. Passionate
        about backend scalability, cloud integrations, and automation for modern intelligent
        applications.
      </p>
    </div>
  </motion.section>
);

const SKILL_ICONS = {
  Languages: "bi-code-slash",
  "Backend & AI": "bi-cpu",
  Databases: "bi-database",
  "API & Tools": "bi-plug",
  "Frontend (Basic)": "bi-window",
  "Cloud & Platforms": "bi-cloud",
};

const Skills = () => {
  const skillGroups = [
    { title: "Languages", items: ["Python", "JavaScript", "TypeScript"] },
    {
      title: "Backend & AI",
      items: ["FastAPI", "LangChain", "LLMs", "Prompt Engineering", "RPA"],
    },
    {
      title: "Databases",
      items: ["PostgreSQL", "MongoDB", "SQLite", "DynamoDB", "SQLAlchemy"],
    },
    {
      title: "API & Tools",
      items: ["RESTful APIs", "Pydantic", "JSON", "Git & GitHub", "Bitbucket", "Docker"],
    },
    {
      title: "Frontend (Basic)",
      items: ["HTML", "CSS", "Tailwind CSS", "Bootstrap", "React.js"],
    },
    { title: "Cloud & Platforms", items: ["AWS S3", "AWS Textract", "Netlify"] },
  ];

  return (
    <motion.section id="skills" className="section" {...sectionMotion}>
      <SectionHeading title="Technical Skills" subtitle="Tools and technologies I work with" />
      <div className="skills-grid">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.title}
            className="skill-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06, duration: 0.4 }}
            whileHover={{ y: -4 }}
          >
            <h3>
              <i className={`bi ${SKILL_ICONS[group.title] || "bi-gear"}`} />
              {group.title}
            </h3>
            <ul className="skill-tags">
              {group.items.map((item) => (
                <li key={item} className="skill-tag">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const Experience = () => (
  <motion.section id="experience" className="section" {...sectionMotion}>
    <SectionHeading title="Experience" subtitle="Professional work history" />
    <div className="experience-card">
      <div className="experience-header">
        <h3>AI Backend Developer</h3>
        <span className="experience-badge">5 Months</span>
        <span className="experience-meta">Ignite & Infinite</span>
      </div>
      <ul className="experience-list">
        <li>
          Built AI-powered backend solutions with FastAPI, Docker, PostgreSQL, and DynamoDB.
        </li>
        <li>
          Integrated LangChain workflows and RPA automation for intelligent processing pipelines.
        </li>
        <li>
          Implemented AWS Textract for OCR-based document processing and data extraction.
        </li>
      </ul>
    </div>
  </motion.section>
);

const Projects = () => {
  const projectList = [
    {
      name: "ALFRED-X AI Chatbot",
      description:
        "AI chatbot with FastAPI and Groq LLMs, LangChain prompt logic, and REST APIs for scalable user interaction and response handling.",
      tags: ["FastAPI", "Groq", "LangChain", "REST API"],
      live: "https://ai-chatbot789.netlify.app/",
      github: "https://github.com/aliashrafabbasi/Alfred-X",
    },
    {
      name: "Document OCR Field Extractor",
      description:
        "FastAPI backend that uses AWS Textract to extract text and structured fields from images and PDFs. Supports document orchestration workflows for OCR-based data processing and automation.",
      tags: ["FastAPI", "AWS Textract", "OCR", "PDF"],
      icon: "bi-file-earmark-text",
      live: null,
      github:
        "https://github.com/aliashrafabbasi/Document-OCR-Field-Extractor-With-using-AI",
    },
    {
      name: "Intellectual-AI",
      description:
        "Full-stack AI chatbot with FastAPI, React, TypeScript, and Groq. Streaming responses, MongoDB chat history, and LangChain multilingual workflows.",
      tags: ["FastAPI", "React", "MongoDB", "TypeScript"],
      live: null,
      github: "https://github.com/aliashrafabbasi/Intellectual_AI",
    },
    {
      name: "Lyra AI Bot",
      description:
        "Intelligent AI assistant backend with modular FastAPI architecture and Groq integration. Deployment in progress.",
      tags: ["FastAPI", "Groq", "Modular API"],
      live: null,
      github: "https://github.com/aliashrafabbasi/LYRA-AI-BOT-Backend",
      comingSoon: true,
    },
    {
      name: "RAG-Chat-Application",
      description:
        "Ask questions about your PDFs — powered by retrieval-augmented generation.Upload a document, embed its contents into a vector index, and get grounded answers from an LLM using only what’s in the file.",
      tags: ["FastAPI", "Python", "FAISS","Vector search","Groq:llama3.3"],
      live: "https://rag-chat-application.netlify.app/",
      github: "https://github.com/aliashrafabbasi/rag-chatbot",
      
    },
    {
      name: "AI Resume Screener",
      description:
        "An AI-powered resume screener that turns CVs into instant hiring insights — match score, skills analysis, and smart recommendations.",
      tags: ["FastAPI", "Python", "Groq", "Sentence Transformers", "Scikit-learn", "NumPy", "REST API", "Docker", "pypdf", "Netlify"],
      live: "https://hirelens-ai-app.netlify.app",
      github: "https://github.com/aliashrafabbasi/ai-resume-screener",
    },
  ];

  return (
    <motion.section id="projects" className="section" {...sectionMotion}>
      <SectionHeading title="Projects" subtitle="AI backends and applications I've built" />
      <div className="project-container">
        {projectList.map((project, idx) => (
          <motion.article
            key={project.name}
            className="project-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.45 }}
            whileHover={{ y: -6 }}
          >
            <div className="project-card-header">
              <span className="project-icon">
                <i className={`bi ${project.icon || "bi-robot"}`} />
              </span>
              <h3>{project.name}</h3>
            </div>
            <p className="project-desc">{project.description}</p>
            <ul className="project-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="project-links">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link-btn"
                >
                  <i className="bi bi-box-arrow-up-right" /> Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link-btn"
                >
                  <i className="bi bi-github" /> GitHub
                </a>
              )}
              {project.comingSoon && (
                <span className="coming-soon">Deployment coming soon</span>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

const Education = () => {
  const items = [
    {
      icon: "bi-mortarboard",
      title: "BS in Artificial Intelligence",
      detail: "Iqra University (2025 – 2028)",
    },
    {
      icon: "bi-pc-display",
      title: "DAE in Computer Information Technology",
      detail: "Aligarh Institute of Technology (2021 – 2023)",
    },
    {
      icon: "bi-globe2",
      title: "Web Development Certification",
      detail: "Aptech — HTML, CSS, JavaScript, Bootstrap, PHP, Laravel, MySQL",
    },
    {
      icon: "bi-award",
      title: "Certificate in Information Technology",
      detail: "7-month professional course",
    },
  ];

  return (
    <motion.section id="education" className="section" {...sectionMotion}>
      <SectionHeading title="Education & Certifications" subtitle="Academic and professional training" />
      <ul className="education-list">
        {items.map((item, idx) => (
          <motion.li
            key={item.title}
            className="education-item"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.07, duration: 0.4 }}
          >
            <span className="education-icon">
              <i className={`bi ${item.icon}`} />
            </span>
            <div className="education-text">
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
};

const Resume = () => {
  const [showCv, setShowCv] = useState(false);

  return (
    <motion.section id="resume" className="section resume-section" {...sectionMotion}>
      <SectionHeading
        title="Resume"
        subtitle="View my CV with clear formatting — same layout as the original PDF"
      />
      <div className="resume-actions">
        <button
          type="button"
          className="resume-action-btn resume-toggle-btn"
          onClick={() => setShowCv((prev) => !prev)}
          aria-expanded={showCv}
        >
          <i className={`bi ${showCv ? "bi-eye-slash" : "bi-eye"}`} />
          {showCv ? "Hide CV" : "Show CV"}
        </button>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="resume-action-btn"
        >
          <i className="bi bi-box-arrow-up-right" /> Open in new tab
        </a>
        <a
          href={RESUME_URL}
          download="Ali-Ashraf-Resume.pdf"
          className="resume-action-btn resume-action-btn--primary"
        >
          <i className="bi bi-download" /> Download PDF
        </a>
      </div>
      {showCv && (
        <motion.div
          className="resume-viewer-wrap"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <object
            data={`${RESUME_URL}#view=FitH&navpanes=0`}
            type="application/pdf"
            className="resume-pdf"
            aria-label="Ali Ashraf resume PDF"
          >
            <iframe
              src={`${RESUME_URL}#view=FitH`}
              title="Ali Ashraf Resume"
              className="resume-pdf"
            />
          </object>
        </motion.div>
      )}
    </motion.section>
  );
};

const Contact = () => {
  const contactItems = [
    {
      icon: "bi-envelope-fill",
      label: "Email",
      value: "aliashrafabbasi3@gmail.com",
      href: "mailto:aliashrafabbasi3@gmail.com",
    },
    {
      icon: "bi-telephone-fill",
      label: "Phone",
      value: "+92 311 1041901",
      href: "tel:+923111041901",
    },
    {
      icon: "bi-github",
      label: "GitHub",
      value: "github.com/aliashrafabbasi",
      href: "https://github.com/aliashrafabbasi",
      external: true,
    },
  ];

  const socialLinks = [
    {
      icon: "bi-linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ali-ashraf-a29b3727b/",
      className: "social-linkedin",
    },
    {
      icon: "bi-facebook",
      label: "Facebook",
      href: "https://www.facebook.com/ali.abbasi.118402/",
      className: "social-facebook",
    },
    {
      icon: "bi-instagram",
      label: "Instagram",
      href: "https://www.instagram.com/aliabbasi_ssj18/",
      className: "social-instagram",
    },
    {
      icon: "bi-twitter-x",
      label: "Twitter",
      href: "https://x.com/aliabbasi_ssj18",
      className: "social-twitter",
    },
  ];

  return (
    <motion.section id="contact" className="section contact-section" {...sectionMotion}>
      <SectionHeading
        title="Get In Touch"
        subtitle="Open to collaborations, AI backend roles, and interesting tech projects"
      />

      <div className="contact-grid">
        {contactItems.map((item, idx) => (
          <motion.a
            key={item.label}
            href={item.href}
            className="contact-card"
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            whileHover={{ y: -6 }}
          >
            <span className="contact-icon-wrap">
              <i className={`bi ${item.icon}`} />
            </span>
            <span className="contact-label">{item.label}</span>
            <span className="contact-value">{item.value}</span>
          </motion.a>
        ))}
      </div>

      <div className="contact-social-block">
        <p className="contact-social-title">Connect with me</p>
        <div className="socials">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`social-btn ${social.className}`}
              aria-label={social.label}
            >
              <i className={`bi ${social.icon}`} />
              <span>{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Footer = () => (
  <footer className="site-footer">
    <p>
      © {new Date().getFullYear()} <span>Ali Ashraf</span> — AI Backend Developer
    </p>
  </footer>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [loaderFade, setLoaderFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLoaderFade(true), 500);
    const hideTimer = setTimeout(() => setLoading(false), 900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="App">
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      {loading && <Loader fading={loaderFade} />}
      <Navbar />
      <BackToTop />
      <HeroSection />
      <main className="page-main">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
