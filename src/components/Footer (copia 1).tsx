// ============================================
// COMPONENTE: Footer (Pie de Página)
// ============================================
// Propósito: Sección final con newsletter,
// links de navegación y redes sociales.
//
// Ahora incluye:
// - Formulario de newsletter con campos opcionales
// - Nombre, teléfono y empresa (opcionales)
// - Validación de email obligatorio
// - Animación de éxito al enviar
// ============================================

import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import { useState } from "react"

const Footer = () => {
  const { t } = useLanguage()

  // ============================================
  // ESTADOS DEL FORMULARIO
  // ============================================
  const [formData, setFormData] = useState({
    name: "",       // Nombre (opcional)
    email: "",      // Email (OBLIGATORIO)
    phone: "",      // Teléfono (opcional)
    company: "",    // Empresa (opcional)
  })
  const [submitted, setSubmitted] = useState(false)  // ¿Enviado con éxito?
  const [error, setError] = useState("")             // Mensaje de error
  const [showExtraFields, setShowExtraFields] = useState(false)  // Mostrar campos extra

  // ============================================
  // FUNCIÓN: Manejar cambios en los inputs
  // ============================================
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")  // Limpiar error al escribir
  }

  // ============================================
  // FUNCIÓN: Enviar formulario
  // ============================================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar email (obligatorio)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!formData.email.trim()) {
      setError(t("form.error.required") || "El email es obligatorio")
      return
    }
    
    if (!emailRegex.test(formData.email.trim())) {
      setError(t("form.error.invalid") || "Ingresa un email válido")
      return
    }

    // Guardar en localStorage
    const existingLeads = localStorage.getItem("elevate_leads")
    const leads = existingLeads ? JSON.parse(existingLeads) : []

    const newLead = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      createdAt: new Date().toISOString(),
      source: "footer_newsletter",
    }

    leads.push(newLead)
    localStorage.setItem("elevate_leads", JSON.stringify(leads))

    console.log("✅ Lead capturado desde Footer:", newLead)

    // Feedback visual de éxito
    setSubmitted(true)
    setError("")
    setFormData({ name: "", email: "", phone: "", company: "" })
    setShowExtraFields(false)

    // Resetear después de 3 segundos
    setTimeout(() => setSubmitted(false), 3000)
  }

  // Datos de redes sociales
  const socialLinks = [
    { name: "Twitter", icon: "𝕏", href: "#" },
    { name: "LinkedIn", icon: "in", href: "#" },
    { name: "GitHub", icon: "⌨", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" },
  ]

  // Datos de columnas de links
  const footerLinks = [
    {
      title: t("footer.col1.title") || "Producto",
      links: ["Características", "Precios", "Integraciones", "Actualizaciones"]
    },
    {
      title: t("footer.col2.title") || "Empresa",
      links: ["Sobre Nosotros", "Blog", "Carreras", "Prensa"]
    },
    {
      title: t("footer.col3.title") || "Soporte",
      links: ["Centro de Ayuda", "Documentación", "API", "Contacto"]
    },
    {
      title: t("footer.col4.title") || "Legal",
      links: ["Privacidad", "Términos", "Cookies", "Licencias"]
    }
  ]

  return (
    <footer id="contact" className="relative bg-slate-950 border-t border-white/5">
      {/* Línea decorativa con gradiente */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* ============================================ */}
        {/* SECCIÓN: NEWSLETTER CON FORMULARIO           */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-8 md:p-10 mb-16 border border-purple-500/20"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Texto de llamado a la acción */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {t("footer.title") || "¿Listo para transformar tu negocio?"}
              </h3>
              <p className="text-gray-400">
                {t("footer.desc") || "Únete a más de 500 empresas que ya confían en nosotros."}
              </p>
            </div>

            {/* ============================================ */}
            {/* FORMULARIO DE CAPTURA                        */}
            {/* ============================================ */}
            <form onSubmit={handleSubmit} className="w-full lg:w-auto lg:min-w-[400px] space-y-3">
              
              {/* ============================================ */}
              {/* FILA 1: Email (OBLIGATORIO) + Botón Enviar  */}
              {/* ============================================ */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder={t("footer.placeholder") || "tu@email.com *"}
                    className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                      error 
                        ? "border-red-400/50 focus:border-red-400" 
                        : "border-white/10 focus:border-purple-400"
                    }`}
                  />
                  {/* Mensaje de error debajo del input */}
                  {error && (
                    <p className="text-red-400 text-xs mt-1 ml-1 absolute -bottom-5 left-0">
                      {error}
                    </p>
                  )}
                </div>

                {/* Botón enviar */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    submitted
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
                  }`}
                >
                  {submitted ? (
                    <span className="flex items-center gap-1">
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring" }}
                      >
                        ✓
                      </motion.span>
                      ¡Registrado!
                    </span>
                  ) : (
                    t("footer.button") || "Enviar →"
                  )}
                </motion.button>
              </div>

              {/* ============================================ */}
              {/* BOTÓN: Mostrar/ocultar campos opcionales     */}
              {/* ============================================ */}
              <button
                type="button"
                onClick={() => setShowExtraFields(!showExtraFields)}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
              >
                <motion.span
                  animate={{ rotate: showExtraFields ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  +
                </motion.span>
                {showExtraFields 
                  ? (t("footer.hide") || "Ocultar campos adicionales")
                  : (t("footer.show") || "Añadir nombre, teléfono y empresa")
                }
              </button>

              {/* ============================================ */}
              {/* CAMPOS OPCIONALES (se muestran/ocultan)      */}
              {/* ============================================ */}
              <AnimatePresence>
                {showExtraFields && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {/* Campo: Nombre (opcional) */}
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder={t("form.name") || "Nombre completo (opcional)"}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm"
                    />

                    {/* Fila: Teléfono + Empresa (opcionales) */}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder={t("form.phone") || "Teléfono (opcional)"}
                        className="bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm"
                      />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        placeholder={t("form.company") || "Empresa (opcional)"}
                        className="bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mensaje de privacidad */}
              <p className="text-gray-500 text-xs">
                🔒 Tus datos están seguros. No compartimos información con terceros.
              </p>
            </form>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* GRID DE LINKS DEL FOOTER                     */}
        {/* ============================================ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ============================================ */}
        {/* LÍNEA INFERIOR: Copyright + Redes Sociales   */}
        {/* ============================================ */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {t("footer.copyright") || "© 2026 Elevate. Todos los derechos reservados."}
          </p>
          
          {/* Redes sociales */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-white/10 transition-all"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
