// ============================================
// COMPONENTE: ParallaxSection
// Demostración de efectos parallax multi-capa.
// Capas que se mueven a diferentes velocidades
// creando una sensación 3D al hacer scroll.
// ============================================

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "../context/LanguageContext"

const ParallaxSection = () => {
  const { t } = useLanguage()

  // Referencia al contenedor principal
  const containerRef = useRef<HTMLDivElement>(null)

  // useScroll rastrea el progreso del scroll sobre este elemento
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // ============================================
  // TRANSFORMACIONES PARALLAX
  // Cada capa se mueve a diferente velocidad
  // ============================================
  
  // Capa 1 (fondo): se mueve muy lento - sensación de profundidad lejana
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

  // Capa 2 (media): velocidad media
  const midY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const midRotate = useTransform(scrollYProgress, [0, 1], [0, 10])

  // Capa 3 (frontal): se mueve rápido - sensación de cercanía
  const frontY = useTransform(scrollYProgress, [0, 1], [200, -200])
  const frontX = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const frontOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Texto: también con parallax sutil
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="py-40 px-6 relative overflow-hidden bg-slate-950"
    >
      {/* ============================================ */}
      {/* CAPA 1: FONDO - Círculo grande, movimiento lento */}
      {/* ============================================ */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-[800px] h-[800px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* ============================================ */}
      {/* CAPA 2: MEDIA - Forma geométrica, velocidad media */}
      {/* ============================================ */}
      <motion.div
        style={{ y: midY, rotate: midRotate }}
        className="absolute top-1/4 right-10"
      >
        <div className="w-64 h-64 border-2 border-purple-500/20 rounded-3xl rotate-45" />
      </motion.div>

      <motion.div
        style={{ y: midY, rotate: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
        className="absolute bottom-1/4 left-10"
      >
        <div className="w-48 h-48 border-2 border-cyan-500/20 rounded-full" />
      </motion.div>

      {/* ============================================ */}
      {/* CAPA 3: FRONTAL - Elementos pequeños, movimiento rápido */}
      {/* ============================================ */}
      <motion.div
        style={{ y: frontY, x: frontX, opacity: frontOpacity }}
        className="absolute top-1/3 left-1/4"
      >
        <div className="w-4 h-4 bg-purple-400 rounded-full blur-sm" />
      </motion.div>

      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [-200, 200]),
          x: useTransform(scrollYProgress, [0, 1], [50, -50]),
          opacity: frontOpacity 
        }}
        className="absolute bottom-1/3 right-1/4"
      >
        <div className="w-3 h-3 bg-pink-400 rounded-full blur-sm" />
      </motion.div>

      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [150, -150]),
          opacity: frontOpacity 
        }}
        className="absolute top-1/2 left-1/2"
      >
        <div className="w-2 h-2 bg-cyan-400 rounded-full blur-sm" />
      </motion.div>

      {/* ============================================ */}
      {/* TEXTO CENTRAL - También con parallax */}
      {/* ============================================ */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-6xl md:text-8xl font-black mb-8">
          <span className="text-white">
            {t("parallax.title1") || "Tecnología que "}
          </span>
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            {t("parallax.title2") || "Inspira"}
          </span>
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {t("parallax.desc") || "Creamos experiencias digitales inmersivas que cautivan a tus usuarios desde el primer scroll. Cada detalle cuenta."}
        </p>
      </motion.div>
    </section>
  )
}

export default ParallaxSection
