// ============================================
// COMPONENTE: Pricing (Tabla de Precios)
// ============================================
// Propósito: Mostrar planes de precios con psicología de ventas.
// Técnica: "Efecto señuelo" - Un plan recomendado resaltado
// hace que los otros parezcan más razonables.
// ============================================

import { motion } from "framer-motion"

// ============================================
// DATOS: Planes de precios
// Cada plan tiene:
// - name: Nombre del plan
// - price: Precio numérico
// - period: Período de facturación
// - description: Breve descripción del plan
// - features: Array de características incluidas
// - highlighted: Si es true, se muestra como plan recomendado
// - color: Esquema de color para los botones y acentos
// - cta: Texto del botón de llamada a la acción
// ============================================
const plans = [
  {
    name: "Starter",
    price: 29,
    period: "/mes",
    description: "Perfecto para empezar tu presencia digital.",
    features: [
      "Landing Page Profesional",
      "Formulario de Contacto",
      "Optimización SEO Básica",
      "Hosting Incluido",
      "Soporte por Email",
      "1 Revisión Mensual",
    ],
    highlighted: false,
    color: "from-gray-500 to-gray-600",
    cta: "Comenzar Gratis",
  },
  {
    name: "Profesional",
    price: 79,
    period: "/mes",
    description: "La opción más popular para negocios en crecimiento.",
    features: [
      "Hasta 5 Páginas Web",
      "Panel Administrativo",
      "SEO Avanzado",
      "Integración con IA",
      "Soporte Prioritario 24/7",
      "Revisión Semanal",
      "Analytics Avanzado",
      "Email Marketing",
    ],
    highlighted: true, // ← Este es el plan recomendado (efecto señuelo)
    color: "from-purple-600 to-pink-600",
    cta: "Elegir Plan",
  },
  {
    name: "Enterprise",
    price: 199,
    period: "/mes",
    description: "Para empresas que necesitan soluciones a medida.",
    features: [
      "Páginas Ilimitadas",
      "Desarrollo a Medida",
      "API Personalizada",
      "Múltiples Integraciones",
      "Gerente de Cuenta Dedicado",
      "SLA Garantizado",
      "Backups Diarios",
      "Consultoría Estratégica",
      "White Label",
    ],
    highlighted: false,
    color: "from-cyan-500 to-blue-600",
    cta: "Contactar Ventas",
  },
]

// ============================================
// COMPONENTE PRINCIPAL: Pricing
// ============================================
const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
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
            className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            💎 Planes y Precios
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Inversión </span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Transparente
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sin costos ocultos. Elige el plan que mejor se adapte a tus 
            necesidades y escala cuando estés listo.
          </p>
        </motion.div>

        {/* Grid de planes: 3 columnas en desktop, 1 en móvil */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 ${
                // Si es el plan destacado, tiene fondo diferente y borde con gradiente
                plan.highlighted
                  ? "bg-gradient-to-b from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 shadow-2xl shadow-purple-500/10"
                  : "bg-slate-800/50 border border-white/5"
              }`}
            >
              {/* Badge "Más Popular" solo en el plan destacado */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Más Popular
                </div>
              )}

              {/* Nombre del plan */}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              {/* Precio */}
              <div className="mb-6">
                <span className="text-5xl font-black text-white">${plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>

              {/* Botón CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-4 rounded-xl font-bold text-lg mb-8 transition-all ${
                  plan.highlighted
                    ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {plan.cta}
              </motion.button>

              {/* Lista de características */}
              <ul className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-gray-300">
                    {/* Check con color según el plan */}
                    <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-xs flex-shrink-0`}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Garantía */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          🔒 Garantía de devolución de 30 días. Sin preguntas.
        </motion.p>
      </div>
    </section>
  )
}

export default Pricing
