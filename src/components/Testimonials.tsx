// ============================================
// COMPONENTE: Testimonials (Prueba Social)
// ============================================
// Propósito: Mostrar testimonios de clientes en un carrusel automático.
// Psicología de ventas: La gente confía en lo que otros dicen de ti,
// no en lo que tú dices de ti mismo. Esto reduce el riesgo percibido.
// ============================================

import { motion, AnimatePresence } from "framer-motion"
// useState: Para controlar qué testimonio está activo
// useEffect: Para configurar el temporizador del carrusel automático
import { useState, useEffect } from "react"

// ============================================
// DATOS: Array de testimonios
// Cada objeto representa un testimonio con:
// - name: Nombre del cliente
// - role: Cargo o empresa
// - image: Iniciales para el avatar (en producción usarías URLs de imágenes reales)
// - text: El testimonio textual
// - rating: Puntuación de 1 a 5
// - color: Color distintivo para el avatar
// ============================================
const testimonials = [
  {
    name: "María García",
    role: "CEO de TechStart",
    image: "MG",
    text: "Transformaron completamente nuestra presencia digital. En solo 3 meses nuestras conversiones aumentaron un 200%. El equipo es increíblemente profesional y creativo.",
    rating: 5,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Carlos Rodríguez",
    role: "Fundador de EcomPlus",
    image: "CR",
    text: "La mejor inversión que hemos hecho. Su enfoque en la experiencia de usuario nos ayudó a reducir la tasa de rebote en un 45%. Resultados tangibles desde el primer mes.",
    rating: 5,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Ana Martínez",
    role: "Directora de Marketing",
    image: "AM",
    text: "No solo diseñan bonito, diseñan para convertir. Cada elemento tiene un propósito. Nuestro ROI se disparó después de implementar sus estrategias de persuasión.",
    rating: 5,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Pedro Sánchez",
    role: "Startup Founder",
    image: "PS",
    text: "Trabajar con ellos fue como tener un equipo de élite interno. La velocidad de entrega y la calidad del código son excepcionales. Altamente recomendados.",
    rating: 5,
    color: "from-orange-500 to-red-500",
  },
]

// ============================================
// SUB-COMPONENTE: StarRating
// Propósito: Renderizar estrellas visuales basadas en un número del 1 al 5.
// Parámetro: rating (número entre 1 y 5)
// Retorna: 5 elementos span con estrellas llenas o vacías
// ============================================
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {/* Array.from crea un array de 5 posiciones para iterar */}
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-lg ${
            // Si el índice es menor que el rating, la estrella está "llena" (dorada)
            // Si no, está "vacía" (gris)
            i < rating ? "text-yellow-400" : "text-gray-600"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

// ============================================
// COMPONENTE PRINCIPAL: Testimonials
// ============================================
const Testimonials = () => {
  // ESTADO: Índice del testimonio actualmente visible
  // currentIndex: número que indica qué elemento del array se muestra
  // setCurrentIndex: función para cambiar el testimonio activo
  const [currentIndex, setCurrentIndex] = useState(0)

  // EFECTO: Auto-rotación del carrusel
  // Se ejecuta cada vez que currentIndex cambia
  // Crea un temporizador que avanza al siguiente testimonio cada 5 segundos
  // El return limpia el temporizador cuando el componente se desmonta
  useEffect(() => {
    const timer = setInterval(() => {
      // Lógica para avanzar al siguiente testimonio
      // Si llega al final, vuelve al principio (bucle infinito)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // 5000ms = 5 segundos

    // LIMPIEZA: Se ejecuta cuando el componente se desmonta
    // Evita fugas de memoria y múltiples temporizadores
    return () => clearInterval(timer)
  }, []) // Array vacío = solo se ejecuta al montar el componente

  // ============================================
  // FUNCIÓN: Navegar manualmente entre testimonios
  // Parámetro: direction ("prev" o "next")
  // Propósito: Permitir al usuario controlar el carrusel con botones
  // ============================================
  const navigate = (direction: "prev" | "next") => {
    if (direction === "next") {
      // Avanza al siguiente, si llega al final vuelve al inicio
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    } else {
      // Retrocede al anterior, si está en el inicio va al final
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  // Variable para acceder al testimonio actual de forma más limpia
  const current = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      {/* Fondo decorativo: círculo difuminado para dar profundidad */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Encabezado de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-pink-500/20 text-pink-300 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            ⭐ Lo que dicen nuestros clientes
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Clientes </span>
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Felices
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No confíes en nuestra palabra, escucha lo que dicen quienes ya 
            transformaron su negocio con nosotros.
          </p>
        </motion.div>

        {/* Carrusel de testimonios */}
        <div className="max-w-4xl mx-auto">
          {/* AnimatePresence permite animar elementos cuando entran y salen del DOM */}
          <AnimatePresence mode="wait">
            {/* La key={currentIndex} es CRUCIAL: le dice a React que es un elemento nuevo
                y así dispara la animación de entrada/salida */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}      // Estado inicial: invisible y 20px abajo
              animate={{ opacity: 1, y: 0 }}        // Estado final: visible y en posición
              exit={{ opacity: 0, y: -20 }}         // Al salir: se desvanece hacia arriba
              transition={{ duration: 0.4 }}         // La animación dura 0.4 segundos
              className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-3xl p-10 md:p-14"
            >
              {/* Comillas decorativas gigantes */}
              <div className="text-8xl text-purple-500/20 font-serif absolute top-4 left-8">
                "
              </div>

              {/* Contenido del testimonio */}
              <div className="relative z-10">
                {/* Texto del testimonio */}
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 italic">
                  {current.text}
                </p>

                {/* Separador visual */}
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-6" />

                {/* Información del cliente */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar con iniciales */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${current.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {current.image}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{current.name}</h4>
                      <p className="text-gray-400 text-sm">{current.role}</p>
                    </div>
                  </div>
                  {/* Estrellas de rating */}
                  <StarRating rating={current.rating} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles de navegación del carrusel */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Botón: Anterior */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("prev")}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              ←
            </motion.button>

            {/* Indicadores de posición (puntos) */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    // El punto activo se ilumina y se alarga
                    // Los inactivos quedan más pequeños y tenues
                    index === currentIndex
                      ? "bg-purple-500 w-8"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Botón: Siguiente */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("next")}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
