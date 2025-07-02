"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Globe, Code, Smartphone, Palette, Zap, Mail, Menu, X } from "lucide-react"
import  StarBorder  from "@/components/ui/StarBorder"
import Image from "next/image"
import { ThreeDLogoCarousel} from "@/components/ui/3d-carousel"
import CalendlyModal from "@/components/Calendly/CalendyModal"

import { useFormik } from "formik";
import * as Yup from "yup";
import sendEmail from "@/app/services/emailjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import ProfileCard from "@/components/ui/profileCard/profileCard"
import BlurText from "@/components/ui/blurText"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from "next/link"
import HeroSplineBackground from "@/components/blocks/galaxy-interactive-hero-section"
import Beams from "@/components/beams"



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
        bookCall: "Agendar cita", 
      },
      hero: {
        title: <> Diseñamos con <strong>propósito</strong>, desarrollamos con <strong>precisión</strong></>,
        description: (
          <>
            En Omegon, combinamos diseño con <strong>propósito</strong> y desarrollo con <strong>precisión</strong> para crear aplicaciones y sitios web que marcan la diferencia. Desde la conceptualización hasta el lanzamiento, nos enfocamos en la calidad, la innovación y la excelencia técnica. Sumate a la evolución digital con soluciones a medida que potencian tu negocio.
          </>
        ),
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
            image: "/TITO.png",
            title:"Software Developer",
            handle:"AgusRodriguez",
            status:"Online",
            contactTex:"Contactame",
            link:"https://www.linkedin.com/in/agustin-devfs",
          },
          {
            name: "Eugenia Galleguillo",
            image: "/EUGE.png",
            title:"Graphic Designer",
            handle:"EugeGalleguillo",
            status:"Online",
            contactTex:"Contactame",
            link:"hhttps://www.linkedin.com/in/eugenia-galleguillo-8282a71a4/",
          },
              {
            name: "Martina Fraga",
            image: "/FRAGA.png",
            title:"Marketing Specialist",
            handle:"MartiFraga",
            status:"Online",
            contactTex:"Contactame",
            link:"https://www.linkedin.com/in/martinafraga/",
          },
              {
            name: "Martina Marquez",
            image: "/MAR.png",
            title:"Community Manager",
            handle:"MarMarquez",
            status:"Online",
            contactTex:"Contactame",
            link:"https://www.linkedin.com/in/martimarquez/",
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
        title: <> We design with <strong>purpose</strong>, develop with <strong>precision</strong></>,
        description: (
          <>
            At Omegon, we combine purposeful design and precise development to create applications and websites that make a difference. From conceptualization to launch, we focus on quality, innovation, and technical excellence. Join the digital evolution with custom solutions that empower your business
            <br />
            <span>
              We design with <strong>purpose</strong>, develop with <strong>precision</strong>.
            </span>
          </>
        ),
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
            name: "Agus Rodríguez",
            image: "/TITO.png",
            title: "Software Developer",
            handle: "AgustinRodriguez",
            status: "Online",
            contactTex: "Contact Me",
            link:"https://www.linkedin.com/in/agustin-devfs",
          },
          {
            name: "Eugenia Galleguillo",
            image: "/EUGE.png",
            title:"Graphic designer",
            handle: "EugeniaGalleguillo",
            status: "Online",
            contactTex: "Contact Me",
           link:"hhttps://www.linkedin.com/in/eugenia-galleguillo-8282a71a4/",
          },
        {
            name: "Martina Fraga",
            image: "/FRAGA.png",
            title:"Marketing Specialist",
            handle:"MartiFraga",
            status:"Online",
            contactTex:"Contactame",
            link:"https://www.linkedin.com/in/martinafraga/",
          },
              {
            name: "Martina Marquez",
            image: "/MAR.png",
            title:"Community Manager",
            handle:"MarMarquezz",
            status:"Online",
            contactTex:"Contactame",
            link:"https://www.linkedin.com/in/martimarquez/",
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
        className="fixed w-4 h-4 bg-[#EDF252] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out"
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
          <NavbarLogo src="/blanco.svg" alt="Omegon" name="Omegon" />
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
            <NavbarLogo src="/blanco.svg" alt="Omegon" name="Omegon" />
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
 <section className="relative z-10 min-h-svh w-screen bg-gradient-to-br from-[#000] to-[#1A2428] text-white flex flex-col items-center justify-center px-6 pt-20 pb-10">
  <div className="absolute inset-0 z-0">
{/* <HeroSplineBackground/> */}
  <Beams
    beamWidth={3}
    beamHeight={30}
    beamNumber={20}
    lightColor="#ffffff"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={30}
  />
   </div>

  {/* Contenido central */}
  <div className="w-full max-w-6xl space-y-12 relative z-10">
    <div className="flex flex-col items-center text-center space-y-10">
      <div className="space-y-12 flex items-center justify-center flex-col">
        <h1 className="text-3xl md:text-6xl tracking-tight max-w-3xl">
          {currentContent.hero.title}
        </h1>
        <p className="text-lg text-neutral-100 max-w-4xl">
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
<section id="services" className="relative z-10 pt-6 px-4 sm:px-6">
  <div className="container mx-auto">
    <div className="text-center mb-12 sm:mb-16">
      <h2>
        <div className="flex justify-center">
        <BlurText
          text={currentContent.services.title}
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex justify-center no-wrap"
            />
       </div>
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
      <h2>
         <div className="flex justify-center">
        <BlurText
          text={currentContent.project.title}
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-3xl md:text-5xl font-bold mb-4 flex justify-center no-wrap"
            />
      </div>
      </h2>

      <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
        {currentContent.project.subtitle}
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="p-8 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl"
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
                className="border-[#7ABF5A] text-[#7ABF5A] font-semibold hover:bg-[#7ABF5A] hover:text-[#17261E] transition mt-2 rounded-xl"
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
<section id="about" className="relative z-10 pt-5 px-6">
  <div className="container mx-auto">
    <div className="text-center mb-16">
 <h2>
        <div className="flex justify-center">
        <BlurText
          text= {currentContent.about.title}
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex justify-center no-wrap"
            />
      </div>


 </h2>
      
      <h3 className="text-xl md:text-2xl text-[#EDF252] mb-6">{currentContent.about.subtitle}</h3>
      <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
        {currentContent.about.description}
      </p>
    </div>

    <div className="w-full flex justify-center relative mx-auto">
      <div className="w-[90%] md:w-[70%] min-w-[280px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          autoplay={{ delay:2500 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          className="relative"
        >
          {currentContent.about.team.map((member, index) => (
            <SwiperSlide key={index} className="flex justify-center py-10 min-h-[560px] md:min-h-[620px]">
              <ProfileCard
                name={member.name}
                title={member.title}
                handle={member.handle}
                status={member.status}
                contactText="Contact Me"
                avatarUrl={member.image || "/placeholder.svg"}
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() =>
                  member.link && window.open(member.link, "_blank")
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
</section>




      {/* Contact Section */}
<section id="contact" className="relative z-10 pt-5 pb-20 px-6">
  <div className="container mx-auto">
    <div className="text-center mb-16">
    <h2>
        <div className="flex justify-center">
        <BlurText
          text= {currentContent.contact.title}
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex justify-center no-wrap"
            />
      </div>
    </h2>
      <p className="text-gray-400 text-lg">{currentContent.contact.subtitle}</p>

      {/* BOTÓN DE CALENDLY */}
      <div className="mt-6">
        <button
          onClick={() => setOpenCalendly(true)}
          className="border border-white text-white px-6 py-2 rounded-xl hover:bg-white hover:text-black transition"
        >
          {currentContent.nav.bookCall}
        </button>
      </div>
    </div>

    <div className="max-w-2xl mx-auto">
      <Card className="p-8 backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl">
        <form
          ref={formRef}
          onSubmit={formik.handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{currentContent.contact.form.name}</label>
            <Input
              placeholder={currentContent.contact.form.name}
              className="bg-white/5 border-white/20 focus:border-[#EDF252] text-white placeholder:text-gray-500 rounded-xl"
              {...formik.getFieldProps("name")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{currentContent.contact.form.email}</label>
            <Input
              id="email"
              type="email"
              placeholder={currentContent.contact.form.email}
              className="bg-white/5 border-white/20 focus:border-[#EDF252] text-white placeholder:text-gray-500 rounded-xl"
              {...formik.getFieldProps("email")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{currentContent.contact.form.message}</label>
            <Textarea
              id="message"
              placeholder={currentContent.contact.form.message}
              className="bg-white/5 border-white/20 focus:border-[#EDF252] text-white placeholder:text-gray-500 min-h-[120px] rounded-xl"
              {...formik.getFieldProps("message")}
            />
          </div>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-[#EDF252] text-black hover:bg-[#EDF252]/90 font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#EDF252]/25 rounded-xl"
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
    {/* Logo y nombre */}
    <div className="flex items-center justify-center space-x-4 mb-6">
    <Image src="/logo.svg" alt="Omegon" width={56} height={56} className="w-12 h-12" />
    </div>

    {/* Redes sociales */}
    <div className="flex justify-center space-x-6 mb-6 text-gray-100">
      <Link
        href="https://www.linkedin.com/company/omegon-studio"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#EDF252] transition-colors flex items-center space-x-2"
      >
        {/* LinkedIn Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.13 8.14h4.73v13.72H.13V8.14zm7.69 0h4.53v1.88h.06c.63-1.2 2.18-2.45 4.49-2.45 4.8 0 5.69 3.16 5.69 7.26v8.02h-4.74v-7.11c0-1.7-.03-3.89-2.37-3.89-2.38 0-2.75 1.85-2.75 3.76v7.24h-4.74V8.14z" />
        </svg>
        <span className="text-sm">LinkedIn</span>
      </Link>

      <Link
        href="https://www.instagram.com/omegon.studio"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#EDF252] transition-colors flex items-center space-x-2"
      >
        {/* Instagram Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.75 2h8.5A5.76 5.76 0 0122 7.75v8.5A5.76 5.76 0 0116.25 22h-8.5A5.76 5.76 0 012 16.25v-8.5A5.76 5.76 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-2.5a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" />
        </svg>
        <span className="text-sm">Instagram</span>
      </Link>
    </div>

    {/* Ubicaciones */}
    <div className="mb-6">
      <p className="text-gray-200 text-sm mb-4 font-semibold">
        {language === "es" ? "Ubicaciones:" : "Locations:"}
      </p>
      <div className="flex flex-wrap justify-center gap-3 text-gray-200 text-sm">
        <span>CABA</span>
        •<span> Córdoba</span>
        •<span>Comodoro Rivadavia</span>
        •<span> Mar del Plata</span>
      </div>
    </div>

    {/* Derechos reservados */}
    <p className="text-gray-400 text-sm">
      © 2025 Omegon.{" "}
      {language === "es"
        ? "Todos los derechos reservados."
        : "All rights reserved."}
    </p>
  </div>
</footer>

    </div>
  )
}
