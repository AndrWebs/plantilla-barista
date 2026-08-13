// ============================================
// COMPONENTE: Navbar (Barra de Navegación)
// ============================================
// Propósito: Navegación principal fija superior.
//
// Protecciones contra fallos:
// - Error Boundary interno (si Globe3D falla, muestra emoji)
// - Validación de traducciones (fallback a español)
// - Menú mobile se cierra al cambiar de ruta
// - Scroll listener con cleanup para evitar memory leaks
// - Links seguros con href válidos
// ============================================


import { motion, AnimatePresence } from "framer-motion"
import React, { useState, useEffect } from "react"
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import { useLanguage } from "../context/LanguageContext"

// ============================================
// IMPORT SEGURO DEL GLOBO 3D
// Si el componente no existe o falla, usamos
// un emoji como fallback automático
// ============================================
let Globe3D: React.ComponentType | null = null
try {
  // Intentar importar el globo 3D
  Globe3D = (await import("./Globe3D")).default
} catch (error) {
  // Si falla, Globe3D queda como null
  // y el Navbar usará el emoji 🌍 automáticamente
  console.warn("⚠️ Globe3D no disponible, usando emoji fallback")
}

// ============================================
// TIPO PARA LOS LINKS DE NAVEGACIÓN
// ============================================
type NavLink = {
  name: string
  href: string
}

