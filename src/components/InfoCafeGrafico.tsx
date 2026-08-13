"use client"

import { motion } from "framer-motion"

// Datos de los 6 pasos de la infografía
const pasos = [
  { id: 1, titulo: "Selección del Grano", 
           descripcion: "Granos 100% arábica de origen único.", 
           icono: "🌱" },
  { id: 2, titulo: "Tueste Artesanal", 
           descripcion: "Tueste medio en lotes pequeños.", 
           icono: "🔥" },
  { id: 3, titulo: "Molienda Precisa", 
           descripcion: "Molinillo de muelas cónicas.", 
           icono: "⚙️" },
  { id: 4, titulo: "Extracción Perfecta", 
           descripcion: "Temperatura, presión y tiempo controlados.", 
           icono: "☕" },
  { id: 5, titulo: "Texturizado de Leche", 
           descripcion: "Microespuma sedosa a 60-65°C.", 
           icono: "🥛" },
  { id: 6, titulo: "Arte y Presentación", 
           descripcion: "Vertido final y decoración.", 
           icono: "🎨" },
]

const InfoCafeGrafico = () => {
  return (
    <section className="relative w-full overflow-hidden bg-amber-800 
                        py-6 md:py-24">

      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 
                      via-transparent to-stone-950" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-8">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block bg-amber-500/15 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-500/20">
            📊 Voy a aprender una habilidad que puede cambiar mi vida.
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">
              Cada mañana, millones de personas preparan una taza de café ☕ </span>
            <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-amber-300 
                             bg-clip-text text-transparent">
              para comenzar el día.
            </span>
          </h2>
          <p className="text-xl text-stone-100 max-w-2xl mx-auto">
            Es un hábito. Una costumbre. Un momento que parece tan cotidiano 
            que pocas veces nos detenemos a pensar en todo 
            lo que existe detrás de ese aroma que llena la habitación.
          </p>
        </motion.div>

        {/* CONTENEDOR PRINCIPAL FULL WIDTH */}
        <div className="relative w-full">
          {/* ---- VERSIÓN ESCRITORIO (md+) ---- */}
          <div className="hidden md:flex items-center justify-center 
                          gap-4 lg:gap-8">
            {/* Columna izquierda de tarjetas (3 tarjetas) */}
            <div className="flex flex-col gap-4 w-[280px] lg:w-[320px]">
              {pasos.slice(0, 3).map((paso, index) => (
                <Tarjeta key={paso.id} paso={paso} index={index} lado="izquierda" />
              ))}
            </div>

            {/* Imagen central */}
            <div className="relative flex-shrink-0 w-[35%] max-w-[700px] 
                            aspect-square rounded-full overflow-hidden 
                            shadow-2xl shadow-purple-500 border-4 border-cyan-500">
              <img
                src="/slider/caf.png"
                alt="Proceso del café"
                className="w-full h-full object-cover"
              />
              {/* Overlay muy suave solo para dar profundidad */}
              <div className="absolute inset-0 bg-stone-900/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl lg:text-7xl drop-shadow-lg"> </span>
              </div>
            </div>

            {/* Columna derecha de tarjetas (3 tarjetas) */}
            <div className="flex flex-col gap-4 w-[280px] lg:w-[320px]">
              {pasos.slice(3, 6).map((paso, index) => (
                <Tarjeta key={paso.id} paso={paso} index={index + 3} lado="derecha" />
              ))}
            </div>
          </div>

          {/* ---- VERSIÓN MÓVIL (<md) ---- */}
          <div className="md:hidden space-y-4">
            {/* Imagen central más pequeña */}
            <div className="flex justify-center">
              <div className="relative w-56 h-56 rounded-full overflow-hidden 
                              shadow-2xl border-4 border-amber-200">
                <img
                  src="/slider/caf.png"
                  alt="Proceso del café"
                  className="w-full h-full object-cover"
                  />
                <div className="absolute inset-0 bg-stone-900/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl"> </span>
                </div>
              </div>
            </div>

            {/* Tarjetas en grid de 2 columnas */}
            <div className="grid grid-cols-2 gap-4">
              {pasos.map((paso) => (
                <Tarjeta key={paso.id} paso={paso} index={0} lado="móvil" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Componente reutilizable de tarjeta
function Tarjeta({ paso, index, lado }: { paso: typeof pasos[0]; index: number; lado: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: lado === "izquierda" ? -30 : lado === "derecha" ? 30 : 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, zIndex: 50 }}
      className="relative bg-stone-800/90 backdrop-blur-md 
                 border border-amber-500/20 rounded-2xl p-4 
                 shadow-xl hover:border-amber-400/40 
                 transition-all duration-300"
    >
      {/* Numeración flotante */}
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full 
                      bg-gradient-to-br from-cyan-700 to-amber-800 
                      flex items-center justify-center text-white 
                      font-sans text-sm shadow-lg">
        {paso.id}
      </div>

      <div className="text-3xl mb-2">{paso.icono}</div>
      <h4 className="font-serif text-base lg:text-lg font-bold text-white mb-1">{paso.titulo}</h4>
      <p className="text-stone-400 text-xs lg:text-sm leading-relaxed">{paso.descripcion}</p>
    </motion.div>
  )
}

export default InfoCafeGrafico
