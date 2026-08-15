"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../context/LanguageContext"

// ============================================
// TIPO DE DATO PARA CADA SLIDE
// ============================================
type Slide = {
  id: number
  title: string
  description: string
  gradient: string        // Color de fondo si no hay imagen
  icon: string            // Emoji decorativo
  cta: string             // Texto del botón
  image: string           // Ruta desde public/ (ej: "/slider/img1.png")
  link: string           // ← NUEVO: enlace del botón
}

// ============================================
// DATOS DE LOS SLIDES (8 slides)
// ============================================
const slides: Slide[] = [
  {
    id: 1,
    tittle: "explora y connocenos",
    gradient: "from-amber-900 via-amber-800 to-orange-900",
    icon: "☕",
    cta: "Ver Curso →",
    image: "/slider/cafe.png",
    link: "/cursos/barista-profesional",  // ← NUEVO
  },
  {
    id: 2,
    gradient: "from-stone-800 via-amber-900 to-stone-900",
    icon: "🎨",
    cta: "Elige el mejor Cafe →",
    image: "/slider/cafe1.png",
  },
  {
    id: 3,
    gradient: "from-yellow-900 via-amber-800 to-orange-900",
    icon: "🌱",
    cta: "Mejor Molido →",
    image: "/slider/cafe2.png",
  },
  {
    id: 4,
    gradient: "from-amber-950 via-stone-900 to-amber-900",
    icon: "🏪",
    cta: "Agua de calidad →",
    image: "/slider/cafe3.png",
  },
  {
    id: 5,
    gradient: "from-stone-900 via-amber-900 to-yellow-900",
    icon: "🫖",
    cta: "Controla la Temperatura →",
    image: "/slider/cafe4.png",
  },
  {
    id: 6,
    gradient: "from-amber-900 via-orange-800 to-amber-800",
    icon: "🏆",
    cta: "Domina la Extracción →",
    image: "/slider/cafe5.png",
  },
  {
    id: 7,
    gradient: "from-stone-800 via-amber-800 to-stone-800",
    icon: "🔬",
    cta: "Texturizar la Leche →",
    image: "/slider/cafe6.png",
  },
  {
    id: 8,
    gradient: "from-amber-800 via-orange-700 to-amber-700",
    icon: "📅",
    cta: "Presentar el Cafe →",
    image: "/slider/cafe7.png",
  },
  
  {
    id: 9,
    gradient: "from-amber-800 via-orange-700 to-amber-700",
    icon: "📅",
    cta: "Personaliza tu cafe al Gusto →",
    image: "/slider/cafe8.png",
  },

]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const SliderSection = () => {
  const { t } = useLanguage()

  // Estados
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const totalSlides = slides.length

  // Navegar a un slide específico
  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  // Siguiente slide
  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  // Slide anterior
  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // Auto-play cada 5 segundos (pausa al hover)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => nextSlide(), 10000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  // Navegación por teclado (← →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      else if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevSlide, nextSlide])

  // Obtener índice considerando bucle circular
  const getSlideIndex = (offset: number): number => {
    return (currentIndex + offset + totalSlides) % totalSlides
  }

  // Manejar error de carga de imagen
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
      transition: { duration: 0.5, ease: "easeInOut" },
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
    <section className="py-10 px-6 relative overflow-hidden bg-stone-800">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 
                      bg-gradient-to-b from-stone-900 via-transparent to-stone-950" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado de la sección */}
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
            className="inline-block 
                       bg-amber-500/15 
                       text-amber-300 px-4 py-2 rounded-full 
                       text-sm font-black mb-4 border border-white"
            
          >
            📚 Nuestros Cursos Destacados
          </motion.span>

          <h2 className="font-serif text-5xl md:text-6xl font-handwritten mb-4">
            <span className="text-white"> {t("slider.title")}</span>
          </h2>
          
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 
                             bg-clip-text text-transparent">
              {t("slider.subtitle")}
          </span>
          
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
             Descubre nuestros cursos más populares y conviértete en un barista 
             certificado con las mejores técnicas del mundo.
          </p>
        </motion.div>

        {/* Contenedor del slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Carrusel de cursos"
          aria-roledescription="carousel"
        >
          {/* Área de cards con efecto peek */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            
            {/* Card ANTERIOR (peek izquierdo) - solo desktop */}
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
                  <div className="bg-stone-900/10 backdrop-blur-sm rounded-xl p-3">
                    <span className="text-2xl block">{slides[getSlideIndex(-1)].icon}</span>
                    <h3 className="text-white font-bold text-sm mt-1">{slides[getSlideIndex(-1)].title}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Card ACTIVA (centro, interactiva) */}
            <div className="w-full md:w-1/2 relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative rounded-3xl overflow-hidden 
                             shadow-2xl shadow-amber-500/10 min-h-[350px] 
                             flex flex-col justify-between"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${currentIndex + 1} de ${totalSlides}: ${slides[currentIndex].title}`}
                >
                  {/* Imagen de fondo */}
                  {!imageErrors[slides[currentIndex].id] ? (
                    <img
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].title}
                      className="absolute inset-0 w-full h-full object-cover 
                                 hover:shadow-lg 
                                 hover:shadow-amber-500/25 transition-all"
                      onError={() => handleImageError(slides[currentIndex].id)}
                      loading="lazy"
                    />
                  ) : null}

                  {/* Overlay de gradiente para legibilidad */}
                  {/*<div className={`absolute inset-0 bg-gradient-to-br ${slides[currentIndex].gradient} opacity-10`} />*/}

                  {/* Contenido de la card */}
                  <div className="relative z-10 p-6 md:p-8 flex flex-col 
                                  justify-end h-full min-h-[350px]">
                    
                    {/* fondo de la carta del slaider */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                      className="border-black rounded-2xl p-1 md:p-3 shadow-2xl"
                    >
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
                        className="font-handwritten text-2xl md:text-3xl  
                                   text-black mb-2"
                      >
                        {slides[currentIndex].title}
                      </motion.h3>
                       {/* descripcion de la carta del slider */}
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-black text-sm md:text-base
                                   font-black 
                                   shadows-xl-cyan
                                   leading-relaxed mb-4"
                      >
                        {slides[currentIndex].description}
                      </motion.p>
                       {/* Boton dentro del las cartas del slider*/}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.40 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-300 to-orange-500 
                                   text-black px-6 py-2.5 
                                   rounded-full font-handwritten text-sm 
                                   hover:shadow-lg 
                                   hover:shadow-amber-500/25 transition-all"
                      >
                        {slides[currentIndex].cta}
                      </motion.button>
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
                  <div className="bg-stone-900/60 backdrop-blur-sm rounded-xl p-3">
                    <span className="text-2xl block">{slides[getSlideIndex(1)].icon}</span>
                    <h3 className="text-white font-bold text-sm mt-1">{slides[getSlideIndex(1)].title}</h3>
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
            className="absolute right-0 md:-right-4 top-1/2 
                       -translate-y-1/2 w-12 h-12 rounded-full bg-stone-800/80 
                       backdrop-blur-sm border border-amber-500/20 flex items-center 
                       justify-center text-white hover:bg-stone-700 transition-all z-20"
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
