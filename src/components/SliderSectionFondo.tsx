// ============================================
// COMPONENTE: SliderSection
// ============================================
// Propósito: Slider de cards con efecto "peek"
// (la card siguiente y anterior asoman a los lados).
//
// Características:
// - Auto-play cada 5 segundos (pausa al hover)
// - Navegación con flechas, indicadores y teclado
// - Efecto 3D: card activa centrada, laterales reducidas
// - Responsive: en móvil solo se ve una card
// - Framer Motion para transiciones suaves
// - Fácil de cambiar contenido (array de slides)
// ============================================

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../context/LanguageContext"

// ============================================
// TIPO DE DATO PARA CADA SLIDE
// ============================================
type Slide = {
  id: number
  title: string           // Título de la card
  description: string     // Descripción breve
  gradient: string        // Clases de gradiente Tailwind (ej: "from-purple-600 to-pink-600")
  icon: string            // Emoji o icono decorativo
  cta: string             // Texto del botón
}

// ============================================
// DATOS DE LOS SLIDES (fácil de modificar)
// Cuando tengas imágenes reales, añade el campo "image"
// ============================================
const slides: Slide[] = [
  {
    id: 1,
    title: "Aprende Desarrollo Web",
    description: "Domina las tecnologías más demandadas del mercado con nuestros cursos prácticos y proyectos reales.",
    gradient: "from-purple-600 via-purple-500 to-pink-600",
    icon: "💻",
    cta: "Ver Cursos →",
  },
  {
    id: 2,
    title: "Marketing Digital",
    description: "Estrategias probadas para aumentar tu presencia online y captar más clientes con técnicas avanzadas.",
    gradient: "from-cyan-600 via-blue-500 to-cyan-600",
    icon: "📈",
    cta: "Saber Más →",
  },
  {
    id: 3,
    title: "Inteligencia Artificial",
    description: "Descubre cómo la IA está transformando los negocios y aprende a implementarla en tu empresa.",
    gradient: "from-emerald-600 via-green-500 to-teal-600",
    icon: "🤖",
    cta: "Explorar IA →",
  },
  {
    id: 4,
    title: "Diseño UX/UI",
    description: "Crea experiencias de usuario que enamoren y conviertan visitantes en clientes fieles.",
    gradient: "from-orange-600 via-orange-500 to-red-600",
    icon: "🎨",
    cta: "Ver Diseños →",
  },
  {
    id: 5,
    title: "Transformación Digital",
    description: "Lleva tu empresa al siguiente nivel con tecnología de vanguardia y procesos optimizados.",
    gradient: "from-indigo-600 via-violet-500 to-purple-600",
    icon: "🚀",
    cta: "Transformar Ahora →",
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const SliderSection = () => {
  const { t } = useLanguage()

  // ============================================
  // ESTADOS
  // ============================================
  const [currentIndex, setCurrentIndex] = useState(0)    // Índice del slide activo
  const [isPaused, setIsPaused] = useState(false)        // Pausa al hover
  const [direction, setDirection] = useState(1)          // 1 = derecha, -1 = izquierda

  // Total de slides
  const totalSlides = slides.length

  // ============================================
  // FUNCIÓN: Ir a un slide específico
  // ============================================
  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  // ============================================
  // FUNCIÓN: Siguiente slide
  // ============================================
  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  // ============================================
  // FUNCIÓN: Slide anterior
  // ============================================
  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // ============================================
  // EFECTO: Auto-play cada 5 segundos
  // Se pausa cuando el mouse está encima
  // ============================================
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // 5000ms = 5 segundos

    // Limpieza al desmontar o al pausar
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  // ============================================
  // EFECTO: Navegación por teclado (← →)
  // ============================================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevSlide, nextSlide])

  // ============================================
  // FUNCIÓN: Obtener el índice de un slide
  // considerando el bucle circular
  // ============================================
  const getSlideIndex = (offset: number): number => {
    return (currentIndex + offset + totalSlides) % totalSlides
  }

  // ============================================
  // VARIANTES DE ANIMACIÓN (Framer Motion)
  // ============================================
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,   // Entra desde la derecha o izquierda
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? 15 : -15,  // Rotación 3D
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Curva de easing suave
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,    // Sale hacia la izquierda o derecha
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? -15 : 15,
      transition: {
        duration: 0.4,
      },
    }),
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-slate-950">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-950" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ============================================ */}
        {/* ENCABEZADO DE LA SECCIÓN                      */}
        {/* ============================================ */}
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
            className="inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            📚 Aprende y Crece
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">{t("slider.title1") || "Nuestros "}</span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {t("slider.title2") || "Cursos Destacados"}
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("slider.desc") || "Descubre nuestras formaciones más populares y empieza a transformar tu carrera profesional hoy mismo."}
          </p>
        </motion.div>

        {/* ============================================ */}
        {/* CONTENEDOR DEL SLIDER                        */}
        {/* ============================================ */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}   // Pausar al entrar el mouse
          onMouseLeave={() => setIsPaused(false)}  // Reanudar al salir el mouse
          role="region"
          aria-label="Carrusel de cursos"
          aria-roledescription="carousel"
        >
          {/* ============================================ */}
          {/* ÁREA DE CARDS CON EFECTO PEEK                */}
          {/* Se muestran 3 cards: anterior, actual, siguiente */}
          {/* ============================================ */}
          <div className="flex items-center justify-center gap-4 md:gap-6 perspective-1000">
            
            {/* Card ANTERIOR (peek izquierdo) - visible solo en desktop */}
            <div className="hidden md:block w-1/4 opacity-40 scale-90 blur-[1px] pointer-events-none">
              <div className={`bg-gradient-to-br ${slides[getSlideIndex(-1)].gradient} rounded-2xl p-6 h-64 flex flex-col justify-between shadow-xl`}>
                <div>
                  <span className="text-3xl block mb-3">{slides[getSlideIndex(-1)].icon}</span>
                  <h3 className="text-white font-bold text-lg">{slides[getSlideIndex(-1)].title}</h3>
                </div>
              </div>
            </div>

            {/* Card ACTUAL (centro, completa, interactiva) */}
            <div className="w-full md:w-1/2 relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`bg-gradient-to-br ${slides[currentIndex].gradient} rounded-3xl p-8 md:p-10 shadow-2xl shadow-purple-500/20 min-h-[350px] flex flex-col justify-between`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${currentIndex + 1} de ${totalSlides}: ${slides[currentIndex].title}`}
                >
                  {/* Contenido de la card activa */}
                  <div>
                    {/* Icono grande */}
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="text-6xl block mb-6"
                    >
                      {slides[currentIndex].icon}
                    </motion.span>

                    {/* Título */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                      {slides[currentIndex].title}
                    </motion.h3>

                    {/* Descripción */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/80 text-lg leading-relaxed max-w-xl"
                    >
                      {slides[currentIndex].description}
                    </motion.p>
                  </div>

                  {/* Botón CTA */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg w-fit"
                  >
                    {slides[currentIndex].cta}
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Card SIGUIENTE (peek derecho) - visible solo en desktop */}
            <div className="hidden md:block w-1/4 opacity-40 scale-90 blur-[1px] pointer-events-none">
              <div className={`bg-gradient-to-br ${slides[getSlideIndex(1)].gradient} rounded-2xl p-6 h-64 flex flex-col justify-between shadow-xl`}>
                <div>
                  <span className="text-3xl block mb-3">{slides[getSlideIndex(1)].icon}</span>
                  <h3 className="text-white font-bold text-lg">{slides[getSlideIndex(1)].title}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* FLECHAS DE NAVEGACIÓN                        */}
          {/* ============================================ */}
          {/* Flecha IZQUIERDA */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-20"
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
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-20"
            aria-label="Slide siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* ============================================ */}
        {/* INDICADORES DE POSICIÓN (puntos)             */}
        {/* ============================================ */}
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-purple-500 w-8 h-3"       // Activo: más ancho
                  : "bg-white/20 w-3 h-3 hover:bg-white/40"  // Inactivo: círculo
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
