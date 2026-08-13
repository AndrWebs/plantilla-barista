"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const Hero2 = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  // Datos fijos para partículas (sin Math.random)
  const particles = [
    { w: 3, h: 2, bg: "rgba(155,105,70,0.35)", l: 10, t: 15, xm: 8, d: 4, dl: 0.5 },
    { w: 2, h: 4, bg: "rgba(145,95,60,0.40)", l: 25, t: 30, xm: -6, d: 5, dl: 1.2 },
    { w: 4, h: 2, bg: "rgba(165,110,75,0.30)", l: 40, t: 50, xm: 10, d: 3.5, dl: 0.8 },
    { w: 2, h: 3, bg: "rgba(150,100,65,0.45)", l: 55, t: 20, xm: -9, d: 4.5, dl: 2.0 },
    { w: 3, h: 3, bg: "rgba(160,115,80,0.38)", l: 70, t: 60, xm: 5, d: 3, dl: 1.5 },
    { w: 1, h: 4, bg: "rgba(140,90,55,0.42)", l: 85, t: 40, xm: -7, d: 5.5, dl: 0.3 },
    { w: 4, h: 1, bg: "rgba(170,120,85,0.33)", l: 15, t: 75, xm: 6, d: 4, dl: 2.5 },
    { w: 2, h: 2, bg: "rgba(148,98,62,0.48)", l: 35, t: 85, xm: -4, d: 3.8, dl: 1.8 },
    { w: 3, h: 4, bg: "rgba(158,108,72,0.36)", l: 50, t: 10, xm: 11, d: 4.2, dl: 0.7 },
    { w: 1, h: 2, bg: "rgba(152,102,68,0.44)", l: 65, t: 70, xm: -8, d: 3.3, dl: 2.2 },
    { w: 4, h: 3, bg: "rgba(162,112,78,0.31)", l: 80, t: 25, xm: 7, d: 5, dl: 1.0 },
    { w: 2, h: 1, bg: "rgba(145,95,58,0.50)", l: 20, t: 55, xm: -5, d: 4.8, dl: 2.8 },
    { w: 3, h: 3, bg: "rgba(155,108,70,0.37)", l: 45, t: 45, xm: 9, d: 3.6, dl: 0.4 },
    { w: 1, h: 3, bg: "rgba(168,118,82,0.41)", l: 60, t: 35, xm: -10, d: 4.4, dl: 1.7 },
    { w: 4, h: 2, bg: "rgba(142,92,56,0.46)", l: 30, t: 65, xm: 4, d: 3.2, dl: 2.4 },
    { w: 2, h: 4, bg: "rgba(160,105,75,0.34)", l: 75, t: 15, xm: -3, d: 5.2, dl: 0.9 },
    { w: 3, h: 1, bg: "rgba(150,100,68,0.43)", l: 90, t: 80, xm: 12, d: 3.9, dl: 1.4 },
    { w: 1, h: 2, bg: "rgba(148,98,64,0.39)", l: 5, t: 90, xm: -6, d: 4.6, dl: 2.1 },
    { w: 4, h: 4, bg: "rgba(165,115,80,0.32)", l: 42, t: 5, xm: 8, d: 3.4, dl: 0.6 },
    { w: 2, h: 3, bg: "rgba(155,105,72,0.47)", l: 68, t: 52, xm: -11, d: 4.1, dl: 1.9 },
    { w: 3, h: 2, bg: "rgba(158,108,70,0.35)", l: 22, t: 38, xm: 6, d: 3.7, dl: 2.6 },
    { w: 1, h: 4, bg: "rgba(145,95,62,0.40)", l: 52, t: 72, xm: -7, d: 5.3, dl: 0.2 },
    { w: 4, h: 1, bg: "rgba(170,120,78,0.38)", l: 78, t: 28, xm: 10, d: 3.1, dl: 1.6 },
    { w: 2, h: 2, bg: "rgba(152,102,66,0.42)", l: 32, t: 58, xm: -4, d: 4.3, dl: 2.3 },
    { w: 3, h: 3, bg: "rgba(160,110,76,0.36)", l: 88, t: 48, xm: 5, d: 4.7, dl: 1.1 },
    { w: 1, h: 2, bg: "rgba(148,98,60,0.44)", l: 18, t: 82, xm: -9, d: 3.5, dl: 2.7 },
    { w: 4, h: 3, bg: "rgba(165,115,82,0.33)", l: 58, t: 18, xm: 7, d: 5.1, dl: 0.5 },
    { w: 2, h: 1, bg: "rgba(155,105,68,0.49)", l: 72, t: 92, xm: -5, d: 3.8, dl: 1.3 },
    { w: 3, h: 4, bg: "rgba(150,100,74,0.37)", l: 38, t: 22, xm: 11, d: 4.0, dl: 2.9 },
    { w: 1, h: 3, bg: "rgba(162,112,70,0.41)", l: 48, t: 68, xm: -8, d: 4.9, dl: 0.1 },
  ]

  const vapors = [
    { b: 280, l: 47, h: 15, d: 2.5, dl: 0 },
    { b: 283, l: 49, h: 18, d: 2.7, dl: 0.5 },
    { b: 286, l: 51, h: 21, d: 2.9, dl: 1.0 },
    { b: 289, l: 53, h: 24, d: 3.1, dl: 1.5 },
    { b: 292, l: 55, h: 27, d: 3.3, dl: 2.0 },
    { b: 295, l: 57, h: 30, d: 3.5, dl: 2.5 },
  ]

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-stone-950">
      
      {/* Fondo con textura de madera */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30" />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(180,150,120,0.3) 2px, rgba(180,150,120,0.3) 4px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Partículas de café molido (solo en cliente) */}
      {isClient && particles.map((p, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full"
          style={{ width: `${p.w}px`, height: `${p.h}px`, background: p.bg, left: `${p.l}%`, top: `${p.t}%` }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.xm, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.dl,
          }}
        />
      ))}

      {/* Luz ambiental cálida */}
      <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-amber-400/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />

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
              🏆 Campeón Nacional de Latte Art 2026
            </motion.span>

            <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="text-stone-100">Cada taza es </span>
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                una obra maestra
              </span>
            </h1>

            <p className="text-xl text-stone-400 mb-8 leading-relaxed">
              Aprende las técnicas secretas de los campeones mundiales de latte art. 
              Desde la textura perfecta de la leche hasta los diseños más impresionantes.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-600 to-orange-500 px-8 py-4 rounded-full font-bold text-lg text-white shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow"
              >
                Ver Cursos de Latte Art →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-amber-400/20 hover:border-amber-400/50 px-8 py-4 rounded-full font-bold text-lg text-stone-200 transition-all"
              >
                Galería de Arte ☕
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[
                { number: "15", label: "Años de Experiencia", color: "text-amber-400" },
                { number: "2,500+", label: "Baristas Certificados", color: "text-orange-400" },
                { number: "48", label: "Técnicas de Latte Art", color: "text-amber-300" },
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

          {/* Taza con arte latte animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center h-[550px]"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 0.02}deg) rotateX(${-mousePos.y * 0.02}deg)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Mesa */}
            <div 
              className="absolute bottom-[60px] w-[420px] h-[20px] rounded-full"
              style={{
                background: "linear-gradient(180deg, #5c3a2e, #3e2218)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)",
                transform: "rotateX(70deg)",
              }}
            />

            {/* Taza */}
            <div className="absolute bottom-[70px]">
              <div className="w-[220px] h-[25px] mx-auto rounded-full"
                style={{
                  background: "linear-gradient(180deg, #faf8f5, #e8d5b7)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}
              />
              
              <div 
                className="relative w-[170px] h-[190px] mx-auto -mt-1"
                style={{
                  background: "linear-gradient(135deg, #faf8f5 0%, #f5f0e8 30%, #e8d5b7 70%, #d4c4a8 100%)",
                  borderRadius: "0 0 45px 45px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4), inset 0 3px 15px rgba(255,255,255,0.5)",
                }}
              >
                <div className="absolute left-3 top-6 w-[14px] h-[140px] rounded-full bg-gradient-to-r from-white/60 to-transparent" />
                
                <div 
                  className="absolute top-4 left-4 right-4 h-[35px] rounded-full"
                  style={{
                    background: "radial-gradient(ellipse at 50% 60%, #5c2a1e, #3e1f14, #1a0c08)",
                    boxShadow: "inset 0 3px 10px rgba(0,0,0,0.5)",
                  }}
                />

                <div 
                  className="absolute top-4 left-4 right-4 h-[16px] rounded-full"
                  style={{
                    background: "linear-gradient(180deg, #d4a574, #c4956a, #b8855a)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  }}
                />

                <svg viewBox="0 0 140 90" className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[110px] h-[70px]">
                  <motion.line x1="70" y1="15" x2="70" y2="85" stroke="#f5f0e8" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                  {[0,1,2,3,4,5,6,7].map((leaf) => (
                    <motion.path key={`l-${leaf}`}
                      d={`M 70 ${18+leaf*8} Q ${55-leaf*2} ${10+leaf*8} ${48-leaf*3} ${22+leaf*8}`}
                      stroke="#f5f0e8" strokeWidth="2.5" strokeLinecap="round" fill="none"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 1.5+leaf*0.12, ease: "easeOut" }}
                    />
                  ))}
                  {[0,1,2,3,4,5,6,7].map((leaf) => (
                    <motion.path key={`r-${leaf}`}
                      d={`M 70 ${18+leaf*8} Q ${85+leaf*2} ${10+leaf*8} ${92+leaf*3} ${22+leaf*8}`}
                      stroke="#f5f0e8" strokeWidth="2.5" strokeLinecap="round" fill="none"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 1.5+leaf*0.12, ease: "easeOut" }}
                    />
                  ))}
                  <motion.circle cx="70" cy="12" r="6" stroke="#f5f0e8" strokeWidth="2.5" fill="none"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 2.4, ease: "easeOut" }}
                  />
                </svg>

                <div className="absolute top-6 right-6 w-[25px] h-[12px] rounded-full rotate-[-20deg]"
                  style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.15), transparent)" }}
                />
              </div>

              <div className="absolute -right-[25px] top-[50px] w-[35px] h-[70px]"
                style={{
                  border: "10px solid transparent",
                  borderRight: "10px solid #e8d5b7",
                  borderRadius: "0 50px 50px 0",
                  boxShadow: "2px 0 4px rgba(0,0,0,0.15)",
                }}
              />
            </div>

            {/* Vapor */}
            {isClient && vapors.map((v, i) => (
              <motion.div key={`vapor-${i}`}
                className="absolute w-[3px] bg-white/40 rounded-full blur-[1px]"
                style={{ bottom: `${v.b}px`, left: `${v.l}%`, height: `${v.h}px` }}
                animate={{ y: [-10, -80], opacity: [0.4, 0], scaleY: [1, 3] }}
                transition={{ duration: v.d, repeat: Infinity, ease: "easeOut", delay: v.dl }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-amber-400/30 rounded-full flex items-start justify-center p-1.5">
          <motion.div className="w-1.5 h-3 bg-amber-400/60 rounded-full"
            animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero2
