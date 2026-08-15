"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

// ============================================
// DATOS DE LOS PASOS (misma estructura)
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
    imagen: "/slider/cafe5.png",
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
  const [direction, setDirection] = useState(1) // 1 = derecha, -1 = izquierda
  const [isPaused, setIsPaused] = useState(false)

  const totalSlides = pasos.length

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
    const timer = setInterval(() => nextSlide(), 8000)
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

  // Variantes de animación "pasar hoja de cuaderno"
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 400 : -400,       // Entra desde la derecha o izquierda
      opacity: 0,
      rotateY: dir > 0 ? 25 : -25,   // Ligero giro 3D como una hoja
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -400 : 400,
      opacity: 0,
      rotateY: dir > 0 ? -25 : 25,
      scale: 0.9,
      transition: { duration: 0.4 },
    }),
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-stone-950">
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
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 
                             bg-clip-text text-transparent">
              a tu taza
            </span>
          </h2>

          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Cada paso de nuestro proceso está diseñado para garantizar la taza perfecta.
          </p>
        </motion.div>

        {/* Contenedor del slider con overflow oculto */}
        <div
          className="relative overflow-hidden rounded-3xl bg-stone-800/20 
                     border border-amber-500/10 shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative w-full aspect-[16/9] max-h-[500px]"
            >
              {/* Imagen de fondo */}
              <img
                src={pasos[currentIndex].imagen}
                alt={pasos[currentIndex].titulo}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t 
                              from-black/80 via-black/30 to-transparent" />
              
              {/* Texto superpuesto */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg"
                >
                  {pasos[currentIndex].titulo}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="text-stone-200 text-sm md:text-lg leading-relaxed 
                             max-w-2xl drop-shadow-md"
                >
                  {pasos[currentIndex].descripcion}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Flechas de navegación */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center text-white hover:bg-black/60 transition-all z-20"
            aria-label="Paso anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center text-white hover:bg-black/60 transition-all z-20"
            aria-label="Paso siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Indicadores de posición */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {pasos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
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
