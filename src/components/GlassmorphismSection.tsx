// ============================================
// COMPONENTE: GlassmorphismSection
// ============================================
// Propósito: Demostrar el efecto glassmorphism
// (vidrio esmerilado) en su máxima expresión.
//
// Técnica:
// - Fondo semi-transparente + blur (backdrop-filter)
// - Bordes con gradiente semi-transparente
// - Sombras suaves para dar profundidad
// - Elementos flotantes detrás para resaltar el efecto
// ============================================

import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

// Datos de las tarjetas glass
const glassCards = [
  {
    icon: "🔮",
    title: "Innovación",
    desc: "Tecnología de punta para experiencias únicas.",
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/20",
  },
  {
    icon: "💎",
    title: "Calidad Premium",
    desc: "Cada detalle pulido a la perfección.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/20",
  },
  {
    icon: "🌟",
    title: "Resultados",
    desc: "Métricas que hablan por sí solas.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
  },
]

const GlassmorphismSection = () => {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* ============================================ */}
      {/* FONDO ANIMADO: Círculos de colores que        */}
      {/* se mueven detrás del vidrio para resaltarlo   */}
      {/* ============================================ */}
      
      {/* Círculo 1: Púrpura, arriba-izquierda */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
      />
      
      {/* Círculo 2: Rosa, abajo-derecha */}
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
      />
      
      {/* Círculo 3: Cyan, centro */}
      <motion.div
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">
              {t("glass.title1") || "Diseño "}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {t("glass.title2") || "Vidrio Premium"}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("glass.desc") || "El efecto glassmorphism más avanzado. Elegancia, profundidad y modernidad en cada elemento visual."}
          </p>
        </motion.div>

        {/* Grid de tarjetas glass */}
        <div className="grid md:grid-cols-3 gap-8">
          {glassCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative overflow-hidden rounded-3xl p-8
                bg-white/5 backdrop-blur-xl
                border ${card.border}
                shadow-2xl shadow-black/10
                hover:bg-white/10 transition-all duration-500
                group`}
            >
              {/* Brillo superior (highlight) - simula reflejo de vidrio */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Brillo diagonal al hacer hover */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Contenido */}
              <div className="relative z-10">
                {/* Icono con fondo glass */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm border border-white/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tarjeta grande de demostración */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/10 relative overflow-hidden"
        >
          {/* Reflejo de vidrio */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {t("glass.card.title") || "Tecnología que Deslumbra"}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {t("glass.card.desc") || "Nuestro diseño glassmorphism no es solo estética. Es una declaración de modernidad que transmite confianza, transparencia y atención al detalle."}
              </p>
              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-400" />
                <div className="w-3 h-3 rounded-full bg-pink-400" />
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
              </div>
            </div>
            
            {/* Código decorativo en glass */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/5 font-mono text-sm">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                <div className="w-3 h-3 rounded-full bg-green-400/50" />
              </div>
              <p className="text-purple-300">
                <span className="text-gray-500">.glass </span>
                <span className="text-pink-300">{'{'}</span>
              </p>
              <p className="text-cyan-300 ml-4">backdrop-filter:<span className="text-green-300"> blur(20px)</span>;</p>
              <p className="text-cyan-300 ml-4">background:<span className="text-green-300"> rgba(255,255,255,0.05)</span>;</p>
              <p className="text-cyan-300 ml-4">border:<span className="text-green-300"> 1px solid rgba(255,255,255,0.1)</span>;</p>
              <p className="text-pink-300">{'}'}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GlassmorphismSection
