// ============================================
// COMPONENTE: SliderSection
// ============================================
// Propósito: Slider educativo con efecto "peek"
// (la card siguiente y anterior asoman a los lados).
//
// Características:
// - 4 slides con imágenes reales PNG
// - Auto-play cada 5 segundos (pausa al hover)
// - Navegación con flechas, indicadores y teclado
// - Efecto 3D con Framer Motion
// - Responsive: en móvil solo se ve una card
// - Las imágenes se adaptan automáticamente (object-cover)
// - Overlay de gradiente para que el texto sea legible
// - Fallback: si una imagen falla, muestra gradiente
// ============================================

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../context/LanguageContext"

// ============================================
// IMPORTAR IMÁGENES REALES
// Vite las optimiza automáticamente en producción
// ============================================
import img1 from "../assets/slider/img1.png"
import img2 from "../assets/slider/img2.png"
import img3 from "../assets/slider/img3.png"
import img4 from "../assets/slider/img4.jpg"

// ============================================
// TIPO DE DATO PARA CADA SLIDE
// ============================================
type Slide = {
  id: number          // Identificador único
  title: string       // Título del slide
  description: string // Descripción breve
  gradient: string    // Gradiente de fondo (fallback si no hay imagen)
  icon: string        // Emoji decorativo
  cta: string         // Texto del botón
  image: string       // Imagen importada
}

