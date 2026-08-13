// ============================================
// COMPONENTE: CustomCursor
// ============================================
// Propósito: Reemplazar el cursor por defecto con uno
// personalizado que sigue al mouse con un efecto de
// suavizado (lag). Dos círculos concéntricos:
// - Cursor externo: Sigue al mouse con retraso (suave)
// - Cursor interno (dot): Sigue al mouse instantáneamente
//
// Efectos:
// - Al hacer hover sobre elementos interactivos, crece
// - Cambia de color según el contexto
// - Se oculta en dispositivos táctiles (no tienen cursor)
// ============================================

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "../context/ThemeContext"

const CustomCursor = () => {
  const { theme } = useTheme()

  // ============================================
  // ESTADO: Controla el tamaño del cursor
  // "default" = tamaño normal, "hover" = agrandado
  // ============================================
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">("default")

  // ============================================
  // VALORES DE MOVIMIENTO
  // useMotionValue: Valores reactivos de Framer Motion
  // No causan re-renderizados, son ultra-performantes
  // ============================================
  
  // Posición X e Y del mouse (valores crudos)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Posición X e Y con resorte (suavizado)
  // stiffness: qué tan rígido es el resorte (más = más rápido)
  // damping: qué tanto amortigua (más = menos rebote)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Posición del dot central (más rápido, menos amortiguado)
  const dotX = useSpring(mouseX, { stiffness: 300, damping: 20 })
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 20 })

  // ============================================
  // EFECTO: Rastrear movimiento del mouse
  // ============================================
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Actualizamos las posiciones crudas
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // Agregamos el listener al documento completo
    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // ============================================
  // EFECTO: Detectar elementos interactivos
  // Usamos event delegation para detectar cuando
  // el cursor pasa sobre links, botones, etc.
  // ============================================
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Verificamos si el elemento o su padre es interactivo
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null ||
        target.hasAttribute("data-cursor-hover")

      if (isInteractive) {
        setCursorVariant("hover")
        // Añadimos clase al body para ocultar cursor nativo
        document.body.style.cursor = "none"
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const relatedTarget = (e.relatedTarget as HTMLElement) || target.parentElement
      
      // Solo restauramos si salimos a un elemento no interactivo
      const stillInteractive = 
        relatedTarget?.tagName === "A" ||
        relatedTarget?.tagName === "BUTTON" ||
        relatedTarget?.closest("a") !== null ||
        relatedTarget?.closest("button") !== null

      if (!stillInteractive) {
        setCursorVariant("default")
        document.body.style.cursor = "default"
      }
    }

    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  // ============================================
  // OCULTAR EN DISPOSITIVOS TÁCTILES
  // Los dispositivos táctiles no tienen cursor
  // ============================================
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detectamos si es dispositivo táctil
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)
  }, [])

  // Si es táctil, no renderizamos nada
  if (isTouchDevice) return null

  // ============================================
  // ESTILOS SEGÚN VARIANTE Y TEMA
  // ============================================
  const cursorSize = cursorVariant === "hover" ? 60 : 32
  const dotSize = cursorVariant === "hover" ? 8 : 6
  const borderColor = theme === "dark" 
    ? "border-purple-400/50" 
    : "border-purple-500/50"
  const bgColor = theme === "dark"
    ? "bg-purple-400/20"
    : "bg-purple-500/20"

  return (
    <>
      {/* ============================================ */}
      {/* OCULTAR CURSOR NATIVO EN TODA LA PÁGINA     */}
      {/* ============================================ */}
      <style>{`
        * {
          cursor: none !important;
        }
        body {
          cursor: none !important;
        }
        a, button, input, textarea, select, [role="button"] {
          cursor: none !important;
        }
      `}</style>

      {/* ============================================ */}
      {/* CURSOR EXTERNO: Círculo grande con borde     */}
      {/* Sigue al mouse con suavizado (spring)        */}
      {/* ============================================ */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border-2 ${borderColor} ${bgColor} pointer-events-none z-[9999]`}
        style={{
          width: cursorSize,
          height: cursorSize,
          x: springX,
          y: springY,
          // Centrar el cursor respecto al mouse
          translateX: "-50%",
          translateY: "-50%",
          // Mezcla para ver lo que hay debajo
          mixBlendMode: "difference",
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* ============================================ */}
      {/* CURSOR INTERNO (DOT): Punto central           */}
      {/* Sigue al mouse casi instantáneamente           */}
      {/* ============================================ */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          width: dotSize,
          height: dotSize,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: theme === "dark" ? "#c084fc" : "#7c3aed", // purple-400 o purple-600
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
        }}
        animate={{
          width: dotSize,
          height: dotSize,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* ============================================ */}
      {/* TEXTO "CLICK" CUANDO HAY HOVER SOBRE BOTONES  */}
      {/* ============================================ */}
      {cursorVariant === "hover" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <span className="text-xs font-bold text-white bg-purple-600 px-2 py-1 rounded-full">
            CLICK
          </span>
        </motion.div>
      )}
    </>
  )
}

export default CustomCursor
