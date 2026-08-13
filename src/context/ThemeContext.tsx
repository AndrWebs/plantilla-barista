// ============================================
// CONTEXTO: ThemeContext
// ============================================
// Propósito: Proveer el estado del tema (oscuro/claro) a TODA la aplicación.
// Patrón: React Context API - evita pasar props por muchos niveles.
// Flujo:
//   1. ThemeProvider envuelve toda la app
//   2. Cualquier componente puede usar useTheme() para leer/cambiar el tema
//   3. El tema se guarda en localStorage para persistir entre visitas
// ============================================

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Tipo de dato para el tema: solo "dark" o "light"
type Theme = "dark" | "light"

// Tipo de dato para el contexto: tema actual + función para cambiarlo
type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

// Creamos el contexto con valor inicial undefined
// Esto nos obliga a usarlo solo dentro de un ThemeProvider
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// ============================================
// COMPONENTE: ThemeProvider
// Envuelve toda la aplicación y provee el tema
// ============================================
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // ESTADO: Inicializamos el tema desde localStorage o "dark" por defecto
  const [theme, setTheme] = useState<Theme>(() => {

    // Intentamos leer el tema guardado en localStorage
    const saved = typeof window !== "undefined" 
      ? localStorage.getItem("theme") as Theme | null
      : null

    // Si hay tema guardado, lo usamos. Si no, dark por defecto
    return saved || "dark"
  })

  // EFECTO: Cada vez que el tema cambia, actualizamos el DOM y localStorage
  useEffect(() => {
    // Manipulamos la clase "dark" en el elemento <html>
    // Tailwind usa esta clase para aplicar estilos condicionales
    const root = document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")   // Modo oscuro
    } else {
      root.classList.remove("dark") // Modo claro
    }

    // Guardamos la preferencia en localStorage para la próxima visita
    localStorage.setItem("theme", theme)
  }, [theme]) // Se ejecuta cada vez que 'theme' cambia

  // FUNCIÓN: Alternar entre oscuro y claro
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ============================================
// HOOK PERSONALIZADO: useTheme
// Acceso rápido al contexto desde cualquier componente
// Incluye verificación de error si se usa fuera del Provider
// ============================================
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider")
  }
  return context
}
