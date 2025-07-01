"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Globe, Code, Smartphone, Palette, Zap, Mail, Menu, X } from "lucide-react"
import Image from "next/image"
import  StarBorder  from "@/components/ui/StarBorder"
import { ThreeDLogoCarousel} from "@/components/ui/3d-carousel"
import CalendlyModal from "@/components/Calendly/CalendyModal"

import { useFormik } from "formik";
import * as Yup from "yup";
import sendEmail from "@/app/services/emailjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Beams from "@/components/beams"

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import { useTranslations } from "next-intl";

interface OmegonNavbarProps {
  language: string;
  setLanguage: (lang: string) => void;
}



const projects = [
  {
    id: 1,
    title: "Yamila Velay",
    description:
      "Identidad visual espiritual y funcionalidad personalizada para una terapeuta holística.",
    imageUrl: "/assets/projects/yami.svg",
    link: "https://yamila-velay-landing.vercel.app/",
  },
  {
    id: 2,
    title: "Lead Magnet",
    description:
      "Proyecto con diseño simple fluido para empresa de IA & automation.",
    imageUrl: "/assets/telefono.png",
    link: "https://aiqwavelabscom.vercel.app/",
  },
  {
    id: 3,
    title: "AIAssist",
    description:
      "Diseño moderno para empresa de seguros de mobiles.",
    imageUrl: "/assets/telefono.png",
    link: "https://iassist-xi.vercel.app/",
  },
]

export default function OmegonLanding() {
  const [language, setLanguage] = useState<"es" | "en">("es")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([])
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailIdRef = useRef(0)

  const formRef = useRef<HTMLFormElement>(null);
const [openCalendly, setOpenCalendly] = useState(false);
const calendlyUrl = "https://calendly.com/omegon-info/30min";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  message: Yup.string().required("El mensaje es obligatorio"),
});

