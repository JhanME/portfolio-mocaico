"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Github,
  Linkedin,
  Cpu,
  Terminal,
  Layers,
  MapPin,
  Mail,
  FileText,
  Menu,
  X
} from 'lucide-react';

// --- DATOS DEL USUARIO ---
const DATA = {
  name: "Jhan Mocaico",
  role: "FullStack Developer",
  intro: "Desarrollo aplicaciones completas y las llevo a producción. Actualmente construyendo mi propia startup de EdTech mientras trabajo en proyectos reales de software.",
  description: "Transformo ideas en software funcional. Tengo experiencia construyendo desde APIs y bases de datos hasta interfaces de usuario, siempre con foco en entregar valor.",
  experience: {
    company: "Galio Electronics",
    role: "Software Developer / IoT Engineer",
    period: "Enero 2026 - Actualidad",
    description: "Diseñé e implementé sistemas end-to-end, integraciones cloud y herramientas internas que redujeron tiempos de respuesta ante incidencias mediante automatización con IA.",
    url: "https://galio.dev"
  },
  skills: {
    frontend: ["React / Next.js", "TypeScript", "Tailwind / SCSS"],
    backend: ["Node.js / FastAPI", "PostgreSQL", "Rest APIs"],
    infrastructure: ["AWS / Docker", "n8n/ K8s", "CI/CD Pipelines", "LLMs / RAG"]
  },
  projects: [
    {
      title: "Algoritmia",
      subtitle: "Intérprete de música a código",
      desc: "Sistema que transforma pseudocódigo en partituras PDF, MIDI y audio WAV. Conecta lógica computacional con expresión artística.",
      tags: ["Python", "ANTLR4", "Docker", "LilyPond"],
      image: "/algoritmia.png"
    },
    {
      title: "Fonekids",
      subtitle: "Plataforma educativa",
      desc: "Plataforma interactiva y adaptativa para niños. Perfiles personalizados y experiencias educativas visuales.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      image: "/fonekids.png"
    },
    {
      title: "AirGuardian",
      subtitle: "Monitoreo IoT",
      desc: "Sistema de calidad del aire en interiores. Integra sensores físicos, diseño PCB y visualización de datos en tiempo real.",
      tags: ["C/C++", "Node-RED", "PCB Design", "IoT"],
      image: "/airguardian.png"
    }
  ],
  contact: {
    email: "hi@mocaico.dev",
    location: "Lima, Perú",
    cv: "/Jhan_Mocaico_CVv.pdf",
    github: "https://github.com/JhanME",
    linkedin: "https://www.linkedin.com/in/jhanmocaico"
  }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activePhoto, setActivePhoto] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (isScrollingRef.current) return;

      const sections = ['inicio', 'philosophy', 'experiencia', 'proyectos', 'contacto'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 900);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": DATA.name,
    "url": "https://mocaico.dev",
    "image": "https://mocaico.dev/mocaico.jpeg",
    "sameAs": [DATA.contact.linkedin, DATA.contact.github],
    "jobTitle": DATA.role,
    "knowsAbout": ["FullStack", "IoT", "Next.js", "Docker", "Sistemas Embebidos"]
  };

  return (
    <div className="relative overflow-x-hidden bg-deep-charcoal text-zinc-50 selection:bg-accent-emerald/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Grid */}
      <div className="fixed inset-0 grid-lines pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b border-border-subtle transition-all duration-300 ${scrolled ? 'bg-deep-charcoal/80 backdrop-blur-md h-16' : 'bg-transparent h-20'
        }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <button
            onClick={() => scrollToSection('inicio')}
            className="font-mono font-bold text-lg tracking-tighter hover:opacity-80 transition-opacity"
          >
            MOCAICO<span className="text-accent-emerald">.</span>DEV
          </button>

          <div className="hidden md:flex gap-12 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
            {[
              { id: 'philosophy', label: '01. FILOSOFÍA' },
              { id: 'experiencia', label: '02. EXPERIENCIA' },
              { id: 'proyectos', label: '03. PROYECTOS' },
              { id: 'contacto', label: '04. CONTACTO' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`hover:text-accent-emerald transition-colors ${activeSection === item.id ? 'text-accent-emerald' : ''
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            v2.1.26 // STABLE
          </div>

          {/* Hamburger button — solo mobile */}
          <button
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border-subtle bg-deep-charcoal/95 backdrop-blur-md">
            <div className="flex flex-col font-mono text-[11px] uppercase tracking-widest text-zinc-400 px-6 py-4 gap-5">
              {[
                { id: 'philosophy', label: '01. FILOSOFÍA' },
                { id: 'experiencia', label: '02. EXPERIENCIA' },
                { id: 'proyectos', label: '03. PROYECTOS' },
                { id: 'contacto', label: '04. CONTACTO' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { scrollToSection(item.id); setMenuOpen(false); }}
                  className={`text-left hover:text-accent-emerald transition-colors ${activeSection === item.id ? 'text-accent-emerald' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="inicio" className="min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col justify-center" data-animate>
              {/* Profile Information */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
                  {DATA.name}
                </h1>
                <p className="text-2xl md:text-3xl text-zinc-300 font-medium mb-4">
                  {DATA.role}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 font-mono text-sm uppercase tracking-widest mb-8">
                  <MapPin className="w-4 h-4 text-accent-emerald" />
                  {DATA.contact.location}
                </div>

                {/* Social & Contact Buttons (Square Style) */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-12">
                  {/* Email Button */}
                  <a
                    href={`mailto:${DATA.contact.email}`}
                    className="h-11 flex items-center gap-2 bg-accent-emerald text-white hover:bg-white hover:text-zinc-900 px-3 md:px-6 transition-all shadow-lg shadow-accent-emerald/20 border border-transparent group"
                  >
                    <Mail className="w-4 h-4 shrink-0 transition-colors group-hover:text-zinc-900" />
                    <span className="font-mono text-[10px] md:text-[11px] font-bold tracking-tight md:tracking-[0.15em] uppercase transition-colors">
                      {DATA.contact.email}
                    </span>
                  </a>

                  {/* CV Square Button */}
                  <a
                    href={DATA.contact.cv}
                    target="_blank"
                    className="w-11 h-11 flex items-center justify-center border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-accent-emerald hover:border-accent-emerald transition-all"
                    title="Ver CV"
                  >
                    <FileText className="w-4 h-4" />
                  </a>

                  {/* GitHub Square Button */}
                  <a
                    href={DATA.contact.github}
                    target="_blank"
                    className="w-11 h-11 flex items-center justify-center border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-accent-emerald hover:border-accent-emerald transition-all"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {/* LinkedIn Square Button */}
                  <a
                    href={DATA.contact.linkedin}
                    target="_blank"
                    className="w-11 h-11 flex items-center justify-center border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-accent-emerald hover:border-accent-emerald transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Intro text */}
              <div className="max-w-xl text-center md:text-left">
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                  {DATA.intro}
                </p>
              </div>
            </div>

            {/* Initial Image Style (Right) */}
            <div className="lg:col-span-4 flex items-center justify-center relative" data-animate style={{ transitionDelay: '0.2s' }}>
              <div
                className="w-full aspect-square border border-border-subtle relative flex items-center justify-center overflow-hidden group"
                onClick={() => setActivePhoto(p => !p)}
              >
                <div className={`absolute inset-0 transition-opacity ${activePhoto ? 'opacity-30' : 'opacity-20 group-hover:opacity-30'}`}>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" r="40" stroke="white" strokeWidth="0.1"></circle>
                    <circle cx="50" cy="50" fill="none" r="30" stroke="white" strokeWidth="0.1"></circle>
                    <path d="M50 10 L50 90 M10 50 L90 50" stroke="white" strokeWidth="0.1"></path>
                  </svg>
                </div>
                <div className="relative z-10 w-full h-full">
                  <Image
                    src="/mocaico.jpeg"
                    alt={DATA.name}
                    fill
                    className={`object-cover transition-all duration-700 ${activePhoto ? 'grayscale-0 opacity-100' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-32 border-t border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4" data-animate>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent-emerald mb-4">
                [ 01 ] Filosofía
              </h2>
              <h3 className="text-4xl font-bold text-white leading-tight">
                Mi forma de construir<span className="text-accent-emerald">.</span>
              </h3>
            </div>
            <div className="lg:col-span-8" data-animate style={{ transitionDelay: '0.1s' }}>
              <div className="space-y-12 text-zinc-400 text-lg leading-relaxed">
                <p>
                  {DATA.description} 
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-10">
                  {/* Frontend */}
                  <div>
                    <span className="block font-mono text-[10px] text-accent-emerald uppercase mb-6 tracking-widest">// Frontend</span>
                    <ul className="font-mono text-sm space-y-3 text-zinc-200">
                      {DATA.skills.frontend.map(skill => <li key={skill}>{skill}</li>)}
                    </ul>
                  </div>
                  {/* Backend */}
                  <div>
                    <span className="block font-mono text-[10px] text-accent-emerald uppercase mb-6 tracking-widest">// Backend</span>
                    <ul className="font-mono text-sm space-y-3 text-zinc-200">
                      {DATA.skills.backend.map(skill => <li key={skill}>{skill}</li>)}
                    </ul>
                  </div>
                  {/* Infrastructure */}
                  <div>
                    <span className="block font-mono text-[10px] text-accent-emerald uppercase mb-6 tracking-widest">// Infraestructura</span>
                    <ul className="font-mono text-sm space-y-3 text-zinc-200">
                      {DATA.skills.infrastructure.map(skill => <li key={skill}>{skill}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experiencia" className="py-32 border-t border-border-subtle bg-zinc-950/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4" data-animate>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent-emerald mb-4">
                  [ 02 ] Experiencia
                </h2>
                <h3 className="text-4xl font-bold text-white mb-6">Mi trayectoria<span className="text-accent-emerald">.</span></h3>
              </div>
              <div className="lg:col-span-8" data-animate>
                <div className="relative pl-8 border-l border-border-subtle py-2">
                  <div className="absolute left-[-1px] top-4 w-4 h-px bg-accent-emerald"></div>
                  <div className="mb-4">
                    <span className="font-mono text-[10px] text-accent-emerald uppercase tracking-widest">{DATA.experience.period}</span>
                    <h4 className="text-2xl font-bold text-white mt-2">
                      <a href={DATA.experience.url} target="_blank" className="hover:text-accent-emerald transition-colors">{DATA.experience.company}</a>
                    </h4>
                    <p className="text-zinc-400 font-mono text-sm uppercase tracking-wider">{DATA.experience.role}</p>
                  </div>
                  <p className="text-zinc-400 leading-relaxed max-w-2xl">
                    {DATA.experience.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="py-32 border-t border-border-subtle bg-zinc-950/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
              <div className="max-w-xl" data-animate>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent-emerald mb-4">
                  [ 03 ] Proyectos Seleccionados
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  Algunos de los problemas que resolví<span className="text-accent-emerald">.</span>
                </h3>
              </div>
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-2" data-animate>
                Ordenado por relevancia
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {DATA.projects.map((project, index) => (
                <div
                  key={project.title}
                  className={`glass-card group flex flex-col ${index % 2 !== 0 ? 'md:translate-y-16' : ''}`}
                  data-animate
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveCard(activeCard === index ? null : index)}
                >
                  <div className="aspect-video bg-zinc-900 overflow-hidden relative border-b border-border-subtle">
                    <div className={`absolute inset-0 bg-accent-emerald/10 transition-opacity z-10 flex items-center justify-center ${activeCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <span className="font-mono text-[10px] text-white bg-black/80 backdrop-blur-sm border border-white/10 px-4 py-2 tracking-widest uppercase">Ver_Proyecto</span>
                    </div>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover transition-all duration-700 ${activeCard === index ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                    />
                  </div>
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className={`text-2xl font-bold transition-colors ${activeCard === index ? 'text-accent-emerald' : 'text-white group-hover:text-accent-emerald'}`}>{project.title}</h4>
                      <span className="font-mono text-[10px] text-zinc-500">0{index + 1} / 0{DATA.projects.length}</span>
                    </div>
                    <p className="text-zinc-400 mb-8 leading-relaxed line-clamp-2">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="font-mono text-[9px] border border-border-subtle px-2 py-1 text-zinc-500 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-32 border-t border-border-subtle relative overflow-hidden">
          {/* ... existing pre code decoration ... */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div data-animate>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent-emerald mb-4">
                  [ 04 ] Contacto
                </h2>
                <h3 className="text-4xl font-bold text-white mb-6">
                  Hablemos<span className="text-accent-emerald">.</span>
                </h3>
                <p className="text-zinc-400 text-lg max-w-sm mb-12">
                  ¿Tienes un proyecto en mente o simplemente quieres saludar? Siempre estoy abierto a hablar sobre nuevas oportunidades.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 group">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest w-16">E-mail</span>
                    <a className="text-xl font-mono text-zinc-200 hover:text-accent-emerald transition-colors" href={`mailto:${DATA.contact.email}`}>
                      {DATA.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest w-16">Social</span>
                    <div className="flex gap-6">
                      <a className="font-mono text-xs text-zinc-400 hover:text-white transition-colors uppercase" href={DATA.contact.github} target="_blank">Github</a>
                      <a className="font-mono text-xs text-zinc-400 hover:text-white transition-colors uppercase" href={DATA.contact.linkedin} target="_blank">Linkedin</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest w-16">Ubicación</span>
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Lima, Perú</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-12 relative" data-animate style={{ transitionDelay: '0.2s' }}>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Nombre</label>
                      <input
                        className="w-full bg-transparent border-b border-border-subtle focus:border-accent-emerald outline-none text-white p-0 pb-2 placeholder:text-zinc-800 transition-colors"
                        placeholder="Tu nombre"
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Correo</label>
                      <input
                        className="w-full bg-transparent border-b border-border-subtle focus:border-accent-emerald outline-none text-white p-0 pb-2 placeholder:text-zinc-800 transition-colors"
                        placeholder="tu@correo.com"
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Mensaje</label>
                    <textarea
                      className="w-full bg-transparent border-b border-border-subtle focus:border-accent-emerald outline-none text-white p-0 pb-2 placeholder:text-zinc-800 transition-colors resize-none"
                      placeholder="Cuéntame sobre tu proyecto..."
                      rows={4}
                      required
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                  {formStatus === 'success' && (
                    <p className="font-mono text-[11px] text-accent-emerald uppercase tracking-widest">Mensaje enviado correctamente.</p>
                  )}
                  {formStatus === 'error' && (
                    <p className="font-mono text-[11px] text-red-400 uppercase tracking-widest">Error al enviar. Intenta de nuevo.</p>
                  )}
                  <button
                    className="w-full md:w-auto bg-accent-emerald text-white px-12 py-4 font-mono text-xs font-bold hover:bg-white hover:text-black transition-all uppercase tracking-[0.2em] mt-4 disabled:opacity-50"
                    type="submit"
                    disabled={formStatus === 'sending'}
                  >
                    {formStatus === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border-subtle px-6 relative z-10 bg-deep-charcoal">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} JHAN MOCAICO // CORE.STABLE
          </div>
        </div>
      </footer>
    </div>
  );
}