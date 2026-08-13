"use client"

import { motion } from "framer-motion"
//import CoffeeCup3D from "./CoffeeCup3D"
import CoffeeCupCSS3D from "./CoffeeCupCSS3D"

const Hero1 = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-stone-950">
      {/* Fondo con textura sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-black" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #d4a574 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      {/* Luz ambiental cálida */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 pt-20 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Columna de texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              ☕ Barista Profesional Certificado
            </motion.span>

            <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="text-white">El arte del </span>
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                café perfecto
              </span>
            </h1>

            <p className="text-xl text-stone-300 mb-8 leading-relaxed">
              Aprende las técnicas de los mejores baristas del mundo. 
              Desde el espresso perfecto hasta el arte latte más impresionante.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-600 to-orange-500 px-8 py-4 rounded-full font-bold text-lg text-white shadow-xl shadow-amber-500/25"
              >
                Ver Cursos →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-amber-400/30 hover:border-amber-400 px-8 py-4 rounded-full font-bold text-lg text-white transition-all"
              >
                Solicitar Demo ☕
              </motion.button>
            </div>

            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-black text-amber-400">+500</div>
                <div className="text-stone-400 text-sm">Alumnos Certificados</div>
              </div>
              <div>
                <div className="text-3xl font-black text-orange-400">98%</div>
                <div className="text-stone-400 text-sm">Satisfacción</div>
              </div>
              <div>
                <div className="text-3xl font-black text-amber-400">12</div>
                <div className="text-stone-400 text-sm">Cursos Disponibles</div>
              </div>
            </div>
          </motion.div>

          {/* Columna de la taza 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[500px] md:h-[600px]"
          >
            <CoffeeCupCSS3D />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero1