const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    message: "",
  },
  validationSchema,
  onSubmit: async (values, { resetForm, setSubmitting }) => {
    const success = await sendEmail(formRef.current);

    if (success) {
      toast.success("¡Mensaje enviado con éxito!");
      resetForm();
    } else {
      toast.error("Error al enviar el mensaje. Inténtalo de nuevo.");
    }

    setSubmitting(false);
  },
});

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)

      // Add trail point with smoother timing
      const newTrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++,
      }

      setCursorTrail((prev) => {
        const newTrail = [...prev, newTrailPoint]
        return newTrail.slice(-12) // Keep more points for smoother trail
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Remove old trail points with better timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail((prev) => prev.slice(1))
    }, 50) // Faster removal for smoother effect
    return () => clearInterval(interval)
  }, [])

  const content = {
    es: {
      nav: {
        services: "Servicios",
        projects: "Proyectos",
        about: "Nosotros",
        contact: "Contacto",
        bookCall: "Agendar cita", // <-- Agregado
      },
      hero: {
        title: "Diseñamos con propósito, desarrollamos con precisión.",
        description:
          "En Omegon, combinamos diseño con propósito y desarrollo con precisión para crear aplicaciones y sitios web que marcan la diferencia. Desde la conceptualización hasta el lanzamiento, nos enfocamos en la calidad, la innovación y la excelencia técnica. Sumate a la evolución digital con soluciones a medida que potencian tu negocio.",
        tags: ["Desarrollo web", "Desarrollo de apps", "Diseño UX/UI", "Automatizaciones"],
        cta: "Comenzar proyecto",
      },
      services: {
        title: "Nuestros Servicios",
        items: [
          {
            title: "Desarrollo Web",
            description: "Sitios web modernos y responsivos con las últimas tecnologías",
          },
          {
            title: "Desarrollo de Apps",
            description: "Aplicaciones móviles nativas y multiplataforma",
          },
          {
            title: "Diseño UX/UI",
            description: "Experiencias de usuario intuitivas y diseños atractivos",
          },
          {
            title: "Automatizaciones",
            description: "Procesos automatizados para optimizar tu negocio",
          },
        ],
      },
      project: {
        title: "Proyectos Destacados",
        subtitle: "Algunos de nuestros trabajos más recientes",
        button: "Ver Proyecto",
      },
      projects,
      about: {
        title: "Quiénes Somos",
        subtitle: "Diseñamos con propósito, desarrollamos con precisión.",
        description:
          "Omegon nació con la misión de crear soluciones digitales que combinan diseño, tecnología y estrategia. Somos un equipo comprometido con el desarrollo de aplicaciones y sitios web que no solo cumplen con altos estándares de calidad, sino que también responden a las necesidades reales de cada proyecto.",
        team: [
          {
            name: "Agustín Rodríguez",
            description:
              "Profesional con más de 10 años de experiencia en el manejo de proyectos, especializado en desarrollo de software y tecnología.",
            image: "/agus.jpg",
          },
          {
            name: "Eugenia Galleguillo",
            description:
              "Licenciada en Comunicación y apasionada por el diseño gráfico, encuentro en la creatividad una forma de dar vida a ideas y conectar con las personas a través de lo visual.",
            image: "/euge.jpg",
          },
        ],
      },
      contact: {
        title: "Formulario de Contacto",
        subtitle: "Hablemos de tu próximo proyecto",
        form: {
          name: "Nombre",
          email: "Email",
          message: "Mensaje",
          submit: "Enviar mensaje",
        },
      },
    },
    en: {
      nav: {
        services: "Services",
        projects: "Projects",
        about: "About",
        contact: "Contact",
        bookCall: "Book a call", // <-- Agregado
      },
      hero: {
        title: "We design with purpose, develop with precision.",
        description:
          "At Omegon, we combine purposeful design and precise development to create applications and websites that make a difference. From conceptualization to launch, we focus on quality, innovation, and technical excellence. Join the digital evolution with custom solutions that empower your business.",
        tags: ["Web Development", "App Development", "UX/UI Design", "Automations"],
        cta: "Start project",
      },
      services: {
        title: "Our Services",
        items: [
          {
            title: "Web Development",
            description: "Modern and responsive websites with the latest technologies",
          },
          {
            title: "App Development",
            description: "Native and cross-platform mobile applications",
          },
          {
            title: "UX/UI Design",
            description: "Intuitive user experiences and attractive designs",
          },
          {
            title: "Automations",
            description: "Automated processes to optimize your business",
          },
        ],
      },
      project: {
        title: "Featured Projects",
        subtitle: "Some of our most recent work",
        button: "View Project",
      },
      about: {
        title: "Who We Are",
        subtitle: "We design with purpose, develop with precision.",
        description:
          "Omegon was born with the mission of creating digital solutions that combine design, technology and strategy. We are a team committed to developing applications and websites that not only meet high quality standards, but also respond to the real needs of each project.",
        team: [
          {
            name: "Agustín Rodríguez",
            description:
              "Professional with more than 10 years of experience in project management, specialized in software development and technology.",
            image: "/agus.jpg",
          },
          {
            name: "Eugenia Galleguillo",
            description:
              "Graduate in Communication and passionate about graphic design, I find in creativity a way to bring ideas to life and connect with people through the visual.",
            image: "/euge.jpg",
          },
        ],
      },
      contact: {
        title: "Contact Form",
        subtitle: "Let's talk about your next project",
        form: {
          name: "Name",
          email: "Email",
          message: "Message",
          submit: "Send message",
        },
      },
    },
  }

  const currentContent = content[language];

  const navItems = [
    { name: currentContent.nav.services, link: "#services" },
    { name: currentContent.nav.projects, link: "#projects" },
    { name: currentContent.nav.about, link: "#about" },
    { name: currentContent.nav.contact, link: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-[#EDF252] rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: "translate3d(0, 0, 0)", // Hardware acceleration
        }}
      />

      {/* Cursor Trail */}
      {cursorTrail.map((point, index) => (
        <div
          key={point.id}
          className="fixed rounded-full pointer-events-none z-40 transition-all duration-150 ease-out"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            width: `${6 + (index / cursorTrail.length) * 4}px`,
            height: `${6 + (index / cursorTrail.length) * 4}px`,
            backgroundColor: "#EDF252",
            opacity: ((index + 1) / cursorTrail.length) * 0.6,
            transform: `scale(${(index + 1) / cursorTrail.length}) translate3d(0, 0, 0)`,
          }}
        />
      ))}

   <div className="relative w-full">
      <Navbar className="fixed top-0 left-0 right-0 z-40">
        <NavBody className="backdrop-blur-md border-b border-white/10 bg-black/30 dark:bg-black/30 px-6 py-4">
          <NavbarLogo src="/logo.svg" alt="Omegon" name="Omegon" />
          <NavItems
            items={navItems}
            className="text-white hover:text-[#EDF252]"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="flex items-center space-x-2 px-3 py-1 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>
        </NavBody>

        <MobileNav className="backdrop-blur-md border-b border-white/10 bg-black/30 dark:bg-black/30 px-4 py-3">
          <MobileNavHeader>
            <NavbarLogo src="/logo.svg" alt="Omegon" name="Omegon" />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-black/80 text-white"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-white hover:text-[#EDF252] transition-colors duration-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex w-full flex-col gap-4 pt-4">
            
              <NavbarButton
                as="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setOpenCalendly(true);
                }}
                variant="primary"
                className="w-full"
              >
                {currentContent.nav.bookCall}
              </NavbarButton>
              <button
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white"
              >
                <Globe className="w-4 h-4" /> {language.toUpperCase()}
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>

      {/* Hero Section */}
 <section className="relative z-10 min-h-svh w-screen bg-gradient-to-br from-[#000] to-[#1A2428] text-white flex flex-col items-center justify-center px-6 pt-20">
  <div className="absolute inset-0 z-0">
  <Beams
      beamWidth={2}
      beamHeight={15}
      beamNumber={12}
      lightColor="#EDF252"
      speed={2}
      noiseIntensity={1.75}
      scale={0.2}
      rotation={0}
    /> 
{/*      <Scene /> */}
   </div>

  {/* Contenido central */}
  <div className="w-full max-w-6xl space-y-12 relative z-10">
    <div className="flex flex-col items-center text-center space-y-8">
      <div className="space-y-6 flex items-center justify-center flex-col">
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight max-w-3xl">
          {currentContent.hero.title}
        </h1>
        <p className="text-lg text-neutral-300 max-w-2xl">
          {currentContent.hero.description}
        </p>


<div className="flex flex-wrap justify-center gap-3 mt-4">
  {currentContent.hero.tags.map((tag, index) => (
    <StarBorder
      key={index}
      as="button"
      className="px-4 py-2 rounded-full text-[#7ABF5A] text-sm font-medium backdrop-blur-sm"
      color="cyan"
      speed="5s"
    >
      {tag}
    </StarBorder>
  ))}
</div>


        <div className="flex flex-col sm:flex-row gap-4 items-center pt-6">
          <Button
            className="text-sm px-8 py-3 rounded-xl bg-[#EDF252] text-black font-semibold border border-white/10 hover:bg-[#EDF252]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#EDF252]/25"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {currentContent.hero.cta}
          </Button>
          
        </div>
      </div>
    </div>
  </div>
</section>


{/* Service Section */}
<section id="services" className="relative z-10 pt-20 px-4 sm:px-6">
  <div className="container mx-auto">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        {currentContent.services.title}
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
      {currentContent.services.items.map((feature, index) => {
        const icons = [Globe, Smartphone, Palette, Zap];
        const Icon = icons[index % icons.length]; // safety for >4 items

        return (
          <div
            key={index}
            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 md:p-6 min-h-[160px] flex flex-col justify-start items-start space-y-2 sm:space-y-3 group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#EDF252]/20"
          >
            <Icon className="text-white/80 w-5 h-5 group-hover:text-[#EDF252]" />
            <h3 className="text-sm sm:text-base font-medium text-white">{feature.title}</h3>
            <p className="text-xs sm:text-sm text-neutral-400">{feature.description}</p>
          </div>
        );
      })}
    </div>

    <div className="mt-10 p-2">
      <ThreeDLogoCarousel />
    </div>
  </div>
