// ============================================
// COMPONENTE: SliderSection
// ============================================
// Slider de cards con efecto "peek".
// ✅ Imágenes LIMPIAS sin filtros de color
// ✅ Texto en TARJETA FLOTANTE tipo nube (glassmorphism)
// ✅ Fondo oscuro semi-transparente para legibilidad
// ✅ 4 slides con imágenes PNG reales
// ============================================

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../context/LanguageContext"

// ============================================
// IMPORTAR IMÁGENES REALES
// ============================================
import img1 from "../assets/slider/img1.png"
import img2 from "../assets/slider/img2.png"
import img3 from "../assets/slider/img3.png"
import img4 from "../assets/slider/img4.jpg"

// ============================================
// TIPO DE DATO
// ============================================
type Slide = {
  id: number
  title: string
  description: string
  gradient: string
  icon: string
  cta: string
  image: string
}

// ============================================
// DATOS DE LOS 4 SLIDES
// ============================================
const slides: Slide[] = [
  {
    id: 1,
    title: "Aprende Desarrollo Web",
    description: "Domina las tecnologías más demandadas del mercado con nuestros cursos prácticos y proyectos reales.",
    gradient: "from-purple-600 via-purple-500 to-pink-600",
    icon: "💻",
    cta: "Ver Cursos →",
    image: img1,
  },
  {
    id: 2,
    title: "Marketing Digital",
    description: "Estrategias probadas para aumentar tu presencia online y captar más clientes con técnicas avanzadas.",
    gradient: "from-cyan-600 via-blue-500 to-cyan-600",
    icon: "📈",
    cta: "Saber Más →",
    image: img2,
  },
  {
    id: 3,
    title: "Inteligencia Artificial",
    description: "Descubre cómo la IA está transformando los negocios y aprende a implementarla en tu empresa.",
    gradient: "from-emerald-600 via-green-500 to-teal-600",
    icon: "🤖",
    cta: "Explorar IA →",
    image: img3,
  },
  {
    id: 4,
    title: "Diseño UX/UI",
    description: "Crea experiencias de usuario que enamoren y conviertan visitantes en clientes fieles.",
    gradient: "from-orange-600 via-orange-500 to-red-600",
    icon: "🎨",
    cta: "Ver Diseños →",
    image: img4,
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

  // Auto-play cada 5 segundos (pausa al hover)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => nextSlide(), 5000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  // Navegación por teclado
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

  // Variantes de animación
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
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? -15 : 15,
      transition: { duration: 0.4 },
    }),
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-950" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado */}
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

        {/* Contenedor del slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Carrusel de cursos"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            
            {/* ============================================ */}
            {/* CARD ANTERIOR (PEEK IZQUIERDO)               */}
            {/* IMAGEN LIMPIA + TARJETA NUBE PEQUEÑA         */}
            {/* ============================================ */}
            <div className="hidden md:block w-1/4 opacity-40 scale-90 blur-[1px] pointer-events-none">
              <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl">
                {/* ✅ IMAGEN LIMPIA (sin overlay de color) */}
                <img
                  src={slides[getSlideIndex(-1)].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* ✅ TARJETA NUBE FLOTANTE para el texto */}
                <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                  <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-3">
                    <span className="text-2xl block">{slides[getSlideIndex(-1)].icon}</span>
                    <h3 className="text-white font-bold text-sm mt-1">{slides[getSlideIndex(-1)].title}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* CARD ACTIVA (CENTRO)                         */}
            {/* IMAGEN LIMPIA + TARJETA NUBE GRANDE          */}
            {/* ============================================ */}
            <div className="w-full md:w-1/2 relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 min-h-[350px] flex flex-col justify-between"
                  role="group"
                  aria-label={`Slide ${currentIndex + 1} de ${totalSlides}`}
                >
                  {/* ✅ IMAGEN LIMPIA (sin overlay de color encima) */}
                  {!imageErrors[slides[currentIndex].id] ? (
                    <img
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => handleImageError(slides[currentIndex].id)}
                      loading="lazy"
                    />
                  ) : null}

                  {/* ============================================ */}
                  {/* 🔥 CAMBIO PRINCIPAL: TARJETA NUBE FLOTANTE  */}
                  {/* En lugar de overlay + texto suelto, usamos  */}
                  {/* una tarjeta con glassmorphism que contiene   */}
                  {/* el icono, título, descripción y botón       */}
                  {/* ============================================ */}
                  <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full min-h-[350px]">
                    
                    {/* Tarjeta nube con efecto vidrio */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="bg-slate-900/75 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl"
                    >
                      {/* Icono */}
                      <motion.span
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="text-4xl block mb-3"
                      >
                        {slides[currentIndex].icon}
                      </motion.span>

                      {/* Título */}
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl md:text-3xl font-bold text-white mb-2"
                      >
                        {slides[currentIndex].title}
                      </motion.h3>

                      {/* Descripción */}
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-300 text-sm md:text-base leading-relaxed mb-4"
                      >
                        {slides[currentIndex].description}
                      </motion.p>

                      {/* Botón CTA */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                      >
                        {slides[currentIndex].cta}
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ============================================ */}
            {/* CARD SIGUIENTE (PEEK DERECHO)                */}
            {/* IMAGEN LIMPIA + TARJETA NUBE PEQUEÑA         */}
            {/* ============================================ */}
            <div className="hidden md:block w-1/4 opacity-40 scale-90 blur-[1px] pointer-events-none">
              <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl">
                {/* ✅ IMAGEN LIMPIA (sin overlay de color) */}
                <img
                  src={slides[getSlideIndex(1)].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* ✅ TARJETA NUBE FLOTANTE para el texto */}
                <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                  <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-3">
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

        {/* Indicadores */}
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-purple-500 w-8 h-3"
                  : "bg-white/20 w-3 h-3 hover:bg-white/40"
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
