// ============================================
// COMPONENTE: Particles
// Partículas flotantes que reaccionan al mouse.
// Versión simplificada con React puro.
// ============================================

import React, { useEffect, useRef } from "react"

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Crear 25 partículas
    const particles: HTMLDivElement[] = []
    
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement("div")
      
      // Estilos base
      particle.style.position = "absolute"
      particle.style.borderRadius = "50%"
      particle.style.pointerEvents = "none"
      particle.style.transition = "transform 0.1s linear"
      
      // Propiedades aleatorias
      const size = Math.random() * 8 + 3 
      const x = Math.random() * 100
      const y = Math.random() * 100
      const opacity = Math.random() * 0.6 + 0.3
      
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`
      particle.style.opacity = `${opacity}`
      particle.style.backgroundColor = "#eC48"
      particle.style.boxShadow = `0 0 ${size * 3}px rgba(245, 158, 11, ${opacity})`
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // Mover partículas suavemente
    const moveParticles = () => {
      particles.forEach((p) => {
        const currentLeft = parseFloat(p.style.left)
        const currentTop = parseFloat(p.style.top)
        
        // Pequeño movimiento aleatorio
        const newLeft = currentLeft + (Math.random() - 0.5) * 0.3
        const newTop = currentTop + (Math.random() - 0.5) * 0.3
        
        // Mantener dentro de bordes
        p.style.left = `${Math.max(0, Math.min(100, newLeft))}%`
        p.style.top = `${Math.max(0, Math.min(100, newTop))}%`
      })
    }

    // Animar cada 50ms
    const interval = setInterval(moveParticles, 50)

    // ============================================
    // REACCIÓN AL MOUSE
    // ============================================
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100

      particles.forEach((p) => {
        const px = parseFloat(p.style.left)
        const py = parseFloat(p.style.top)
        const dx = px - mouseX
        const dy = py - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Si el mouse está cerca (< 12%), empujar la partícula
        if (distance < 12) {
          const force = (12 - distance) / 12
          const angle = Math.atan2(dy, dx)
          const newX = px + Math.cos(angle) * force * 1.5
          const newY = py + Math.sin(angle) * force * 1.5
          p.style.left = `${Math.max(0, Math.min(100, newX))}%`
          p.style.top = `${Math.max(0, Math.min(100, newY))}%`
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Limpieza
    return () => {
      clearInterval(interval)
      window.removeEventListener("mousemove", handleMouseMove)
      particles.forEach((p) => p.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}

export default Particles
