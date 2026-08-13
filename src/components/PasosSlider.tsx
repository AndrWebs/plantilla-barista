"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

// ============================================
// DATOS DE LOS PASOS (SOLO IMÁGENES)
// ============================================
const pasos = [
  { id: 1, imagen: "/slider/cafe1.png" },
  { id: 2, imagen: "/slider/cafe2.png" },
  { id: 3, imagen: "/slider/cafe3.png" },
  { id: 4, imagen: "/slider/cafe4.png" },
  { id: 5, imagen: "/slider/cafe5.png" },
  { id: 6, imagen: "/slider/cafe6.png" },
  { id: 7, imagen: "/slider/cafe7.png" },
  { id: 8, imagen: "/slider/cafe8.png" },
  { id: 9, imagen: "/slider/cafe.png" },
]

const SliderPasos = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const totalSlides = pasos.length

  // Auto‑avance cada 5 segundos (respetando pausa)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 9000) // ← 7 segundos entre cambios
    return () => clearInterval(timer)
  }, [isPaused, totalSlides])

  // Navegación manual
  const goTo = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-stone-950">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Encabezado opcional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="inline-block bg-amber-500/15 text-amber-300 
                           px-2 py-2 rounded-full text-sm 
                           font-script mb-2 border border-stone-100">
            🎯 Aprende paso a paso, incluso si nunca has preparado un espresso.
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">Del grano </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              a tu taza
            </span>
          </h2>
        </motion.div>

        {/* Contenedor del slider con efecto zoom al pasar el mouse */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl 
                     aspect-[16/9] max-h-[500px] group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Imagen activa con zoom suave al hacer hover */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={pasos[currentIndex].imagen}
              alt={`Paso ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full 
                         object-contain transition-transform 
                         duration-500 group-hover:scale-135"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              loading="lazy"
            />
          </AnimatePresence>

          {/* Botón de taza de café (centrado abajo) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-white flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30 transition-all border-2 border-amber-300"
              aria-label="Siguiente paso"
            >
              ☕
            </motion.button>
          </div>

          {/* Flechas laterales (opcional) */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all z-20"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all z-20"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores de posición (puntos) */}
        <div className="flex justify-center gap-2 mt-6">
          {pasos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-amber-500 w-8 h-3" : "bg-stone-600 w-3 h-3 hover:bg-amber-400/40"
              }`}
              aria-label={`Ir al paso ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SliderPasos