</section>



{/* Projects Section */}
<section id="projects" className="relative z-10 pt-8 pb-20 px-4 sm:px-6">
  <div className="container mx-auto">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        {currentContent.project.title}
      </h2>
      <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
        {currentContent.project.subtitle}
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="aspect-[4/3] sm:aspect-video backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#548C45]/20 group overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
            <div className="text-center space-y-3">
              <Code className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-[#7ABF5A] group-hover:text-[#EDF252] transition-colors duration-300" />
              <h3 className="text-base sm:text-lg font-semibold text-white">
                 {project.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">{project.description}</p>
              <Button
                asChild
                variant="outline"
                className="border-[#7ABF5A] text-[#7ABF5A] font-semibold hover:bg-[#7ABF5A] hover:text-[#17261E] transition mt-2"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  {currentContent.project.button}
                </a>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>


      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{currentContent.about.title}</h2>
            <h3 className="text-xl md:text-2xl text-[#EDF252] mb-6">{currentContent.about.subtitle}</h3>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
              {currentContent.about.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {currentContent.about.team.map((member, index) => (
              <Card
                key={index}
                className="p-8 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#548C45]/20 group"
              >
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#548C45]/30 group-hover:border-[#EDF252]/50 transition-all duration-300">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#EDF252]">{member.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
<section id="contact" className="relative z-10 py-20 px-6">
  <div className="container mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">{currentContent.contact.title}</h2>
      <p className="text-gray-400 text-lg">{currentContent.contact.subtitle}</p>

      {/* BOTÓN DE CALENDLY */}
      <div className="mt-6">
        <button
          onClick={() => setOpenCalendly(true)}
          className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
        >
          Agendá tu cita
        </button>
      </div>
    </div>

    <div className="max-w-2xl mx-auto">
      <Card className="p-8 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
        <form
          ref={formRef}
          onSubmit={formik.handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{currentContent.contact.form.name}</label>
            <Input
              placeholder={currentContent.contact.form.name}
              className="bg-white/5 border-white/20 focus:border-[#EDF252] text-white placeholder:text-gray-500"
              {...formik.getFieldProps("name")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{currentContent.contact.form.email}</label>
            <Input
              id="email"
              type="email"
              placeholder={currentContent.contact.form.email}
              className="bg-white/5 border-white/20 focus:border-[#EDF252] text-white placeholder:text-gray-500"
              {...formik.getFieldProps("email")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{currentContent.contact.form.message}</label>
            <Textarea
              id="message"
              placeholder={currentContent.contact.form.message}
              className="bg-white/5 border-white/20 focus:border-[#EDF252] text-white placeholder:text-gray-500 min-h-[120px]"
              {...formik.getFieldProps("message")}
            />
          </div>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-[#EDF252] text-black hover:bg-[#EDF252]/90 font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#EDF252]/25"
          >
            <Mail className="w-4 w-4 mr-2" />
            {currentContent.contact.form.submit}
          </Button>
        </form>
      </Card>
    </div>
  </div>

  {/* MODAL Calendly */}
  <CalendlyModal
    open={openCalendly}
    onClose={() => setOpenCalendly(false)}
    calendlyUrl={calendlyUrl}
  />

  <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
</section>

 
      {/* Footer */}
      <footer className="relative z-1 py-12 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Image src="/logo.svg" alt="Omegon" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold">Omegon</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Omegon. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  )
}
