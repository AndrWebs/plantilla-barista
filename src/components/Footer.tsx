"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"
import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

const Footer = () => {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [showExtraFields, setShowExtraFields] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!formData.email.trim()) {
      setError(t("form.error.required") || "El email es obligatorio")
      return
    }
    
    if (!emailRegex.test(formData.email.trim())) {
      setError(t("form.error.invalid") || "Ingresa un email válido")
      return
    }

    try {
      const { error } = await supabase
        .from("leads")
        .insert([
          {
            name: formData.name.trim() || "Sin nombre",
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            company: formData.company.trim() || null,
            source: "footer_newsletter",
          },
        ])

      if (error) {
        console.error("Error al guardar en Supabase:", error.message)
      } else {
        console.log("Lead guardado en Supabase desde Footer")
      }
    } catch (err) {
      console.error("Error guardando lead:", err)
    }

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

    setSubmitted(true)
    setError("")
    setFormData({ name: "", email: "", phone: "", company: "" })
    setShowExtraFields(false)

    setTimeout(() => setSubmitted(false), 3000)
  }

  // Redes sociales
  const socialLinks = [
    { name: "Twitter", icon: "𝕏", href: "#" },
    { name: "LinkedIn", icon: "in", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" },
  ]

  // Columnas simplificadas
  const footerLinks = [
    {
      title: "Información",
      links: [
        { name: "Servicios", url: "/#services" },
        { name: "Blog", url: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacidad", url: "/privacidad" },
        { name: "Términos", url: "/terminos" },
        { name: "Cookies", url: "/cookies" },
      ],
    },
    {
      title: "Contacto",
      // Enlaces de contacto directo
      isContact: true,
    },
  ]

  return (
    <footer id="contact" className="relative bg-stone-950 border-t border-white/5">
      {/* Línea decorativa */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Sección: Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl p-8 md:p-10 mb-16 border border-amber-500/20"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {t("footer.title") || "¿Listo para transformar tu experiencia ?"}
              </h3>
              <p className="text-stone-400">
                {t("footer.desc") || "Únete a más de 500 empresas que ya confían en nosotros."}
              </p>
            </div>

            {/* Formulario de captura */}
            <form onSubmit={handleSubmit} className="w-full lg:w-auto lg:min-w-[400px] space-y-3">
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder={t("footer.placeholder") || "tu@email.com *"}
                    className={`w-full bg-stone-800 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                      error 
                        ? "border-red-400/50 focus:border-red-400" 
                        : "border-white/10 focus:border-amber-400"
                    }`}
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-1 ml-1 absolute -bottom-5 left-0">
                      {error}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    submitted
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/25"
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
                    t("Enviar >>") || "Enviar →"
                  )}
                </motion.button>
              </div>

              <button
                type="button"
                onClick={() => setShowExtraFields(!showExtraFields)}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
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
                  : (t("Más Información") || "Añadir nombre, teléfono y empresa")
                }
              </button>

              <AnimatePresence>
                {showExtraFields && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder={t("form.name") || "Nombre completo (opcional)"}
                      className="w-full bg-stone-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder={t("form.phone") || "Teléfono (opcional)"}
                        className="bg-stone-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                      />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        placeholder={t("form.company") || "Empresa (opcional)"}
                        className="bg-stone-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-stone-500 text-xs">
                🔒 Tus datos están seguros. No compartimos información con terceros.
              </p>
            </form>
          </div>
        </motion.div>

        {/* Grid de columnas simplificadas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{column.title}</h4>
              
              {column.isContact ? (
                // Columna de contacto (email + WhatsApp)
                <ul className="space-y-3">
                  <li>
                    <a
                      href="naturalite19@proton.me.com"
                      className="text-stone-400 hover:text-amber-400 transition-colors 
                                 text-sm flex items-center gap-2"
                    >
                      <span>📧</span>
                      info@baristapro.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/34123456789?text=¡Hola!%20Quiero%20más%20información"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>💬</span>
                      WhatsApp
                    </a>
                  </li>
                </ul>
              ) : (
                // Columnas normales (Información, Legal)
                <ul className="space-y-2">
                  {column.links?.map((link: any) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        className="text-stone-400 hover:text-amber-400 transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Línea inferior: Copyright + Redes Sociales */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">
            {"copyright © 2026 Barista Pro. Todos los derechos reservados."}
          </p>
          
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                className="w-10 h-10 bg-white/5 rounded-full flex 
                           items-center justify-center text-stone-400 
                           hover:text-amber-400 hover:bg-white/10 
                           transition-all"
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
