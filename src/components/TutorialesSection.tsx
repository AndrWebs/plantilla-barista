"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const tutorialesDestacados = [
  {
    id: 1,
    titulo: "Espresso Perfecto",
    gif: "/tutorials/cafe.png",
    pasos: 5,
    nivel: "Intermedio",
  },
  {
    id: 2,
    titulo: "Método V60",
    img: "/tutorials/cafe1.png",
    pasos: 5,
    nivel: "Principiante",
  },
  {
    id: 3,
    titulo: "Latte Art",
    img: "/tutorials/cafe.png",
    pasos: 5,
    nivel: "Avanzado",
  },
  {
    id: 4,
    titulo: "Chemex",
    img: "/tutorials/cafe1.png",
    pasos: 5,
    nivel: "Principiante",
  },
]

const TutorialesSection = () => {
  return (
    <section className="py-20 px-6 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-amber-500/15 text-amber-300 
                           px-4 py-2 rounded-full text-sm font-semibold 
                           mb-4 border border-amber-500/20">
            🎓 Tutoriales Premium
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">Preparación de </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 
                             bg-clip-text text-transparent">
              Café de Especialidad
            </span>
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Aprende paso a paso las técnicas de los campeones mundiales.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorialesDestacados.map((tutorial) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-stone-800/50 border border-white/5 rounded-2xl 
                         overflow-hidden hover:border-amber-500/30 transition-all"
            >
              <div className="relative h-48 bg-black/30">
                <img
                  src={tutorial.img}
                  alt={tutorial.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 
                             transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2">
                  <span className="bg-black/70 text-amber-300 text-xs px-2 py-1 rounded-full">
                    {tutorial.nivel}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  {tutorial.titulo}
                </h3>
                <p className="text-stone-400 text-sm mb-3">
                  {tutorial.pasos} pasos
                </p>
                <Link
                  href={`/tutoriales`}
                  className="text-amber-400 hover:text-amber-300 font-semibold text-sm"
                >
                  Ver tutoriales →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TutorialesSection
