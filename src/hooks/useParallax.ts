// ============================================
// HOOK: useParallax
// ============================================
// Propósito: Devuelve un valor que cambia según la posición del scroll.
// Útil para crear efectos parallax donde elementos se mueven
// a diferentes velocidades.
//
// Parámetros:
//   - speed: Factor de velocidad (0 = estático, 1 = velocidad normal, 2 = doble)
//   - direction: "vertical" | "horizontal"
//
// Retorna: motionValue que se actualiza con el scroll
// ============================================

import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export const useParallax = (
  speed: number = 0.5,
  direction: "vertical" | "horizontal" = "vertical"
) => {
  // Referencia al elemento contenedor
  const ref = useRef<HTMLDivElement>(null)

  // useScroll: rastrea la posición del scroll relativa al elemento
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Desde que entra hasta que sale de la vista
  })

  // useTransform: convierte el progreso del scroll (0 a 1) en valores de movimiento
  // Rango: -100 a 100 píxeles (o el rango que necesites)
  const value = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical" ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
  )

  return { ref, value }
}
