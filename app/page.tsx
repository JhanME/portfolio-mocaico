"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Cpu, 
  Terminal, 
  Layers, 
  ArrowRight, 
  Download,
  ExternalLink,
  Moon,
  Sun
} from 'lucide-react';

// --- DATOS DEL USUARIO ---
const DATA = {
  name: "Jhan Jhover Mocaico Espíritu",
  role: "Ingeniero Informático",
  role2: "Desarollador web y Iot",
  about: {
    title: "Acerca de Mí",
    intro: "Estudiante apasionado por la intersección entre el software y el hardware. Me enfoco en construir soluciones escalables que conectan el mundo físico con el digital.",
    description: "Soy estudiante de cuarto año de Ingeniería Informática con sólida experiencia práctica en sistemas embebidos y soluciones IoT. He liderado proyectos bajo metodologías ágiles, enfocándome en la resolución de problemas técnicos complejos.",
    education: {
      university: "Universidad Peruana Cayetano Heredia",
      degree: "Ingeniería Informática",
      status: "Actualmente estudiando"
    },
    skills: ["Python", "Docker", "Next.js", "C/C++", "Git", "Linux"]
  },
  services: [
    {
      title: "Desarrollo IoT & Embebidos",
      desc: "Integración de sensores, diseño de PCB y programación de microcontroladores (ESP32, Arduino).",
      icon: <Cpu className="w-8 h-8 mb-4" />
    },
    {
      title: "Desarrollo de Software",
      desc: "Creación de intérpretes, automatización con Python y aplicaciones web modernas.",
      icon: <Terminal className="w-8 h-8 mb-4" />
    },
    {
      title: "Infraestructura & Datos",
      desc: "Gestión de pipelines de datos con Node-RED, Docker y visualización en tiempo real.",
      icon: <Layers className="w-8 h-8 mb-4" />
    }
  ],
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
      image:"/fonekids.png"
    },
    {
      title: "AirGuardian",
      subtitle: "Monitoreo IoT",
      desc: "Sistema de calidad del aire en interiores. Integra sensores físicos, diseño PCB y visualización de datos en tiempo real.",
      tags: ["C/C++", "Node-RED", "PCB Design", "IoT"],
      image:"/airguardian.png"
    }
  ],
  contact: {
    email: "jhan.mocaico@upch.pe",
    phone: "+51 963242281",
    github: "https://github.com/JhanME",
    linkedin: "https://www.linkedin.com/in/jhanmocaico"
  }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [previousMode, setPreviousMode] = useState(true);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Estados para la máquina de escribir
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["Ingeniero Informático","Desarrollador web & IoT"];

  // Inicializar dark mode - respetar preferencia del sistema
  useEffect(() => {
    // Verificar si hay una preferencia guardada
    const stored = localStorage.getItem('darkMode');
    // Si hay un valor guardado, usarlo; si no, usar la preferencia del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored !== null ? stored === 'true' : systemPrefersDark;

    setDarkMode(isDark);

    // Aplicar la clase dark al elemento HTML
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Solo actualizar si no hay preferencia guardada
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Sincronizar darkMode con el DOM y localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    // Guardar en localStorage cuando cambia
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setButtonPosition({ x, y });
    setPreviousMode(darkMode);
    setIsAnimating(true);

    // Pequeño delay para que se vea la animación antes de cambiar
    setTimeout(() => {
      setDarkMode(prev => !prev);
    }, 100);

    // Terminar la animación
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  // 1. DEFINIMOS LOS DATOS ESTRUCTURADOS (SCHEMA.ORG)
  const jsonLd = {
    
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jhan Mocaico Espíritu",
    "url": "https://mocaico.dev",
    "image": "https://mocaico.dev/mocaico.jpeg", 
    "sameAs": [
      DATA.contact.linkedin,
      DATA.contact.github
    ],
    "jobTitle": "Ingeniero Informático",
    "knowsAbout": ["IoT", "Desarrollo Web", "Sistemas Embebidos", "Next.js"]
  };

  // Lógica de Scroll y ScrollSpy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (isScrollingRef.current) return;

      const sections = ['inicio', 'acerca', 'proyectos', 'servicios'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
           if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
             setActiveSection('servicios');
           } else {
             setActiveSection(section);
           }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto de Máquina de Escribir
  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const handleTyping = () => {
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 200);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); 
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed]);

  // Animaciones al hacer scroll
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
      { threshold: 0.12 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'acerca', label: 'Acerca' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'servicios', label: 'Servicios' },
  ];

  const experienceMonths = (() => {
    const start = new Date(2026, 0, 5);
    const now = new Date();
    // Conteo inclusivo: enero + febrero = 2 meses (igual que LinkedIn)
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
    return Math.max(1, months);
  })();

  return (
    <>
      {/* OVERLAY DE ANIMACIÓN DE OLA - DETRÁS DE TODO */}
      {isAnimating && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: -1,
            background: !previousMode ? '#000000' : '#f9fafb',
            clipPath: `circle(0% at ${buttonPosition.x}px ${buttonPosition.y}px)`,
            animation: 'expandCircle 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            '--x': `${buttonPosition.x}px`,
            '--y': `${buttonPosition.y}px`,
          } as React.CSSProperties}
        />
      )}

      <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans selection:bg-gray-300 dark:selection:bg-gray-700 relative">

        {/* 2. INYECTAMOS EL SCRIPT PARA GOOGLE (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAVBAR FLOTANTE */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border p-1 md:p-1.5 flex items-center gap-1 md:gap-2 transition-all duration-300 max-w-[calc(100vw-1rem)] ${
        scrolled
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-xl border-gray-200 dark:border-gray-800'
          : 'bg-white/50 dark:bg-black/50 backdrop-blur-sm border-gray-200 dark:border-gray-800'
      }`}>
        <div className="flex bg-transparent rounded-full relative">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-3 py-1.5 text-xs md:px-5 md:py-2 md:text-sm font-medium rounded-full transition-all duration-300 z-10 ${
                activeSection === item.id
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {activeSection === item.id && (
                <span className="absolute inset-0 bg-black dark:bg-gray-700 rounded-full -z-10 animate-fade-in" />
              )}
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={toggleDarkMode}
          className="relative p-1.5 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ml-1 md:ml-2 overflow-hidden"
          aria-label="Toggle dark mode"
        >
          <div className="relative w-5 h-5">
            <Sun
              className={`absolute inset-0 w-5 h-5 text-gray-700 transition-all duration-500 ${
                darkMode
                  ? 'rotate-90 scale-0 opacity-0'
                  : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <Moon
              className={`absolute inset-0 w-5 h-5 text-gray-300 transition-all duration-500 ${
                darkMode
                  ? 'rotate-0 scale-100 opacity-100'
                  : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </div>
        </button>
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" className="pt-40 pb-20 px-4 md:px-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800 rounded-full hover:scale-105 transition animation-300 text-sm font-semibold tracking-wide">
            Disponible para trabajar
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-500">Jhan</span>
          </h1>
          
          <div className="h-8 md:h-10 flex items-center">
             <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-mono bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
               {text}
               <span className="animate-pulse ml-1 text-black dark:text-white">|</span>
             </span>
          </div>

          <p className="text-gray-500 dark:text-gray-400 max-w-lg text-lg pt-2">
            Transformo conceptos técnicos en experiencias reales. Especializado en IoT, Sistemas Embebidos y Desarrollo Web moderno.
          </p>
          
          <div className="flex gap-4 pt-4">
            <a href={`mailto:${DATA.contact.email}`} className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-white dark:hover:bg-gray-200 hover:text-gray-900 dark:hover:text-black transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-gray-400/20 dark:shadow-gray-600/20">
              Contratar <ArrowRight size={18} />
            </a>
            
            <a
              href="/Jhan_Mocaico_CVv.pdf" 
              download="CV_Jhan_Mocaico.pdf"
              className="px-6 py-3 text-gray-900 dark:text-gray-100 font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full hover:text-white dark:hover:text-black hover:bg-gray-900 dark:hover:bg-gray-800 transition hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
             Descargar CV <Download size={18} /> 
            </a>
            
          </div>

          {/* ICONOS SOCIALES */}
          <div className="flex gap-6 pt-4 items-center">
            <a href={DATA.contact.github} target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition hover:scale-110">
                <Github size={24} />
            </a>
            <a href={DATA.contact.linkedin} target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-[#0077b5] transition hover:scale-110">
                <Linkedin size={24} />
            </a>
           
          </div>
        </div>

        <div className="flex-1 relative flex justify-center">
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-500 border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-900">
            <Image 
              src="/mocaico.jpeg" 
              alt="Jhan Mocaico" 
              width={500} 
              height={500}
              className="object-cover w-full h-full"
              priority
            /> 
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="acerca" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* IMAGEN IZQUIERDA */}
          <div data-animate className="flex-1 w-full relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
               <Image 
                src="/jhan2.jpeg" 
                alt="Sobre mí" 
                width={600} 
                height={800}
                className="object-cover w-full h-full hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <p className="font-bold text-lg">Jhan Mocaico</p>
                <p className="text-gray-300 text-sm">Developer & Maker</p>
              </div>
            </div>
          </div>

          {/* INFORMACIÓN DERECHA */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 data-animate className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Acerca de <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-500">Mí</span>
              </h2>
             
              <div className="mb-6 transition-all duration-300 hover:scale-105 cursor-default">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 ">
                  {DATA.about.description}
                </p>
              </div>

              {/* BLOQUE EDUCACIÓN */}
              <div data-animate style={{ animationDelay: '150ms' }} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-black dark:bg-white rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Educación</h3>
                </div>
                
                <div className="ml-4 border-l-2 border-gray-100 dark:border-gray-700 pl-6 pb-2 space-y-1 relative transition-all duration-300 hover:scale-105">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-black hover:scale-300 trasiton-all duration-300"></div>
                  <h4 className="font-bold text-lg text-gray-500 dark:text-gray-400 hover:text-lg trasiton-all duration-300">{DATA.about.education.university}</h4>
                  <p className="text-gray-700 dark:text-gray-300 font-medium ">{DATA.about.education.degree}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm italic hover:text-base transition-all duration-300">{DATA.about.education.status}</p>
                </div>
              </div>

          
              {/*Experiencia laboral*/}
              <div data-animate style={{ animationDelay: '300ms' }} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-black dark:bg-white rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Experiencia Laboral</h3>
                </div>

                <div className="ml-4 border-l-2 border-gray-100 dark:border-gray-700 pl-6 pb-2 space-y-1 relative ">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-black hover:scale-300 trasiton-all duration-300"></div>
                  <h4 className="font-bold text-lg text-gray-500 dark:text-gray-400 hover:text-lg hover:text-xl trasiton-all duration-300">
                    <a href="https://galio.dev" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">Galio Electronics</a>
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">Practicante de Sistemas Embebidos y Plataformas IoT</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm italic hover:text-base transition-all duration-300">
                    Enero 2026 - Actualidad · {experienceMonths} {experienceMonths === 1 ? 'mes' : 'meses'}
                  </p>
                </div>
              </div>

              {/* BLOQUE HABILIDADES (Skills) */}
              <div data-animate style={{ animationDelay: '450ms' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-black dark:bg-white rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Habilidades Técnicas</h3>
                </div>

                <div className="flex flex-wrap gap-2 ml-1">
                  {DATA.about.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:text-white dark:hover:text-black hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="proyectos" className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-950/50">
        <div className="max-w-6xl mx-auto">
          <div data-animate className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Proyectos Destacados</h2>
            <p className="text-gray-500 dark:text-gray-400">Algunos de los proyectos en los que he trabajado</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DATA.projects.map((project, index) => (
              <div key={index} data-animate style={{ animationDelay: `${index * 150}ms` }} className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                
                <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-black dark:group-hover:text-white transition text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wide">{project.subtitle}</p>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href={DATA.contact.github} target="_blank" className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-black dark:hover:text-white transition mt-auto">
                    Ver Proyecto <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicios" className="py-20 px-4 md:px-8 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div data-animate className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Mis Servicios</h2>
            <p className="text-gray-500 dark:text-gray-400">Lo que puedo hacer por ti y tu empresa</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DATA.services.map((service, index) => (
              <div key={index} data-animate style={{ animationDelay: `${index * 150}ms` }} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition duration-300 hover:-translate-y-2 cursor-default group">
                <div className="group-hover:scale-110 transition duration-300 origin-left text-black dark:text-white">
                    {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Jhan Mocaico</h3>
            <p className="text-gray-400 text-sm">Creando soluciones innovadoras con código y hardware.</p>
          </div>

          <div className="flex gap-8 text-sm text-gray-400">
            <button onClick={() => scrollToSection('inicio')} className="hover:text-white transition">Inicio</button>
            <button onClick={() => scrollToSection('acerca')} className="hover:text-white transition">Acerca</button>
            <button onClick={() => scrollToSection('proyectos')} className="hover:text-white transition">Proyectos</button>
            <button onClick={() => scrollToSection('servicios')} className="hover:text-white transition">Servicios</button>
          </div>

          <div className="flex gap-4 items-center">
            <a href={DATA.contact.github} className="hover:text-gray-300 transition"><Github /></a>
            <a href={DATA.contact.linkedin} className="hover:text-gray-300 transition"><Linkedin /></a>
            <a href={`mailto:${DATA.contact.email}`} className="hover:text-gray-300 transition"><Mail /></a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 space-y-1">
          <p>© {new Date().getFullYear()} Jhan Mocaico. Todos los derechos reservados.</p>
          <p>Operado por MOCAICO ESPIRITU JHAN JHOVER · RUC: 10600939489</p>
          <p>Lima, Perú · +51 963 242 281 · <a href="mailto:jhan.mocaico@upch.pe" className="hover:text-gray-300 transition">jhan.mocaico@upch.pe</a></p>
          <p><a href="/privacidad" className="hover:text-gray-300 transition underline">Política de Privacidad</a></p>
        </div>
      </footer>

      </main>
    </>
  );
}