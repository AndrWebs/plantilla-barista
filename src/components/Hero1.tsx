"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useMemo } from "react"

const Hero1 = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  // Partículas doradas pre-calculadas (sin Math.random en render)
  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      key: `particle-${i}`,
      width: 2 + (i % 4),
      height: 2 + (i % 4),
      left: (i * 7 + 5) % 100,
      top: (i * 13 + 10) % 100,
      xMove: i % 2 === 0 ? 15 : -15,
      yMove: i % 3 === 0 ? -20 : 20,
      duration: 3 + (i % 4),
      delay: i * 0.3,
    }))
  }, [])

  return (
    <section className="min-h-screen flex items-center 
                        relative overflow-hidden bg-black">
      
      {/* ============================================ */}
      {/* VIDEO DE FONDO (CAFÉ EN CÁMARA LENTA)        */}
      {/* ============================================ */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover 
                      transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          {/* Fallback: imagen estática si el video no carga */}
          <img 
            src="/slider/icon.png" 
            alt="Café artesanal" 
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* ============================================ */}
      {/* OVERLAY OSCURO CON GRADIENTE DORADO          */}
      {/* ============================================ */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/10 via-black/50 to-amber-950/50" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-stone-100 via-transparent to-transparent" />

      {/* ============================================ */}
      {/* PARTÍCULAS DORADAS FLOTANTES                 */}
      {/* ============================================ */}
      <div className="absolute inset-0 z-[2] pointer-events-none 
                      overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.key}
            className="absolute rounded-full"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: "linear-gradient(135deg, #fbbf24, #d4a574, #f59e0b)",
              boxShadow: "0 0 6px rgba(251, 191, 36, 0.6), 0 0 12px rgba(245, 158, 11, 0.3)",
            }}
            animate={{
              y: [0, p.yMove, 0],
              x: [0, p.xMove, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ============================================ */}
      {/* LUZ AMBIENTAL DORADA                         */}
      {/* ============================================ */}
      <div className="absolute top-1/4 left-1/2 
                      -translate-x-1/2 w-[600px] h-[600px] 
                      bg-amber-700/15 rounded-full blur-[150px] z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] 
                      bg-yellow-500/10 rounded-full blur-[100px] z-[1]" />

      <div className="max-w-7xl mx-auto px-6 pt-20 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* ============================================ */}
          {/* COLUMNA DE TEXTO                             */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge dorado */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-stone-400/40
                         text-amber-300 px-4 py-2 rounded-full 
                         text-sm font-serif mb-6 
                         border border-amber-700 backdrop-blur-sm"
            >
              ☕  Descubre un mundo que nunca imaginaste que existía 
              dentro de una taza de café.
            </motion.span>

            {/* Título principal */}
            <h1 className="font-serif text-6xl md:text-7xl font-black 
                           leading-tight mb-6">
              <span className="text-white">El arte del </span>
              <span className="bg-gradient-to-r from-amber-300 
                               via-amber-400 to-gray-200 bg-clip-text 
                               text-transparent">
                café perfecto
              </span>
            </h1>

            {/* Descripción */}
            <p className="text-xl text-white mb-8 
                          leading-relaxed drop-shadow-lg">
                ¿Sabías que una misma bolsa de café puede producir más de diez 
                sabores completamente diferentes?
            </p>
            <p className="text-xl text-amber-200 mb-8
                          leading-relaxed drop-shadow-lg"> 
                Aprende las técnicas de los mejores baristas del mundo. 
                Desde el espresso perfecto hasta el arte latte más impresionante.
                Lo único que cambia es la forma en que lo preparas.
                Una pequeña variación en la molienda.
                Dos grados menos de temperatura.
                Cinco segundos más de extracción.
                Y la taza cambia por completo.
             </p>  
             <p className="mb-8 text-cyan-200 text-2xl">Lo que antes era amargo…
                Puede convertirse en una bebida dulce, afrutada o con notas de chocolate.
             </p>   
             <p className="mb-6 text-xl">
                Los mejores baristas del mundo no tienen poderes especiales.
                Simplemente saben controlar variables que la mayoría de las personas desconoce.
                Y tú también puedes aprenderlas.
            </p>

            {/* Botones CTA */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r 
                           from-amber-500 via-yellow-500 to-amber-400 
                           px-8 py-4 rounded-full font-bold text-lg text-black 
                           shadow-xl shadow-amber-500/30 hover:shadow-amber-400/50 
                           transition-shadow"
              >
                Aprende una habilidad que puede cambiar mi vida. →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-amber-300/50 hover:border-amber-300 px-8 py-4 rounded-full font-bold text-lg text-white backdrop-blur-sm transition-all"
              >
                Un universo que muy pocos conocen ☕
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[
                { number: "+500", label: "Alumnos Certificados", color: "text-amber-500" },
                { number: "98%", label: "Satisfacción", color: "text-amber-700" },
                { number: "12", label: "Cursos Disponibles", color: "text-amber-800" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  <div className={`text-3xl font-black ${stat.color} drop-shadow-lg`}>
                    {stat.number}
                  </div>
                  <div className="text-stone-300 text-sm drop-shadow">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ============================================ */}
          {/* COLUMNA DERECHA: TARJETA DECORATIVA          */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
            style={{
              transform: `perspective(800px) rotateY(${mousePos.x * 0.02}deg) rotateX(${-mousePos.y * 0.02}deg)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Tarjeta glassmorphism dorada */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 
                            border border-amber-400/20 shadow-2xl 
                            shadow-amber-500/10">
              
              {/* Tarjeta interna simulando certificado */}
              <div className="bg-stone-200/20 backdrop-blur-sm rounded-2xl p-6 
                              border border-amber-500/10">                
                {/* Sello dorado */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br 
                               from-amber-800 to-yellow-500 flex items-center 
                               justify-center text-4xl shadow-lg shadow-amber-500/30"
                  >
                    ☕
                  </motion.div>
                </div>

                {/* Texto del certificado */}
                <div className="text-center space-y-3">
                  <p className="text-amber-300 text-sm tracking-widest uppercase">Empieza la aventura</p>
                  <h3 className="text-2xl font-script text-black">
                    La mayoría de las personas cree que preparar café consiste 
                    en poner agua caliente sobre café molido.
                    <p>La realidad es muy distinta.
                       Existe todo un universo detrás de una taza perfecta.
                       Y está esperando ser descubierto.
                    </p>
                  </h3>
                  <div className="w-16 h-[1px] bg-gradient-to-r 
                                  from-transparent via-amber-400 
                                  to-transparent mx-auto" />
                  <p className="text-amber-800 text-sm">
                    Avalado por la Specialty Coffee Association
                  </p>
                  
                  {/* Estrellas */}
                  <div className="flex justify-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Firma decorativa */}
                <div className="mt-4 text-center">
                  <span className="font-script text-2xl text-stone-800">
                        Desde las primeras formas artesanales de preparar café…
                        Hasta la tecnología utilizada hoy por los campeones mundiales de barismo.
                        Conocerás cómo evolucionó esta bebida hasta convertirse en 
                        una experiencia gastronómica. No solo aprenderás técnicas.
                        Comprenderás por qué existen.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero1





