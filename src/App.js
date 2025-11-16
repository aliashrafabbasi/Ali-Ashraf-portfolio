// src/App.js
import React, { useState, useEffect } from "react";
import { ReactTyped as Typed } from "react-typed";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import profilePic from "./assets/profile.jpg";



// Loader Component
const Loader = () => (
  <div className="loader">
    <div className="typing-dot"></div>
    <div className="typing-dot"></div>
    <div className="typing-dot"></div>
  </div>
);

// Navbar Component
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar neon-border">
      <div className="logo">Ali Ashraf</div>
      <div className={`nav-links ${open ? "open" : ""}`}>
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#certifications">Certifications</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <i className="bi bi-list"></i>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => (
  <section id="hero" className="hero-section">
    <div className="hero-content">
      <img
        src={profilePic}
        alt="Profile"
        className="profile-pic"
      />

      <h1>
        Hi, I am <span className="highlight">Ali Ashraf</span>
      </h1>
      <Typed
        strings={[
          "AI Developer",
          "Generative AI",
          "Large Language Models",
          "LangChain ",
          " Groq | Open AI | Claude",
          "FastAPI | Python",
          "Full Stack Developer",

        ]}
        typeSpeed={80}
        backSpeed={50}
        loop
      />
    </div>
    <div className="neural-bg"></div>
  </section>
);

// About Section
const About = () => (
<motion.section
  id="about"
  className="section neon-border"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h2>About Me</h2>
  <p>
    I’m a passionate and detail-oriented <strong>Generative AI & Backend Developer</strong>, with <strong>Python</strong> as my core language.
  </p>

  <p>I have hands-on experience in:</p>
  <ul>
    <li>Developing <strong>Generative AI applications</strong> using <strong>LangChain</strong> and <strong>LLMs</strong> (Groq, OpenAI, Claude, etc.).</li>
    <li>Building and managing <strong>REST APIs</strong> with <strong>FastAPI & Pydantic</strong>.</li>
    <li>Handling <strong>data and AI workflows</strong> efficiently.</li>
  </ul>

  <p>
    Alongside AI, I also develop dynamic web applications using <strong>Laravel, PHP, and JavaScript</strong>, styled with <strong>Tailwind CSS & Bootstrap</strong>.
  </p>

  <ul>
    <li>🔹 I specialize in creating <strong>efficient backends, smart AI solutions, and seamless API integrations</strong>.</li>
    <li>🔹 I’m always learning and exploring <strong>new tools, frameworks, and technologies</strong> in the AI and software development space.</li>
  </ul>

  <p>
    🚀 Let’s connect to discuss innovative ideas and opportunities in <strong>Generative AI, backend development, and automation</strong>!
  </p>

  <p>Previous experience:</p>
  <ul>
    <li>4 months at <strong>Corex International</strong> as Social Media Marketing Intern</li>
    <li>3 months at <strong>Infinite Marketing Solutions</strong>, promoting travel services</li>
  </ul>
</motion.section>

);

// Projects Section
const Projects = () => {
  const projectList = [
    {
      name: "ALFRED-X AI Chatbot",
      live: "https://ai-chatbot789.netlify.app/",
      github: "https://github.com/aliashrafabbasi/LYRA-AI-BOT-Backend",
    },
    {
      name: "Lyra AI Bot ",
      live: "#",
      github: "https://github.com/aliashrafabbasi/LYRA-AI-BOT-Backend",
      comingSoon: true,
    },
    // {
    //   name: "Lyra AI Bot Frontend",
    //   live: "#",
    //   github: "https://github.com/aliashrafabbasi/LYRA-AI-BOT-frontend",
    //   comingSoon: true,
    // },
  ];

  return (
    <motion.section
      id="projects"
      className="section neon-border"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2>Projects</h2>
      <div className="project-container">
        {projectList.map((project, idx) => (
          <motion.div
            key={idx}
            className="project-card"
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <h3>{project.name}</h3>
            <div className="project-links">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                style={{ pointerEvents: project.comingSoon ? "none" : "auto", opacity: project.comingSoon ? 0.6 : 1 }}
              >
                {project.comingSoon ? "Coming Soon" : "Live Demo"}
              </a>
              <a href={project.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// Certifications Section
const Certifications = () => (
  <motion.section
    id="certifications"
    className="section neon-border"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2>Certifications & Qualifications</h2>
    <ul>
      <li>BS in Artificial Intelligence from Iqra University (2025 - 2028)</li>
      <li>Web Development (Aptech: HTML, CSS, JS, Bootstrap, PHP, Laravel, MySQL)</li>
      <li>Diploma Associate Engineering in Computer information Technology from Aligarh institute of Technology (2021 - 2023)</li>
      <li>Labour laws and I.R professional.</li>
      <li>Certificate information technology (7 months short course).</li>
    </ul>
  </motion.section>
);

// Contact Section
const Contact = () => (
  <motion.section
    id="contact"
    className="section neon-border"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h2>Contact Me</h2>
    <p>Email: <a href="mailto:aliashrafabbasi3@gmail.com">aliashrafabbasi3@gmail.com</a></p>
    <p>Phone: +923111041901</p>
    <div className="socials">
      <a href="https://www.facebook.com/ali.abbasi.118402/" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a>
      <a href="https://www.linkedin.com/in/ali-ashraf-a29b3727b/" target="_blank" rel="noreferrer"><i className="bi bi-linkedin"></i></a>
      <a href="https://www.instagram.com/aliabbasi_ssj18/" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
      <a href="https://github.com/aliashrafabbasi" target="_blank" rel="noreferrer"><i className="bi bi-github"></i></a>
    </div>
  </motion.section>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading && <Loader />}
      <Navbar />
      <HeroSection />
      <About />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
}

export default App;
