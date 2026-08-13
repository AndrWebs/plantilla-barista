// ============================================
// COMPONENTE: FloatingMenu
// ============================================
// Propósito: Menú flotante con múltiples botones
// que se despliegan al hacer clic en el botón principal.
//
// Botones actuales:
// 1. 💬 WhatsApp (chat directo)
// 2. 📥 Descargar Catálogo (PDF)
// 3. ℹ️ Más Información (página interna)
// 4. 📤 Compartir (Web Share API - NUEVO)
//
// Características:
// - Animación de despliegue tipo "abanico"
// - Cada botón con icono, color y tooltip
// - Efecto de pulso en el botón principal
// - Se cierra al hacer clic fuera
// - El botón Compartir usa la API nativa del dispositivo
//   (en móvil abre WhatsApp, Facebook, etc.; en escritorio
//   copia el enlace al portapapeles)
// ============================================

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// ============================================
// 🔥 CAMBIO 1: AÑADIDO BOTÓN "COMPARTIR"
// ============================================
// Se agregó un cuarto botón al array `buttons` con:
// - id: "share"
// - icon: SVG de compartir
// - color: cyan
// - isShare: true (indica que usa Web Share API en lugar de href)
// ============================================
const buttons = [
  {
    id: "whatsapp",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: "WhatsApp",
    color: "bg-green-500 hover:bg-green-600",
    href: "https://wa.me/34123456789?text=¡Hola!%20Quiero%20más%20información",
    external: true,
  },
  {
    id: "download",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: "Descargar Catálogo",
    color: "bg-blue-500 hover:bg-blue-600",
    href: "/catalogo.pdf",
    external: false,
  },
  {
    id: "info",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Más Información",
    color: "bg-purple-500 hover:bg-purple-600",
    href: "/servicios",
    external: false,
  },
  // ============================================
  // 🔥 NUEVO BOTÓN: COMPARTIR EN REDES SOCIALES
  // ============================================
  // Este botón NO usa href, sino que ejecuta la
  // función sharePage() que utiliza la Web Share API
  // del dispositivo (nativa en móviles).
  // En escritorio, copia el enlace al portapapeles.
  // ============================================
  {
    id: "share",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    label: "Compartir",
    color: "bg-cyan-500 hover:bg-cyan-600",
    href: "#",  // No se usa porque onClick lo intercepta
    external: false,
    isShare: true,  // ← INDICADOR: este botón usa Web Share API
  },
]

const FloatingMenu = () => {
  // Estado: menú abierto o cerrado
  const [isOpen, setIsOpen] = useState(false)

  // ============================================
  // 🔥 CAMBIO 2: FUNCIÓN sharePage()
  // ============================================
  // Esta función se ejecuta al hacer clic en el
  // botón "Compartir". Utiliza la Web Share API
  // nativa del dispositivo móvil para abrir el
  // menú de compartir (WhatsApp, Facebook, etc.).
  //
  // Si el dispositivo no soporta Web Share API
  // (ej: escritorio), copia el enlace al portapapeles.
  // Si todo falla, muestra un prompt con el enlace.
  // ============================================
  const sharePage = async () => {
    // Datos que se compartirán
    const shareData = {
      title: "Elevate - Tecnología Digital",
      text: "Descubre cómo transformar tu negocio con tecnología de punta. ¡Entra ahora!",
      url: window.location.href,
    }

    // ¿El dispositivo soporta Web Share API? (móviles)
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        console.log("✅ Contenido compartido exitosamente")
      } catch (error) {
        console.log("❌ Error al compartir:", error)
      }
    } else {
      // Fallback para escritorio: copiar enlace al portapapeles
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert("📋 ¡Enlace copiado al portapapeles! Pégalo donde quieras compartir.")
      } catch (error) {
        // Si todo falla, mostrar el enlace manualmente
        prompt("Copia este enlace para compartir:", window.location.href)
      }
    }
  }

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-floating-menu]")) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      data-floating-menu
    >
      {/* Botones secundarios (se despliegan arriba) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {buttons.map((button, index) => (
              <motion.a
                key={button.id}
                href={button.href}
                target={button.external ? "_blank" : undefined}
                rel={button.external ? "noopener noreferrer" : undefined}
                // ============================================
                // 🔥 CAMBIO 3: onClick CONDICIONAL
                // ============================================
                // Si el botón tiene isShare: true, interceptamos
                // el clic y ejecutamos sharePage() en lugar de
                // seguir el enlace href.
                // ============================================
                onClick={(e) => {
                  if (button.id === "share") {
                    e.preventDefault()  // Evitar que siga el href="#"
                    sharePage()         // Ejecutar la función de compartir
                  }
                }}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`flex items-center gap-3 group`}
              >
                {/* Etiqueta del botón */}
                <span className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {button.label}
                </span>

                {/* Círculo del botón */}
                <span className={`flex items-center justify-center w-12 h-12 ${button.color} text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110`}>
                  {button.icon}
                </span>
              </motion.a>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Botón principal (toggle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {/* Efecto de pulso */}
        <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-25" />
        
        {/* Botón principal */}
        <span className={`relative flex items-center justify-center w-full h-full rounded-full transition-all duration-300 ${
          isOpen
            ? "bg-slate-700 rotate-45"
            : "bg-purple-600 hover:bg-purple-700"
        }`}>
          <svg
            className="w-8 h-8 text-white transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default FloatingMenu