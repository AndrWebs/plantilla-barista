"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const Hero3 = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  // Datos fijos para granos de café (sin Math.random)
  const beans = [
    { x: 15, y: 20, s: 18, r: 25, d: 6, dl: 0, c: "#4a2518" },
    { x: 85, y: 15, s: 22, r: -35, d: 7, dl: 0.8, c: "#3e1f14" },
    { x: 25, y: 75, s: 20, r: 45, d: 5.5, dl: 1.5, c: "#5c2a1e" },
    { x: 75, y: 70, s: 24, r: -20, d: 6.5, dl: 2.2, c: "#4a2518" },
    { x: 50, y: 10, s: 16, r: 55, d: 5, dl: 0.5, c: "#3e1f14" },
    { x: 10, y: 50, s: 21, r: -40, d: 7.5, dl: 1.0, c: "#5c2a1e" },
    { x: 90, y: 45, s: 19, r: 30, d: 6, dl: 2.8, c: "#4a2518" },
    { x: 40, y: 85, s: 23, r: -15, d: 5.8, dl: 1.8, c: "#3e1f14" },
    { x: 60, y: 80, s: 17, r: 50, d: 6.2, dl: 0.3, c: "#5c2a1e" },
    { x: 35, y: 35, s: 25, r: -55, d: 4.8, dl: 2.5, c: "#4a2518" },
    { x: 70, y: 30, s: 20, r: 10, d: 5.5, dl: 1.2, c: "#3e1f14" },
    { x: 55, y: 55, s: 22, r: -30, d: 6.8, dl: 0.7, c: "#5c2a1e" },
    { x: 80, y: 60, s: 18, r: 60, d: 5.3, dl: 3.0, c: "#4a2518" },
    { x: 20, y: 40, s: 21, r: -25, d: 7, dl: 1.7, c: "#3e1f14" },
    { x: 45, y: 65, s: 19, r: 35, d: 6, dl: 2.3, c: "#5c2a1e" },
    { x: 65, y: 15, s: 24, r: -45, d: 5.7, dl: 0.9, c: "#4a2518" },
    { x: 30, y: 90, s: 16, r: 20, d: 6.5, dl: 1.4, c: "#3e1f14" },
    { x: 95, y: 85, s: 23, r: -10, d: 5, dl: 2.7, c: "#5c2a1e" },
    { x: 5, y: 10, s: 20, r: 40, d: 7.2, dl: 0.4, c: "#4a2518" },
    { x: 50, y: 95, s: 17, r: -50, d: 6.3, dl: 2.0, c: "#3e1f14" },
  ]

  // Partículas de explosión (polvo de café)
  const explosions = [
    { x: 50, y: 50, px: 20, py: -40, d: 4, dl: 0 },
    { x: 50, y: 50, px: -35, py: -25, d: 5, dl: 0.3 },
    { x: 50, y: 50, px: 40, py: 10, d: 3.5, dl: 0.6 },
    { x: 50, y: 50, px: -15, py: 35, d: 4.5, dl: 0.9 },
    { x: 50, y: 50, px: 30, py: -50, d: 3, dl: 1.2 },
    { x: 50, y: 50, px: -45, py: -10, d: 5.5, dl: 1.5 },
    { x: 50, y: 50, px: 10, py: 45, d: 4, dl: 1.8 },
    { x: 50, y: 50, px: -30, py: 20, d: 3.8, dl: 2.1 },
    { x: 50, y: 50, px: 25, py: -35, d: 5, dl: 2.4 },
    { x: 50, y: 50, px: -20, py: -45, d: 4.2, dl: 2.7 },
    { x: 50, y: 50, px: 45, py: -15, d: 3.2, dl: 3.0 },
    { x: 50, y: 50, px: -10, py: 30, d: 4.8, dl: 0.5 },
  ]

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-stone-950">
      
      {/* Fondo con textura de café tostado */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-amber-950/20 to-stone-950" />
      
      {/* Granos de café flotantes */}
      {isClient && beans.map((bean, i) => (
        <motion.div
          key={`bean-${i}`}
          className="absolute"
          style={{
            left: `${bean.x}%`,
            top: `${bean.y}%`,
            width: `${bean.s}px`,
            height: `${bean.s * 1.4}px`,
            background: `radial-gradient(ellipse at 40% 40%, ${bean.c}, #2a1008)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            transform: `rotate(${bean.r}deg)`,
            boxShadow: "2px 3px 6px rgba(0,0,0,0.4), inset -1px -2px 3px rgba(0,0,0,0.5)",
          }}
          animate={{
            x: [0, (i % 2 === 0 ? 30 : -30), 0],
            y: [0, (i % 3 === 0 ? -20 : 20), 0],
            rotate: [bean.r, bean.r + 360, bean.r],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: bean.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bean.dl,
          }}
        >
          {/* Línea central del grano */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "60%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #1a0c08, transparent)",
              transform: "rotate(12deg)",
            }}
          />
        </motion.div>
      ))}

      {/* Luz ambiental cálida */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-[100px]" />

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
              className="inline-block bg-amber-500/15 text-amber-300 px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-amber-500/20"
            >
              🌱 De la semilla a la taza
            </motion.span>

            <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="text-stone-100">El origen del </span>
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                café perfecto
              </span>
            </h1>

            <p className="text-xl text-stone-400 mb-8 leading-relaxed">
              Descubre el viaje completo del café: desde la selección de los mejores granos 
              hasta la taza que sorprende a tus sentidos. Tueste, molienda y extracción como un profesional.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-600 to-orange-500 px-8 py-4 rounded-full font-bold text-lg text-white shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow"
              >
                Explorar Cursos →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-amber-400/20 hover:border-amber-400/50 px-8 py-4 rounded-full font-bold text-lg text-stone-200 transition-all"
              >
                Ver Beneficios ☕
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[
                { number: "30+", label: "Orígenes de Café", color: "text-amber-400" },
                { number: "100%", label: "Arábica Premium", color: "text-orange-400" },
                { number: "5★", label: "Calificación SCA", color: "text-amber-300" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  <div className={`text-3xl font-black ${stat.color}`}>{stat.number}</div>
                  <div className="text-stone-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Zona de explosión de café */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center h-[550px]"
            style={{
              transform: `perspective(800px) rotateY(${mousePos.x * 0.03}deg) rotateX(${-mousePos.y * 0.03}deg)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Grano central gigante (explota) */}
            <motion.div
              className="absolute z-10"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="relative"
                style={{
                  width: "120px",
                  height: "168px",
                  background: "radial-gradient(ellipse at 40% 35%, #6b3a2a, #4a2518, #2a1008)",
                  borderRadius: "50% 50% 50% 50% / 58% 58% 42% 42%",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.6), inset 0 3px 8px rgba(255,255,255,0.1), 0 0 60px rgba(180,120,60,0.3)",
                }}
              >
                {/* Línea del grano */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: "55%",
                    height: "3px",
                    background: "linear-gradient(90deg, transparent, #1a0c08 20%, #0a0404 50%, #1a0c08 80%, transparent)",
                    transform: "rotate(15deg)",
                  }}
                />
                {/* Brillo superior */}
                <div 
                  className="absolute top-3 left-4 w-[40px] h-[20px] rounded-full rotate-[-30deg]"
                  style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)" }}
                />
              </div>
            </motion.div>

            {/* Partículas de explosión (polvo dorado) */}
            {isClient && explosions.map((ex, i) => (
              <motion.div
                key={`ex-${i}`}
                className="absolute rounded-full z-0"
                style={{
                  width: `${4 + (i % 3) * 3}px`,
                  height: `${4 + (i % 3) * 3}px`,
                  background: i % 2 === 0 
                    ? "rgba(212, 165, 116, 0.9)" 
                    : "rgba(180, 120, 60, 0.7)",
                  left: `${ex.x}%`,
                  top: `${ex.y}%`,
                  boxShadow: `0 0 ${6 + i}px rgba(212, 165, 116, 0.5)`,
                }}
                animate={{
                  x: [0, ex.px, 0],
                  y: [0, ex.py, 0],
                  opacity: [1, 0.6, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: ex.d,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: ex.dl,
                }}
              />
            ))}

            {/* Anillos de onda expansiva */}
            {isClient && [0, 1, 2].map((ring) => (
              <motion.div
                key={`ring-${ring}`}
                className="absolute rounded-full border border-amber-400/30 z-0"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "20px",
                  height: "20px",
                  marginLeft: "-10px",
                  marginTop: "-10px",
                }}
                animate={{
                  width: ["20px", "300px"],
                  height: ["20px", "300px"],
                  marginLeft: ["-10px", "-150px"],
                  marginTop: ["-10px", "-150px"],
                  opacity: [0.6, 0],
                  borderWidth: ["2px", "0.5px"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: ring * 1,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-amber-400/30 rounded-full flex items-start justify-center p-1.5">
          <motion.div 
            className="w-1.5 h-3 bg-amber-400/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero3

