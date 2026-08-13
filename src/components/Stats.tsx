import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const stats = [
  { 
    number: 500, 
    suffix: "+", 
    label: "Proyectos Entregados",
    icon: "🚀",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  { 
    number: 98, 
    suffix: "%", 
    label: "Clientes Satisfechos",
    icon: "❤️",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  { 
    number: 10, 
    suffix: "M+", 
    label: "Usuarios Impactados",
    icon: "👥",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  { 
    number: 15, 
    suffix: " años", 
    label: "Experiencia",
    icon: "🎯",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
]

// Componente para animar números
const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return <>{count}</>
}

const Stats = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Línea superior con gradiente */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Números que 
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Hablan</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Resultados comprobables que respaldan nuestro trabajo
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 text-center group-hover:border-white/10 transition-all duration-300">
                {/* Icono */}
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>

                {/* Número animado */}
                <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-2`}>
                  <AnimatedNumber value={stat.number} />
                  <span>{stat.suffix}</span>
                </div>

                {/* Label */}
                <p className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Línea inferior con gradiente */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </section>
  )
}

export default Stats
