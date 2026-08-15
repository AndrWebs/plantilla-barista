"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../context/LanguageContext"
import Link from "next/link"

// ============================================
// TIPO DE DATO PARA CADA SLIDE
// ============================================
type Slide = {
  id: number
  title: string
  description: string
  gradient: string     // color de fondo si no hay imagen
  icon: string         // emoji decorativo
  cta: string   // Texto del boton
  image: string //Ruta desde public/(ej: "/slider/img1.png")
  link: string  // ← NUEVO: enlace del botón
}

// ============================================
// DATOS DE LOS SLIDES (8 slides con enlaces)
// ============================================
const slides: Slide[] = [
  {
    id: 1,
    title: "Curso de Barista Profesional",
    description: "Domina el arte del espresso, la texturización de leche y el latte art con técnicas de campeones mundiales.",
    gradient: "from-amber-900 via-amber-800 to-orange-900",
    icon: "☕",
    cta: "Ver Curso →",
    image: "/slider/img1.png",
    link: "/cursos/barista-profesional",  // ← NUEVO
  },
  {
    id: 2,
    title: "Latte Art Avanzado",
    description: "Aprende a crear rosettas, tulipanes y cisnes. Técnicas de vertido libre y etching que sorprenderán a tus clientes.",
    gradient: "from-stone-800 via-amber-900 to-stone-900",
    icon: "🎨",
    cta: "Ver Técnicas →",
    image: "/slider/img2.png",
    link: "/cursos/latte-art",  // ← NUEVO
  },
  {
    id: 3,
    title: "Tueste y Origen del Café",
    description: "Conoce los orígenes del café, perfiles de tueste y cómo seleccionar los mejores granos para tu negocio.",
    gradient: "from-yellow-900 via-amber-800 to-orange-900",
    icon: "🌱",
    cta: "Explorar Orígenes →",
    image: "/slider/img3.png",
    link: "/cursos/tueste-origen",  // ← NUEVO
  },
  {
    id: 4,
    title: "Monta tu Cafetería",
    description: "Guía completa para emprender: desde el plan de negocio hasta la selección de maquinaria y diseño del local.",
    gradient: "from-amber-950 via-stone-900 to-amber-900",
    icon: "🏪",
    cta: "Emprender →",
    image: "/slider/barista1.png",
    link: "/cursos/monta-cafeteria",  // ← NUEVO
  },
  {
    id: 5,
    title: "Métodos de Filtrado",
    description: "V60, Chemex, Aeropress, French Press. Domina cada método y extrae el mejor sabor de cada grano.",
    gradient: "from-stone-900 via-amber-900 to-yellow-900",
    icon: "🫖",
    cta: "Ver Métodos →",
    image: "/slider/barista2.png",
    link: "/cursos/metodos-filtrado",  // ← NUEVO
  },
  {
    id: 6,
    title: "Certificación SCA",
    description: "Prepárate para la certificación internacional de la Specialty Coffee Association. Reconocida en todo el mundo.",
    gradient: "from-amber-900 via-orange-800 to-amber-800",
    icon: "🏆",
    cta: "Certificarme →",
    image: "/slider/barista3.png",
    link: "/cursos/certificacion-sca",  // ← NUEVO
  },
  {
    id: 7,
    title: "Café de Especialidad",
    description: "Aprende a catar, puntuar y seleccionar cafés de especialidad. Conviértete en un experto catador.",
    gradient: "from-stone-800 via-amber-800 to-stone-800",
    icon: "🔬",
    cta: "Catar Café →",
    image: "/slider/barista4.png",
    link: "/cursos/cafe-especialidad",  // ← NUEVO
  },
  {
    id: 8,
    title: "Workshop Intensivo",
    description: "Taller presencial de 2 días con práctica intensiva. Incluye materiales, café y certificado de asistencia.",
    gradient: "from-amber-800 via-orange-700 to-amber-700",
    icon: "📅",
    cta: "Reservar Plaza →",
    image: "/slider/barista5.png",
    link: "/cursos/workshop-intensivo",  // ← NUEVO
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const SliderSection = () => {
  const { t } = useLanguage()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const totalSlides = slides.length

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => nextSlide(), 9000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      else if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevSlide, nextSlide])

  const getSlideIndex = (offset: number): number => {
    return (currentIndex + offset + totalSlides) % totalSlides
  }

  const handleImageError = (slideId: number) => {
    setImageErrors((prev) => ({ ...prev, [slideId]: true }))
  }
  
  // Variantes de animación Framer Motion
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? -15 : 15,
      transition: { duration: 0.5 },
    }),
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-stone-950">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-transparent to-stone-950" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-amber-500/15 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-500/20"
          >
            📚 Nuestros Cursos Destacados
          </motion.span>

          <h2 className="font-serif text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">{t("slider.title1") || "Formación "}</span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              {t("slider.title2") || "Profesional"}
            </span>
          </h2>

          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            {t("slider.desc") || "Descubre nuestros cursos más populares y conviértete en un barista certificado con las mejores técnicas del mundo."}
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Carrusel de cursos"
          aria-roledescription="carousel"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            
            <div className="hidden md:block w-1/4 opacity-40 scale-90 blur-[1px] pointer-events-none">
              <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl">
                <img
                  src={slides[getSlideIndex(-1)].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${slides[getSlideIndex(-1)].gradient} opacity-60`} />
                <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                  <div className="bg-stone-900/40 backdrop-blur-sm rounded-xl p-3">
                    <span className="text-2xl block">{slides[getSlideIndex(-1)].icon}</span>
                    <h3 className="font-serif text-white font-bold text-sm mt-1">{slides[getSlideIndex(-1)].title}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10 min-h-[350px] flex flex-col justify-between"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${currentIndex + 1} de ${totalSlides}: ${slides[currentIndex].title}`}
                >
                  {!imageErrors[slides[currentIndex].id] ? (
                    <img
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => handleImageError(slides[currentIndex].id)}
                      loading="lazy"
                    />
                  ) : null}
                  
                  {/* Overlay de gradientes de la carta del slaider */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentIndex].gradient} opacity-40`} />
                  
                  {/* Contenido de la carta del slaider */}       
                  <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full min-h-[350px]">
                    
                    {/* fondo de la carta del slaider */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className=" border border-amber-500/10 rounded-2xl p-5 md:p-6 shadow-4xl"
                    >
                      {/* icono de la carta del slaider */}
                      <motion.span
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="text-4xl block mb-3"
                      >
                        {slides[currentIndex].icon}
                      </motion.span>
                      
                      {/* titulo de la carta del slaider */}          
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="font-serif text-2xl md:text-3xl font-bold text-white mb-2"
                      >
                        {slides[currentIndex].title}
                      </motion.h3>
                      
                      {/* descripcion de la carta del slider */}      
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-stone-300 text-sm md:text-base leading-relaxed mb-4"
                      >
                        {slides[currentIndex].description}
                      </motion.p>

                      
                      {/* ============================================ */}
                      {/* BOTÓN CON ENLACE REAL (Link de Next.js)      */}
                      {/* ============================================ */}
                      <Link
                        href={slides[currentIndex].link}
                        className="inline-block bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                      >
                        {slides[currentIndex].cta}
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Card SIGUIENTE (peek derecho) - solo desktop */}
            <div className="hidden md:block w-1/4 opacity-40 scale-90 blur-[1px] pointer-events-none">
              <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl">
                <img
                  src={slides[getSlideIndex(1)].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${slides[getSlideIndex(1)].gradient} opacity-60`} />
                <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                  <div className="bg-stone-900/40 backdrop-blur-sm rounded-xl p-3">
                    <span className="text-2xl block">{slides[getSlideIndex(1)].icon}</span>
                    <h3 className="font-serif text-white font-bold text-sm mt-1">{slides[getSlideIndex(1)].title}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Flecha IZQUIERDA */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-800/80 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center text-white hover:bg-stone-700 transition-all z-20"
            aria-label="Slide anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          {/* Flecha DERECHA */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-800/80 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center text-white hover:bg-stone-700 transition-all z-20"
            aria-label="Slide siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        
        {/* Indicadores de posición (puntos) */}
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-amber-500 w-8 h-3"
                  : "bg-stone-600 w-3 h-3 hover:bg-amber-400/40"
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SliderSection