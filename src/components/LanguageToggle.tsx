// ============================================
// COMPONENTE: LanguageToggle
// Botón para cambiar entre español e inglés
// ============================================
import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage()
  const { theme } = useTheme()

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
        theme === "dark"
          ? "bg-white/5 text-white hover:bg-white/10"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {language === "es" ? "EN" : "ES"}
    </motion.button>
  )
}

export default LanguageToggle
