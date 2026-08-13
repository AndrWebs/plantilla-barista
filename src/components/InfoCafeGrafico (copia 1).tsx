"use client"

import { motion } from "framer-motion"

// ============================================
// DATOS DE LOS 6 PASOS DE LA INFOGRAFÍA
// ============================================
const pasos = [
  {
    id: 1,
    titulo: "Selección del Grano",
    descripcion: "Elegimos granos 100% arábica de origen único, cultivados a más de 1,500 metros de altitud.",
    icono: "🌱",
    posicion: "top-left",
  },
  {
    id: 2,
    titulo: "Tueste Artesanal",
    descripcion: "Tueste medio en lotes pequeños para resaltar las notas naturales del café.",
    icono: "🔥",
    posicion: "top-right",
  },
  {
    id: 3,
    titulo: "Molienda Precisa",
    descripcion: "Molimos los granos justo antes de la preparación con molinillo de muelas cónicas.",
    icono: "⚙️",
    posicion: "middle-left",
  },
  {
    id: 4,
    titulo: "Extracción Perfecta",
    descripcion: "Controlamos temperatura, presión y tiempo para obtener un espresso balanceado.",
    icono: "☕",
    posicion: "middle-right",
  },
  {
    id: 5,
    titulo: "Texturizado de Leche",
    descripcion: "Crema de leche sedosa a 60-65°C para un latte art perfecto.",
    icono: "🥛",
    posicion: "bottom-left",
  },
  {
    id: 6,
    titulo: "Arte y Presentación",
    descripcion: "Vertido final y decoración para una experiencia visual y sensorial completa.",
    icono: "🎨",
    posicion: "bottom-right",
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const InfoCafeGrafico = () => {
  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden bg-stone-950">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-transparent to-stone-950" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-amber-500/15 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-500/20">
            📊 Infografía del Café
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">Del grano </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              a tu taza
            </span>
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Cada paso del proceso está diseñado para garantizar la taza perfecta.
          </p>
        </motion.div>

        {/* ============================================ */}
        {/* DISEÑO PARA MÓVILES: GRID DE 2 COLUMNAS       */}
        {/* ============================================ */}
        <div className="md:hidden space-y-8">
          {/* Imagen central en móvil */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl shadow-amber-500/20 border-4 border-amber-500/30">
              <img
                src="/slider/cafe2.png"
                alt="Proceso del café"
                className="w-full h-full object-cover"                
              />
              <div className="absolute inset-0 bg-stone-900/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">☕</span>
              </div>
            </div>
          </div>

          {/* Tarjetas en grid 2 columnas */}
          <div className="grid grid-cols-2 gap-4">
            {pasos.map((paso) => (
              <motion.div
                key={paso.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-stone-800/90 backdrop-blur-md border border-amber-500/20 rounded-2xl p-4 relative"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {paso.id}
                </div>
                <div className="text-3xl mb-2">{paso.icono}</div>
                <h4 className="font-serif text-sm font-bold text-white mb-1">{paso.titulo}</h4>
                <p className="text-stone-400 text-xs leading-relaxed">{paso.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============================================ */}
        {/* DISEÑO PARA ESCRITORIO: INFOGRAFÍA FLOTANTE   */}
        {/* ============================================ */}
        <div className="hidden md:block relative w-full max-w-5xl mx-auto aspect-[16/9]">
          
          {/* Imagen central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[60%] aspect-square rounded-full overflow-hidden shadow-2xl shadow-amber-500/20 border-4 border-amber-500/30">
              <img
                src="/slider/cafe1.png"
                alt="Proceso del café"
                className="w-full h-full object-cover"
                
              />
              <div className="absolute inset-0 bg-stone-900/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-7xl block mb-2">☕</span>
                  <h3 className="font-serif text-3xl font-black text-white">
                    Café Perfecto
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjetas flotantes con hover que las eleva */}
          {pasos.map((paso, index) => {
            const posiciones: Record<string, string> = {
              "top-left": "top-[5%] left-[2%]",
              "top-right": "top-[5%] right-[2%]",
              "middle-left": "top-1/2 left-[2%] -translate-y-1/2",
              "middle-right": "top-1/2 right-[2%] -translate-y-1/2",
              "bottom-left": "bottom-[5%] left-[2%]",
              "bottom-right": "bottom-[5%] right-[2%]",
            }

            return (
              <motion.div
                key={paso.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className={`absolute ${posiciones[paso.posicion]} w-[180px] z-10 hover:z-50 transition-all duration-300 hover:scale-110`}
              >
                <div className="bg-stone-800/90 backdrop-blur-md border border-amber-500/20 rounded-2xl p-4 shadow-xl hover:border-amber-400/40 transition-all duration-300">
                  
                  {/* Numeración */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {paso.id}
                  </div>

                  {/* Icono */}
                  <div className="text-3xl mb-2">{paso.icono}</div>

                  {/* Título */}
                  <h4 className="font-serif text-base font-bold text-white mb-1">
                    {paso.titulo}
                  </h4>

                  {/* Descripción */}
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              </motion.div>
            )
          })}

          {/* Líneas conectoras SVG */}
          <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 1000 600">
            {pasos.map((paso) => {
              const coords: Record<string, { x1: number; y1: number; x2: number; y2: number }> = {
                "top-left": { x1: 100, y1: 100, x2: 350, y2: 250 },
                "top-right": { x1: 900, y1: 100, x2: 650, y2: 250 },
                "middle-left": { x1: 80, y1: 300, x2: 320, y2: 300 },
                "middle-right": { x1: 920, y1: 300, x2: 680, y2: 300 },
                "bottom-left": { x1: 100, y1: 500, x2: 350, y2: 350 },
                "bottom-right": { x1: 900, y1: 500, x2: 650, y2: 350 },
              }
              const c = coords[paso.posicion]
              if (!c) return null
              return (
                <line
                  key={paso.id}
                  x1={c.x1}
                  y1={c.y1}
                  x2={c.x2}
                  y2={c.y2}
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              )
            })}
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d4a574" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default InfoCafeGrafico