// ============================================
// DATOS DE LOS SLIDES
// Modifica este array para cambiar el contenido
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
  // Hook de traducciones
  const { t } = useLanguage()

  // ============================================
  // ESTADOS DEL SLIDER
  // ============================================
  const [currentIndex, setCurrentIndex] = useState(0)    // Slide actual
  const [isPaused, setIsPaused] = useState(false)        // Pausa al hover
  const [direction, setDirection] = useState(1)          // Dirección: 1=derecha, -1=izquierda
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({}) // Imágenes que fallaron

  const totalSlides = slides.length  // Número total de slides (4)

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
    if (isPaused) return  // Si está pausado, no hacer nada

    const timer = setInterval(() => {
      nextSlide()
    }, 5000)  // 5000ms = 5 segundos

    return () => clearInterval(timer)  // Limpiar al desmontar
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
  // FUNCIÓN: Obtener índice con bucle circular
  // Ejemplo: si estás en slide 4 y pides +1, vuelve al 1
  // ============================================
  const getSlideIndex = (offset: number): number => {
    return (currentIndex + offset + totalSlides) % totalSlides
  }

  // ============================================
  // FUNCIÓN: Manejar error de carga de imagen
  // Si una imagen falla, se oculta y se muestra el gradiente
  // ============================================
  const handleImageError = (slideId: number) => {
    setImageErrors((prev) => ({ ...prev, [slideId]: true }))
  }

  // ============================================
  // VARIANTES DE ANIMACIÓN (Framer Motion)
  // Controlan cómo entran y salen los slides
  // ============================================
  const slideVariants = {
    // Estado inicial: entra desde un lado
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,    // Posición inicial (derecha o izquierda)
      opacity: 0,                  // Transparente
      scale: 0.85,                 // Ligeramente reducido
      rotateY: dir > 0 ? 15 : -15, // Rotación 3D
    }),
    // Estado final: centrado y visible
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut", // Curva de animación suave
      },
    },
    // Estado de salida: se va hacia el otro lado
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.85,
      rotateY: dir > 0 ? -15 : 15,
      transition: { duration: 0.4 },
    }),
  }

  // ============================================
  // RENDERIZADO
  // ============================================
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-slate-950">
      {/* Fondo decorativo sutil */}
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
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            📚 Aprende y Crece
          </motion.span>

          {/* Título */}
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">{t("slider.title1") || "Nuestros "}</span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {t("slider.title2") || "Cursos Destacados"}
            </span>
          </h2>

          {/* Descripción */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("slider.desc") || "Descubre nuestras formaciones más populares y empieza a transformar tu carrera profesional hoy mismo."}
          </p>
        </motion.div>

        {/* ============================================ */}
        {/* CONTENEDOR DEL SLIDER                        */}
        {/* Pausa el auto-play cuando el mouse está encima */}
        {/* ============================================ */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Carrusel de cursos"
          aria-roledescription="carousel"
        >
          {/* ============================================ */}
          {/* ÁREA DE CARDS CON EFECTO PEEK                */}
          {/* 3 cards visibles en desktop:                 */}
          {/* - Izquierda: card anterior (peek)            */}
          {/* - Centro: card activa (completa)             */}
          {/* - Derecha: card siguiente (peek)             */}
          {/* En móvil: solo se ve la card central         */}
          {/* ============================================ */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            
            {/* ============================================ */}
            {/* CARD ANTERIOR (PEEK IZQUIERDO)               */}
            {/* Solo visible en desktop (md hacia arriba)    */}
            {/* Reducida, opaca y desenfocada                */}
            {/* ============================================ */}
            <div className="hidden md:block w-1/4 opacity-40 scale-90 blur-[1px] pointer-events-none">
              <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl">
                {/* Imagen de fondo */}
                <img
                  src={slides[getSlideIndex(-1)].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay de color */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slides[getSlideIndex(-1)].gradient} opacity-60`} />
                {/* Contenido mínimo */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <span className="text-3xl">{slides[getSlideIndex(-1)].icon}</span>
                  <h3 className="text-white font-bold text-lg">{slides[getSlideIndex(-1)].title}</h3>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* CARD ACTIVA (CENTRO)                         */}
            {/* Visible completa, interactiva, animada       */}
            {/* ============================================ */}
            <div className="w-full md:w-1/2 relative">
              {/* AnimatePresence permite animar al cambiar de slide */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}           // Clave única para cada slide
                  custom={direction}            // Dirección para la animación
                  variants={slideVariants}      // Variantes de animación
                  initial="enter"               // Estado inicial
                  animate="center"              // Estado final
                  exit="exit"                   // Estado al salir
                  className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 min-h-[350px] flex flex-col justify-between"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${currentIndex + 1} de ${totalSlides}: ${slides[currentIndex].title}`}
                >
                  {/* ============================================ */}
                  {/* IMAGEN DE FONDO                              */}
                  {/* Si hay error de carga, se oculta             */}
                  {/* object-cover: la imagen se adapta al espacio */}
                  {/* ============================================ */}
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
                  {/* OVERLAY DE GRADIENTE                         */}
                  {/* Oscurece la imagen para que el texto blanco  */}
                  {/* sea legible en cualquier fondo               */}
                  {/* ============================================ */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentIndex].gradient} opacity-70`} />

                  {/* ============================================ */}
                  {/* CONTENIDO DE LA CARD                         */}
                  {/* Se muestra encima de la imagen y el overlay  */}
                  {/* ============================================ */}
                  <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between h-full min-h-[350px]">
                    <div>
                      {/* Icono animado */}
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
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ============================================ */}
            {/* CARD SIGUIENTE (PEEK DERECHO)                */}
            {/* Solo visible en desktop                      */}
            {/* ============================================ */}
            <div className="hidden md:block w-1/4 opacity-40 scale-90 blur-[1px] pointer-events-none">
              <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl">
                {/* Imagen de fondo */}
                <img
                  src={slides[getSlideIndex(1)].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay de color */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slides[getSlideIndex(1)].gradient} opacity-60`} />
                {/* Contenido mínimo */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <span className="text-3xl">{slides[getSlideIndex(1)].icon}</span>
                  <h3 className="text-white font-bold text-lg">{slides[getSlideIndex(1)].title}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* FLECHA IZQUIERDA                             */}
          {/* ============================================ */}
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

          {/* ============================================ */}
          {/* FLECHA DERECHA                               */}
          {/* ============================================ */}
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
        {/* INDICADORES DE POSICIÓN (PUNTOS)             */}
        {/* El punto activo es más ancho y de color      */}
        {/* ============================================ */}
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-purple-500 w-8 h-3"       // Activo: barra ancha
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
