"use client"

import { motion } from "framer-motion"

const CoffeeCupCSS3D = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      
      {/* ============================================ */}
      {/* GRANOS DE CAFÉ FLOTANTES (8 granos)         */}
      {/* ============================================ */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: "20px",
            height: "28px",
            background: "radial-gradient(ellipse at 40% 40%, #6b3a2a, #3e1f14)",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            transform: `rotate(${i * 45}deg)`,
            boxShadow: "2px 2px 4px rgba(0,0,0,0.3), inset -1px -2px 3px rgba(0,0,0,0.4)",
          }}
          animate={{
            x: [Math.cos(i * 0.8) * 180, Math.cos(i * 0.8 + Math.PI) * 180, Math.cos(i * 0.8) * 180],
            y: [Math.sin(i * 0.8) * 80 - 40, Math.sin(i * 0.8 + Math.PI) * 80 - 40, Math.sin(i * 0.8) * 80 - 40],
            rotate: [i * 45, i * 45 + 360, i * 45],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        >
          {/* Línea del grano */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[2px] bg-[#2a1008] rounded-full rotate-12" />
        </motion.div>
      ))}

      {/* ============================================ */}
      {/* PLATO (elipse con sombra)                    */}
      {/* ============================================ */}
      <motion.div
        className="absolute bottom-[80px]"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ perspective: "600px" }}
      >
        <div
          className="w-[220px] h-[30px] rounded-[50%]"
          style={{
            background: "linear-gradient(180deg, #f5f0e8 0%, #e8d5b7 50%, #d4c4a8 100%)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.2)",
            transform: "rotateX(70deg)",
          }}
        />
      </motion.div>

      {/* ============================================ */}
      {/* TAZA (cuerpo principal)                      */}
      {/* ============================================ */}
      <motion.div
        className="absolute bottom-[100px]"
        animate={{ 
          rotateY: [0, 10, -10, 0],
          rotateX: [0, 3, -3, 0],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{ perspective: "800px", transformStyle: "preserve-3d" }}
      >
        {/* Cuerpo de la taza */}
        <div
          className="relative w-[140px] h-[160px]"
          style={{
            background: "linear-gradient(135deg, #faf8f5 0%, #f5f0e8 30%, #e8d5b7 70%, #d4c4a8 100%)",
            borderRadius: "0 0 40px 40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.4), 0 0 0 3px rgba(180,150,120,0.3)",
          }}
        >
          {/* Brillo lateral */}
          <div 
            className="absolute left-2 top-4 w-[12px] h-[120px] rounded-full opacity-40"
            style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.8), transparent)" }}
          />
          
          {/* Café dentro de la taza */}
          <div 
            className="absolute top-3 left-3 right-3 h-[30px] rounded-full"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, #5c2a1e, #3e1f14, #1a0c08)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)",
            }}
          />
          
          {/* Espuma/crema */}
          <div 
            className="absolute top-3 left-3 right-3 h-[14px] rounded-full"
            style={{
              background: "linear-gradient(180deg, #faf5eb, #e8d5b7, #d4bfa0)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
          
          {/* Arte latte (corazón simple) */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2">
            <div 
              className="w-[20px] h-[8px]"
              style={{
                background: "#faf5eb",
                borderRadius: "50% 50% 0 0",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            />
            <div 
              className="w-[6px] h-[6px] absolute -bottom-[3px] left-1/2 -translate-x-1/2"
              style={{
                background: "#faf5eb",
                borderRadius: "0 0 50% 50%",
              }}
            />
          </div>
        </div>

        {/* Asa */}
        <div
          className="absolute -right-[30px] top-[30px] w-[40px] h-[80px]"
          style={{
            border: "12px solid transparent",
            borderRight: "12px solid #e8d5b7",
            borderRadius: "0 60px 60px 0",
            boxShadow: "3px 0 6px rgba(0,0,0,0.15)",
          }}
        />
      </motion.div>

      {/* ============================================ */}
      {/* VAPOR (partículas subiendo)                  */}
      {/* ============================================ */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`steam-${i}`}
          className="absolute w-2 h-2 bg-white/60 rounded-full blur-[2px]"
          style={{
            bottom: `${260 + i * 5}px`,
            left: `${45 + i * 3}%`,
          }}
          animate={{
            y: [-20, -120],
            x: [0, (i % 2 === 0 ? 15 : -15)],
            opacity: [0.5, 0],
            scale: [0.5, 1.5],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  )
}

export default CoffeeCupCSS3D
