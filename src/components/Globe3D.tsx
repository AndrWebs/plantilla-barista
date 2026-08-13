// ============================================
// COMPONENTE: Globe3D
// Globo terráqueo giratorio con CSS puro.
// Cero dependencias. 100% funcional.
// ============================================

import { motion } from "framer-motion"

const Globe3D = () => {
  return (
    <div className="w-[60px] h-[60px] relative">
      {/* Círculo base con gradiente (océano) que gira */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-full h-full rounded-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden shadow-inner"
      >
        {/* Puntos brillantes simulando ciudades */}
        <div className="absolute top-3    left-4 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_4px_#a855f7]" />
        <div className="absolute top-4    right-3 w-1 h-1     bg-purple-300 rounded-full shadow-[0_0_3px_#a855f7]" />
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5  bg-pink-400 rounded-full shadow-[0_0_4px_#ec4899]" />
        <div className="absolute top-2     right-4 w-1 h-1     bg-purple-400 rounded-full shadow-[0_0_3px_#a855f7]" />
        <div className="absolute bottom-4  right-3 w-1.5 h-1.5 bg-purple-300 rounded-full shadow-[0_0_4px_#a855f7]" />
        <div className="absolute top-1/2   left-2 w-1 h-1      bg-pink-400 rounded-full shadow-[0_0_3px_#ec4899]" />
        <div className="absolute top-1/3    right-2 w-1 h-1   bg-purple-400 rounded-full shadow-[0_0_3px_#a855f7]" />
        <div className="absolute bottom-1/3 left-5 w-1 h-1    bg-purple-300 rounded-full shadow-[0_0_3px_#a855f7]" />
        
        {/* Líneas curvas simulando conexiones */}
        <div className="absolute top-3    left-4 w-8 h-4  border-t border-l border-purple-500/30 rounded-tl-full transform rotate-45" />
        <div className="absolute bottom-3 right-3 w-6 h-3 border-b border-r border-purple-500/20 rounded-br-full transform -rotate-12" />
        <div className="absolute top-1/2  right-2 w-5 h-3 border-t border-r border-purple-500/25 rounded-tr-full transform rotate-25" />

        {/* Brillo superior para efecto 3D */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />
        
        {/* Sombra inferior para efecto 3D */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent rounded-b-full" />
      </motion.div>

      {/* Borde exterior con brillo */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
    </div>
  )
}

export default Globe3D
