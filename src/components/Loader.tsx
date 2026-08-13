// ============================================
// COMPONENTE: Loader
// ============================================
// Pantalla de carga animada que se muestra
// al abrir la página. Inspirado en Apple, Tesla y Stripe.
//
// Características:
// - Logo con animación de entrada (escala + rotación)
// - Nombre "BARISPRO.com" con gradiente
// - Barra de carga que se llena
// - Se oculta automáticamente después de 2 segundos
// - Transición suave de salida
// ============================================

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Tiempo de carga: 2 segundos (ajustable)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          // Animación de salida: se desvanece
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950"
        >
          <div className="text-center">
            
            {/* Logo animado */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.8 
              }}
              className="mb-8"
            >
              {/* Círculo decorativo detrás del emoji */}
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50 animate-pulse" />
                <span className="relative text-8xl">🌍</span>
              </div>
            </motion.div>

            {/* Nombre de la marca */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-5xl md:text-6xl font-black bg-gradient-to-r 
                         from-purple-400 via-amber-400 to-purple-400 
                         bg-clip-text text-transparent"
            >
              BARISPRO.com
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-gray-400 mt-3 text-sm tracking-[0.3em] uppercase"
            >
              Tecnología Digital Naturalite19
            </motion.p>

            {/* Barra de carga */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 w-56 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
              />
            </motion.div>

            {/* Texto de carga */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-600 text-xs mt-4"
            >
              Cargando...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader
