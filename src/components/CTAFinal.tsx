import { motion } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import { useState } from "react"
import ContactForm from "./ContactForm"

const CTAFinal = () => {
  const { t } = useLanguage()
  const [showForm, setShowForm] = useState(false)

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-pink-600/10" />
      
      {/* Círculo decorativo 1 */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
      />
      
      {/* Círculo decorativo 2 */}
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          
          {/* Insignia de urgencia */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-6 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-purple-200 text-sm font-medium">
              {t("cta.badge") || "Solo quedan 3 cupos este mes"}
            </span>
          </motion.div>

          {/* Título impactante */}
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">
              {t("cta.title1") || "¿Listo para "}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {t("cta.title2") || "Transformar"}
            </span>
            <br />
            <span className="text-white">
              {t("cta.title3") || "tu Negocio?"}
            </span>
          </h2>

          {/* Subtítulo persuasivo */}
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("cta.desc") || "Únete a más de 500 empresas que ya están creciendo con nuestra tecnología. No esperes más, el momento es ahora."}
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            {/* Botón principal: abre el modal con formulario */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-5 rounded-full font-bold text-xl text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
            >
              {t("cta.button1") || "🚀 Comenzar Ahora Gratis"}
            </motion.button>

            {/* Botón secundario */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/20 hover:border-purple-400 px-10 py-5 rounded-full font-bold text-xl text-white transition-all"
            >
              {t("cta.button2") || "📞 Agendar Llamada"}
            </motion.button>
          </div>

          {/* Micro-compromiso */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-sm mt-6"
          >
            {t("cta.footnote") || "✨ Sin tarjeta de crédito • Cancela cuando quieras • 30 días de garantía"}
          </motion.p>
        </motion.div>
      </div>

      {/* ============================================ */}
      {/* MODAL DEL FORMULARIO                         */}
      {/* Se abre al hacer clic en "Comenzar Ahora"    */}
      {/* ============================================ */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowForm(false)
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>

            {/* Título del modal */}
            <h3 className="text-2xl font-bold text-white mb-2 text-center">
              {t("form.title") || "Solicita tu Demo Gratis"}
            </h3>
            
            {/* Subtítulo del modal */}
            <p className="text-gray-400 text-center mb-6">
              {t("form.subtitle") || "Déjanos tus datos y te contactamos en menos de 2 horas"}
            </p>

            {/* Componente del formulario con validación */}
            <ContactForm />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default CTAFinal
