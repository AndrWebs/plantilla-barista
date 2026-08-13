"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

// ============================================
// DATOS DE LOS PASOS
// ============================================
const pasos = [
  {
    id: 1,
    titulo: "1. Selección del Grano",
    descripcion: "Elegimos granos 100% arábica de origen único, cultivados a más de 1,500 metros de altitud para garantizar la máxima calidad y sabor.",
    imagen: "/slider/cafe.png",
  },
  {
    id: 2,
    titulo: "2. Tueste Artesanal",
    descripcion: "Tueste medio en lotes pequeños para resaltar las notas naturales del café. Control preciso de temperatura y tiempo.",
    imagen: "/slider/cafe1.png",
  },
  {
    id: 3,
    titulo: "3. Molienda Precisa",
    descripcion: "Molimos los granos justo antes de la preparación con molinillo de muelas cónicas para preservar los aceites esenciales.",
    imagen: "/slider/cafe2.png",
  },
  {
    id: 4,
    titulo: "4. Extracción Perfecta",
    descripcion: "Controlamos temperatura (92°C), presión (9 bares) y tiempo (25-30s) para obtener un espresso balanceado y aromático.",
    imagen: "/slider/cafe3.png",
  },
  {
    id: 5,
    titulo: "5. Arte y Presentación",
    descripcion: "Texturizamos la leche a microespuma sedosa y vertimos arte latte para una experiencia visual y sensorial completa.",
    imagen: "/slider/cafe4.png",
  },
]

const PasosSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const totalSlides = pasos.length

  // Siguiente paso
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  // Slide anterior
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // Auto-play cada 5 segundos (pausa al hover)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => nextSlide(), 7000)
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

  // Obtener la posición real en el array circular
  const getSlideIndex = (offset: number): number => {
    return (currentIndex + offset + totalSlides) % totalSlides
  }

  // Calcular el ancho de cada capa
  const capas = [
    { offset: 3, width: "60%", opacity: 1, zIndex: 10, blur: "blur-0" },
    { offset: 2, width: "70%", opacity: 0.7, zIndex: 9, blur: "blur-[1px]" },
    { offset: 1, width: "80%", opacity: 0.5, zIndex: 8, blur: "blur-[2px]" },
    { offset: 0, width: "100%", opacity: 0.3, zIndex: 7, blur: "blur-[3px]" },
  ]

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-stone-950">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-transparent to-stone-950" />

      <div className="max-w-4xl mx-auto relative z-10">
        
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
            className="inline-block bg-amber-500/15 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-500/20"
          >
            🎯 Nuestro Proceso
          </motion.span>

          <h2 className="font-serif text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">Del grano </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              a tu taza
            </span>
          </h2>

          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Cada paso de nuestro proceso está diseñado para garantizar la taza perfecta.
          </p>
        </motion.div>

        {/* ============================================ */}
        {/* SLIDER DE PASOS CON EFECTO CASCADA           */}
        {/* ============================================ */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          
          {/* Capas apiladas (4 capas visibles) */}
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {capas.map((capa) => {
                const slideIndex = getSlideIndex(capa.offset)
                const slide = pasos[slideIndex]
                const isTop = capa.offset === 3

                return (
                  <motion.div
                    key={`${slide.id}-${capa.offset}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: capa.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`absolute rounded-3xl overflow-hidden shadow-2xl ${capa.blur}`}
                    style={{
                      width: capa.width,
                      zIndex: capa.zIndex,
                      aspectRatio: "16/9",
                      maxWidth: "800px",
                    }}
                  >
                    {/* Imagen de fondo */}
                    <img
                      src={slide.imagen}
                      alt={slide.titulo}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Overlay degradado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Texto (solo visible en la capa superior) */}
                    {isTop && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                      >
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                          {slide.titulo}
                        </h3>
                        <p className="text-stone-200 text-sm md:text-base leading-relaxed max-w-xl">
                          {slide.descripcion}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* ============================================ */}
          {/* FLECHAS DE NAVEGACIÓN                        */}
          {/* ============================================ */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-800/80 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center text-white hover:bg-stone-700 transition-all z-20"
            aria-label="Paso anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-800/80 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center text-white hover:bg-stone-700 transition-all z-20"
            aria-label="Paso siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* ============================================ */}
        {/* INDICADORES DE POSICIÓN (PUNTOS)             */}
        {/* ============================================ */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {pasos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-amber-500 w-8 h-3"
                  : "bg-stone-600 w-3 h-3 hover:bg-amber-400/40"
              }`}
              aria-label={`Ir al paso ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PasosSlider
