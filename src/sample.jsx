import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Moon, Sun, Download } from "lucide-react";

/* ================= DATA ================= */

const PORTFOLIO_DATA = {
  name: "Aarushi Saki",
  title: "Frontend Engineering · Research · Product & Ops",
  positioning:
    "I work across frontend engineering, research, and operational strategy — translating complex problems into scalable, human-centered solutions.",
  email: "aarushi.saki13@gmail.com",
  socials: {
    github: "https://github.com/aarushisaki",
    linkedin: "https://linkedin.com/in/aarushisaki",
  },
};

/* ================= THEME ================= */

const ThemeContext = React.createContext();

const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const t = theme === "dark" ? "light" : "dark";
    setTheme(t);
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* ================= SIGNATURE ================= */

const SignatureSVG = () => (
  <svg viewBox="0 0 720 304" fill="currentColor">
    <path d="M273.8 248.9C269.8..." />
  </svg>
);

/* ================= NAVIGATION ================= */

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 px-4 md:px-12 py-3 flex items-center justify-between backdrop-blur-xl transition ${
          scrolled ? "bg-bg-primary/80 border-b border-border" : ""
        }`}
      >
        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xl"
        >
          {open ? "✕" : "☰"}
        </button>

        {/* Center logo */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <div
            className="w-16 md:w-28 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <SignatureSVG />
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 uppercase text-xs tracking-widest">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Theme */}
        <button onClick={toggleTheme} className="border rounded-full p-2">
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-primary flex flex-col items-center justify-center gap-10 uppercase tracking-widest text-xl"
          >
            {["work", "experience", "about", "contact"].map((l) => (
              <a key={l} href={`#${l}`} onClick={() => setOpen(false)}>
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ================= HERO ================= */

const Hero = () => {
  const { scrollY } = useScroll();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const yImg = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : 100]);
  const yText = useTransform(scrollY, [0, 400], [0, isMobile ? 0 : -50]);

  return (
    <section className="min-h-screen pt-20 flex items-center px-6 md:px-20 relative overflow-hidden">
      <motion.div
        style={{ y: yText }}
        className="max-w-xl z-10 space-y-6"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif">
          {PORTFOLIO_DATA.name}
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-text-secondary">
          {PORTFOLIO_DATA.positioning}
        </p>

        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-3 bg-accent px-6 py-3 rounded-full text-bg-primary"
        >
          <Download size={18} />
          Resume
        </a>
      </motion.div>

      {/* Image */}
      <motion.img
        style={{ y: yImg }}
        src="/aarushi.jpg"
        alt="Aarushi"
        className="absolute right-[-25%] md:right-0 bottom-0 h-[55vh] md:h-[85vh] object-cover"
      />
    </section>
  );
};

/* ================= CONTACT ================= */

const Contact = () => (
  <footer id="contact" className="py-24 text-center space-y-10">
    <h2 className="text-4xl md:text-6xl font-serif">
      Let’s build something <span className="text-accent">enduring</span>.
    </h2>

    <div className="flex justify-center gap-10">
      <a href={`mailto:${PORTFOLIO_DATA.email}`}>
        <Mail />
      </a>
      <a href={PORTFOLIO_DATA.socials.github}>
        <Github />
      </a>
      <a href={PORTFOLIO_DATA.socials.linkedin}>
        <Linkedin />
      </a>
    </div>

    <p className="text-xs opacity-60">
      © {new Date().getFullYear()} Aarushi Saki — overthought on purpose.
    </p>
  </footer>
);

/* ================= APP ================= */


export default function Portfolio() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-text-primary font-sans overflow-x-hidden transition-colors duration-300">
        <NoiseOverlay />

        <div style={{ opacity: introComplete ? 1 : 0, pointerEvents: introComplete ? 'auto' : 'none' }}>
          <Navigation />
        </div>
        
        <AnimatePresence>
          {!introComplete && (
            <IntroSequence onComplete={() => setIntroComplete(true)} />
          )}
        </AnimatePresence>

        <motion.main 
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Hero />
          <Projects />
          <Experience />
          <About />
          <Contact />
        </motion.main>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Geist:wght@300;400;500&display=swap');
          
          :root {
            --bg-primary: #0E0E11;
            --bg-secondary: #1F2933;
            --bg-tertiary: #2A3441;
            --text-primary: #E5E7EB;
            --text-secondary: #9CA3AF;
            --text-tertiary: #6B7280;
            --border: #374151;
            --accent: #3B82F6;
            --primary: #3B82F6;
          }

          [data-theme="light"] {
            --bg-primary: #E5E7EB;
            --bg-secondary: #F3F4F6;
            --bg-tertiary: #F9FAFB;
            --text-primary: #0E0E11;
            --text-secondary: #1F2933;
            --text-tertiary: #4B5563;
            --border: #D1D5DB;
            --accent: #3B82F6;
            --primary: #3B82F6;
          }

          .bg-bg-primary { background-color: var(--bg-primary); }
          .bg-bg-secondary { background-color: var(--bg-secondary); }
          .bg-bg-tertiary { background-color: var(--bg-tertiary); }
          .text-text-primary { color: var(--text-primary); }
          .text-text-secondary { color: var(--text-secondary); }
          .text-text-tertiary { color: var(--text-tertiary); }
          .border-border { border-color: var(--border); }
          .text-accent { color: var(--accent); }
          .bg-accent { background-color: var(--accent); }
          .border-accent { border-color: var(--accent); }
          .text-primary { color: var(--primary); }
          .bg-primary { background-color: var(--primary); }
          .border-primary { border-color: var(--primary); }
          
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Geist', sans-serif; }
          
          html { scroll-behavior: smooth; }

          @keyframes gradient {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .animate-gradient {
            animation: gradient 8s ease-in-out infinite;
          }

          /* Scrollbar Styling */
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: var(--bg-secondary);
          }

          ::-webkit-scrollbar-thumb {
            background: var(--accent);
            border-radius: 5px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: var(--primary);
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
}
