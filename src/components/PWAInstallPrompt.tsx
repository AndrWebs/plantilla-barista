// ============================================
// COMPONENTE: PWAInstallPrompt
// ============================================
// Propósito: Mostrar un banner en la parte inferior
// que invita al usuario a instalar la página como
// una app en su dispositivo (PWA).
//
// Flujo:
// 1. Espera el evento "beforeinstallprompt" del navegador
// 2. Muestra un banner animado después de 5 segundos
// 3. Al hacer clic en "Instalar", dispara el prompt nativo
// 4. Oculta el banner si el usuario cierra o ya instaló
//
// Nota: Solo funciona en navegadores que soportan PWA
// (Chrome, Edge, Safari en iOS, Firefox en Android)
// ============================================

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useLanguage } from "../context/LanguageContext"

// ============================================
// TIPO: BeforeInstallPromptEvent
// Extiende el Event nativo con los métodos
// específicos del prompt de instalación PWA
// ============================================
interface BeforeInstallPromptEvent extends Event {
  // Muestra el diálogo nativo de instalación
  prompt: () => Promise<void>
  // Promesa que resuelve con la decisión del usuario
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const PWAInstallPrompt = () => {
  // Hook para traducciones
  const { t } = useLanguage()

  // ESTADO 1: Guarda el evento beforeinstallprompt
  // para poder dispararlo manualmente después
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  // ESTADO 2: Controla si mostramos el banner
  const [showPrompt, setShowPrompt] = useState(false)

  // ESTADO 3: Controla si la app ya está instalada
  const [isInstalled, setIsInstalled] = useState(false)

  // ============================================
  // EFECTO: Configurar listeners de PWA
  // Se ejecuta una sola vez al montar el componente
  // ============================================
  useEffect(() => {
    // VERIFICACIÓN 1: ¿La app ya está instalada?
    // matchMedia verifica si estamos en modo "standalone" (app instalada)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return // Si ya está instalada, no hacemos nada más
    }

    // ============================================
    // HANDLER 1: Capturar el evento beforeinstallprompt
    // El navegador dispara este evento cuando la PWA
    // cumple los requisitos para ser instalable
    // ============================================
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenimos que el navegador muestre su propio prompt
      e.preventDefault()
      // Guardamos el evento para usarlo después
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Mostramos nuestro banner personalizado después de 5 segundos
      setTimeout(() => setShowPrompt(true), 5000)
    }

    // ============================================
    // HANDLER 2: Detectar cuando la app se instaló
    // Se dispara después de una instalación exitosa
    // ============================================
    const handleAppInstalled = () => {
      // Marcamos como instalada
      setIsInstalled(true)
      // Ocultamos el banner
      setShowPrompt(false)
      // Limpiamos el prompt guardado
      setDeferredPrompt(null)
      console.log("✅ PWA instalada correctamente")
    }

    // Registrar los listeners
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    // LIMPIEZA: Remover listeners al desmontar el componente
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, []) // Array vacío = solo se ejecuta una vez

  // ============================================
  // FUNCIÓN: Manejar clic en "Instalar"
  // Dispara el prompt nativo de instalación
  // ============================================
  const handleInstall = async () => {
    // Si no hay prompt disponible, salimos
    if (!deferredPrompt) return

    try {
      // Mostrar el diálogo nativo de instalación
      await deferredPrompt.prompt()
      
      // Esperar la decisión del usuario
      const { outcome } = await deferredPrompt.userChoice
      
      // Si aceptó, marcar como instalada
      if (outcome === "accepted") {
        setIsInstalled(true)
        console.log("✅ Usuario aceptó instalar la PWA")
      } else {
        console.log("❌ Usuario rechazó instalar la PWA")
      }
    } catch (error) {
      console.log("Error instalando PWA:", error)
    }
    
    // Limpiar el prompt guardado
    setDeferredPrompt(null)
    // Ocultar el banner
    setShowPrompt(false)
  }

  // ============================================
  // RENDERIZADO CONDICIONAL
  // No mostramos nada si:
  // - La app ya está instalada
  // - No hay prompt disponible
  // - No debemos mostrar el banner
  // ============================================
  if (isInstalled || !showPrompt) return null

  return (
    // AnimatePresence permite animar al salir del DOM
    <AnimatePresence>
      <motion.div
        // Estado inicial: fuera de pantalla (abajo) y transparente
        initial={{ y: 100, opacity: 0 }}
        // Estado final: en posición y visible
        animate={{ y: 0, opacity: 1 }}
        // Estado de salida: vuelve abajo y se desvanece
        exit={{ y: 100, opacity: 0 }}
        // Posicionamiento: fijo abajo, centrado
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        {/* Banner con gradiente */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 shadow-2xl shadow-purple-500/30 flex items-center gap-4">
          
          {/* Icono de app a la izquierda */}
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">
            📲
          </div>
          
          {/* Texto central */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">
              {t("pwa.title") || "Instalar App"}
            </p>
            <p className="text-white/70 text-xs truncate">
              {t("pwa.desc") || "Accede más rápido desde tu pantalla de inicio"}
            </p>
          </div>

          {/* Botones a la derecha */}
          <div className="flex gap-2 flex-shrink-0">
            {/* Botón de instalar */}
            <button
              onClick={handleInstall}
              className="bg-white text-purple-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              {t("pwa.install") || "Instalar"}
            </button>
            {/* Botón de cerrar */}
            <button
              onClick={() => setShowPrompt(false)}
              className="text-white/50 hover:text-white px-2 py-2 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PWAInstallPrompt
