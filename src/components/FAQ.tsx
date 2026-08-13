// ============================================
// COMPONENTE: FAQ (Preguntas Frecuentes)
// ============================================
// Propósito: Responder objeciones antes de que el cliente las formule.
// Técnica: Acordeón animado - muestra/oculta respuestas suavemente.
// Psicología: Eliminar dudas reduce la fricción de compra.
// ============================================

import { motion, AnimatePresence } from "framer-motion"
// useState: Controla qué pregunta está abierta (solo una a la vez)
import { useState } from "react"

// ============================================
// DATOS: Preguntas y respuestas
// ============================================
const faqs = [
  {
    question: "¿Cuánto tiempo toma desarrollar mi página web?",
    answer: "Dependiendo de la complejidad, una landing page profesional puede estar lista en 5-7 días hábiles. Proyectos más complejos como e-commerce toman de 2 a 4 semanas. Siempre entregamos un MVP funcional en la primera semana.",
  },
  {
    question: "¿Puedo actualizar el contenido yo mismo?",
    answer: "¡Por supuesto! Todos nuestros proyectos incluyen un panel de administración intuitivo donde puedes modificar textos, imágenes y productos sin necesidad de conocimientos técnicos. Además, te capacitamos en su uso.",
  },
  {
    question: "¿Ofrecen garantía o soporte después del lanzamiento?",
    answer: "Sí. Todos los planes incluyen soporte técnico. El plan Profesional incluye soporte prioritario 24/7 y el plan Enterprise tiene un gerente de cuenta dedicado. Además, ofrecemos 30 días de garantía de satisfacción.",
  },
  {
    question: "¿Mi sitio web será responsive y funcionará en móviles?",
    answer: "Absolutamente. Diseñamos con enfoque Mobile First. Todos nuestros proyectos se ven y funcionan perfectamente en smartphones, tablets y desktop. Es parte de nuestro estándar de calidad.",
  },
  {
    question: "¿Qué incluye el SEO que mencionan en los planes?",
    answer: "El SEO básico incluye optimización de meta tags, estructura semántica HTML5, sitemap XML, optimización de velocidad y configuración de Google Search Console. El SEO avanzado añade investigación de keywords, optimización de contenido y link building.",
  },
  {
    question: "¿Puedo migrar mi sitio actual a su plataforma?",
    answer: "Sí, realizamos migraciones desde cualquier plataforma (WordPress, Wix, Shopify, etc.) sin perder tráfico ni posicionamiento SEO. El proceso incluye redirecciones 301 y preservación de URLs cuando es posible.",
  },
  {
    question: "¿Qué pasa si necesito funcionalidades personalizadas?",
    answer: "Nuestro equipo de desarrollo puede crear cualquier funcionalidad a medida: sistemas de reservas, marketplaces, plataformas de aprendizaje, integraciones con APIs externas, etc. Conversamos tus necesidades y te damos una solución.",
  },
  {
    question: "¿Cómo funciona el proceso de pago?",
    answer: "Trabajamos con pagos mensuales sin contratos forzosos. Puedes cancelar en cualquier momento. Para proyectos grandes, ofrecemos un esquema 50% al inicio y 50% al finalizar. Aceptamos transferencias, tarjetas y PayPal.",
  },
]

// ============================================
// SUB-COMPONENTE: FaqItem
// Propósito: Renderizar una pregunta con su respuesta colapsable.
// Parámetros:
//   - faq: objeto con question y answer
//   - isOpen: booleano que indica si esta pregunta está expandida
//   - onClick: función que se ejecuta al hacer clic
// ============================================
const FaqItem = ({ faq, isOpen, onClick }: { faq: { question: string; answer: string }; isOpen: boolean; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Borde con gradiente cuando está abierto, borde tenue cuando está cerrado
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? "border-purple-500/30 bg-slate-800/80" 
          : "border-white/5 bg-slate-800/30 hover:border-white/10"
      }`}
    >
      {/* Botón de la pregunta - cubre todo el ancho */}
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className={`font-semibold text-lg pr-4 ${isOpen ? "text-purple-300" : "text-white"}`}>
          {faq.question}
        </span>
        
        {/* Ícono de expandir/colapsar que gira con animación */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}  // Gira 45 grados al abrir (el + se vuelve x)
          transition={{ duration: 0.3 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isOpen ? "bg-purple-500/20 text-purple-300" : "bg-white/5 text-gray-400"
          }`}
        >
          +
        </motion.span>
      </button>

      {/* Contenedor de la respuesta con animación de altura */}
      {/* AnimatePresence permite animar elementos al salir del DOM */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Estado inicial: altura 0 y opaco
            initial={{ height: 0, opacity: 0 }}
            // Estado final: altura automática y visible
            animate={{ height: "auto", opacity: 1 }}
            // Al salir: vuelve a altura 0 y se desvanece
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-400 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================
// COMPONENTE PRINCIPAL: FAQ
// ============================================
const FAQ = () => {
  // ESTADO: Índice de la pregunta abierta
  // null significa que ninguna está abierta
  // Si tiene un número, solo esa pregunta está expandida
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // FUNCIÓN: Manejar clic en una pregunta
  // Si la pregunta ya está abierta, la cierra (toggle)
  // Si está cerrada, la abre y cierra cualquier otra
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 px-6 relative">
      {/* Fondo decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-purple-500/5 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            ❓ Preguntas Frecuentes
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">¿Tienes </span>
            <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Dudas?
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Respuestas claras a las preguntas más comunes. Si no encuentras 
            lo que buscas, contáctanos directamente.
          </p>
        </motion.div>

        {/* Lista de preguntas */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </div>

        {/* Contacto adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-6 bg-slate-800/50 border border-white/5 rounded-2xl"
        >
          <p className="text-gray-400">
            ¿No encontraste tu respuesta?{" "}
            <a href="#contact" className="text-purple-400 hover:text-purple-300 font-semibold underline">
              Escríbenos ahora
            </a>{" "}
            y te respondemos en menos de 2 horas.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