// ============================================
// LINKS POR DEFECTO (fallback si fallan traducciones)
// ============================================
const DEFAULT_LINKS: NavLink[] = [
  { name: "Inicio", href: "https://fit1.vercel.app/" },
  { name: "Servicios", href: "https://motivacion10.vercel.app/" },
  { name: "Nosotros", href: "#about" },
  { name: "Precios", href: "#pricing" },
  { name: "Contacto", href: "#contact" },
  { name: "Blog", href: "/blog" }, 
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const Navbar = () => {
  // ============================================
  // ESTADOS CON VALORES INICIALES SEGUROS
  // ============================================
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [globeError, setGlobeError] = useState(false)

  // ============================================
  // HOOK DE TRADUCCIONES CON PROTECCIÓN
  // Si el contexto falla, t() devuelve la clave
  // ============================================
  let t: (key: string) => string
  try {
    const language = useLanguage()
    t = language.t
  } catch (error) {
    // Fallback: si LanguageContext no está disponible
    t = (key: string) => key
    console.warn("⚠️ LanguageContext no disponible, usando claves como texto")
  }

  // ============================================
  // CONSTRUIR LINKS DE FORMA SEGURA
  // Si t() devuelve vacío, usa DEFAULT_LINKS
  // ============================================
  const links: NavLink[] = DEFAULT_LINKS.map((link, index) => {
    try {
      const translatedName = t(`nav.${["home", "services", "about", "pricing", "contact"][index]}`)
      // Si la traducción está vacía o es igual a la clave, usar default
      if (!translatedName || translatedName.startsWith("nav.")) {
        return link
      }
      return { ...link, name: translatedName }
    } catch (error) {
      return link
    }
  })

  // ============================================
  // EFECTO: Detectar scroll (CON LIMPIEZA)
  // Cleanup evita memory leaks al desmontar
  // ============================================
  useEffect(() => {
    let isMounted = true

    const handleScroll = () => {
      // Solo actualizar si el componente sigue montado
      if (isMounted) {
        setScrolled(window.scrollY > 20)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // LIMPIEZA: remover listener y marcar desmontado
    return () => {
      isMounted = false
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // ============================================
  // EFECTO: Cerrar menú mobile al hacer clic fuera
  // ============================================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Si el clic no fue en el menú ni en el botón, cerrar
      if (isOpen && !target.closest("[data-mobile-menu]")) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  // ============================================
  // FUNCIÓN SEGURA: Cerrar menú mobile
  // ============================================
  const closeMenu = () => {
    try {
      setIsOpen(false)
    } catch (error) {
      console.warn("⚠️ Error al cerrar menú:", error)
    }
  }

  // ============================================
  // FUNCIÓN SEGURA: Obtener texto CTA
  // ============================================
  const getCTAText = (): string => {
    try {
      const text = t("nav.cta")
      return text && !text.startsWith("nav.") ? text : "Comenzar Gratis"
    } catch (error) {
      return "Comenzar Gratis"
    }
  }

  // ============================================
  // RENDERIZADO
  // ============================================
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-2xl shadow-purple-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* ============================================ */}
          {/* LOGO CON PROTECCIÓN CONTRA FALLOS            */}
          {/* Si Globe3D falla, muestra emoji 🌍          */}
          {/* ============================================ */}
          <motion.a 
            href="#home"
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3"
          >
            {/* Contenedor del logo */}
            <div className="w-[60px] h-[60px] 
                            rounded-full 
                            overflow-hidden 
                            border-2 
                            border-stone-200 
                            shadow-lg 
                            shadow-purple-500/20 
                            flex-shrink-0 
                            flex items-center 
                            justify-center ">
                            
              {/* Intentar renderizar Globe3D, si falla mostrar emoji */}
              {!globeError && Globe3D ? (
                <ErrorBoundary onError={() => setGlobeError(true)}>
                  <Globe3D />
                </ErrorBoundary>
              ) : (
                <span className="text-3xl">Andres</span>
              )}
            </div>
            
            {/* Título y descripción  del NAVBAR*/}
            <div className="flex flex-col">
              <span className="text-xl font-black 
                               bg-gradient-to-r 
                               from-green-200 via-stone-200 to-purple-400 
                               bg-clip-text 
                               text-transparent leading-tight">
                Naturalite19
              </span>
              
              <span className="text-[10px] text-yellow-200 
                               leading-tight tracking-wider">
                Tecnología de Vanguardia
              </span>
            </div>
          </motion.a>

          {/* ============================================ */}
          {/* LINKS DE NAVEGACIÓN (DESKTOP)                 */}
          {/* ============================================ */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href || "#"}
                className="text-gray-300 
                           hover:text-white 
                           font-medium transition-colors relative group"
              >
                {link.name || "Link"}
                <span className="absolute bottom-0 
                                 left-0 
                                 w-0 h-0.5 
                                 bg-gradient-to-r 
                                 from-purple-400 to-pink-400 
                                 group-hover:w-full 
                                 transition-all duration-300" />
              </a>
            ))}

            {/* Toggles de idioma y tema con protección */}
            <div className="flex items-center gap-2">
              <ErrorBoundary fallback={null}>
                <LanguageToggle />
              </ErrorBoundary>
              <ErrorBoundary fallback={null}>
                <ThemeToggle />
              </ErrorBoundary>
            </div>

            {/* Botón CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r 
                         from-orange-400 to-yellow-600 
                         px-6 py-2.5 
                         rounded-full 
                         font-semibold 
                         text-blue 
                         shadow-lg 
                         shadow-yellow-500/25 
                         hover:shadow-green-500/50 
                         transition-shadow"
            >
              {getCTAText()}
            </motion.button>
          </div>

          {/* ============================================ */}
          {/* BOTÓN MENÚ MOBILE (HAMBURGUESA)              */}
          {/* ============================================ */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-orange focus:outline-none"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            data-mobile-menu="toggle"
          >
            <svg className="w-8 h-8" fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
        </div>
      </div>

      {/* ============================================ */}
      {/* MENÚ MOBILE DESPLEGABLE                       */}
      {/* ============================================ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-blue/10"
            data-mobile-menu="panel"
          >
            <div className="px-6 py-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href || "#"}
                  onClick={closeMenu}
                  className="block text-gray-300 hover:text-yellow font-medium py-2 transition-colors"
                >
                  {link.name || "Link"}
                </a>
              ))}
              <div className="flex items-center gap-4 py-2">
                <ErrorBoundary fallback={null}>
                  <LanguageToggle />
                </ErrorBoundary>
                <ErrorBoundary fallback={null}>
                  <ThemeToggle />
                </ErrorBoundary>
              </div>
              <button
                onClick={closeMenu}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full font-semibold text-white"
              >
                {getCTAText()}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ============================================
// ERROR BOUNDARY INTERNO
// Si un componente hijo falla, muestra fallback
// en lugar de romper toda la página
// ============================================
class ErrorBoundary extends React.Component<{
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: () => void
}> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn("⚠️ Error en componente del Navbar:", error.message)
    this.props.onError?.()
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}

export default Navbar
