// ============================================
// COMPONENTE: ContactForm
// ============================================
// Propósito: Formulario de contacto persuasivo
// con validación en tiempo real, animaciones
// y feedback visual de éxito/error.
// ============================================

import { motion, AnimatePresence } from "framer-motion"
import { useForm, contactFields } from "../hooks/useForm"
import { useLanguage } from "../context/LanguageContext"

const ContactForm = () => {
  const { t } = useLanguage()

  // Inicializar el hook useForm con los campos de contacto
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
  } = useForm(contactFields)

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        
        {/* Iterar sobre cada campo definido en contactFields */}
        {contactFields.map((field) => {
          const hasError = touched[field.name] && errors[field.name]
          const isValid = touched[field.name] && !errors[field.name] && formData[field.name].trim() !== ""

          return (
            <div key={field.name} className="relative">
              {/* Etiqueta flotante: se mueve hacia arriba cuando el campo tiene valor */}
              <motion.label
                htmlFor={field.name}
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  formData[field.name]
                    ? "top-1 text-xs text-purple-400"
                    : "top-3.5 text-gray-400"
                }`}
              >
                {field.label}
                {field.rules.required && <span className="text-pink-400 ml-0.5">*</span>}
              </motion.label>

              {/* Input del campo */}
              <input
                id={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                onBlur={() => handleBlur(field.name)}
                placeholder={field.placeholder}
                className={`w-full bg-slate-800/80 border rounded-xl px-4 pt-5 pb-3 text-white placeholder-transparent
                  outline-none transition-all duration-200
                  ${hasError
                    ? "border-red-400/50 focus:border-red-400"
                    : isValid
                    ? "border-green-400/50 focus:border-green-400"
                    : "border-white/10 focus:border-purple-400"
                  }
                `}
              />

              {/* Icono de estado: ✗ si error, ✓ si válido */}
              <AnimatePresence>
                {hasError && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute right-4 top-4 text-red-400"
                  >
                    ✗
                  </motion.span>
                )}
                {isValid && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute right-4 top-4 text-green-400"
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Mensaje de error debajo del input */}
              <AnimatePresence>
                {hasError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1 ml-1"
                  >
                    {errors[field.name]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {/* Botón de envío con estados: normal, cargando, éxito */}
        <motion.button
          type="submit"
          disabled={isSubmitting || isSuccess}
          whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
            ${isSuccess
              ? "bg-green-500 text-white cursor-default"
              : isSubmitting
              ? "bg-purple-700 text-white cursor-wait"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
            }
          `}
        >
          {/* Texto del botón según estado */}
          {isSuccess ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                ✓
              </motion.span>
              {t("form.success") || "¡Registrado con éxito!"}
            </span>
          ) : isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                ⏳
              </motion.span>
              {t("form.sending") || "Enviando..."}
            </span>
          ) : (
            t("form.submit") || "Quiero Más Información →"
          )}
        </motion.button>

        {/* Mensaje de privacidad que genera confianza */}
        <p className="text-gray-500 text-xs text-center">
          🔒 Tus datos están seguros. No compartimos información con terceros.
        </p>
      </form>
    </div>
  )
}

export default ContactForm
