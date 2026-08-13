// ============================================
// COMPONENTE: ThemeToggle
// Propósito: Botón animado que cambia entre modo oscuro y claro.
// Se coloca en el Navbar para acceso fácil.
// ============================================

import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      // Estilos condicionales según el tema
      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors ${
        theme === "dark" 
          ? "bg-white/5 text-yellow-400 hover:bg-white/10"  // Sol en modo oscuro
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"    // Luna en modo claro
      }`}
      // Atributo aria-label para accesibilidad
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {/* Mostramos sol o luna según el tema */}
      {theme === "dark" ? "☀️" : "🌙"}
    </motion.button>
  )
}

export default ThemeToggle
