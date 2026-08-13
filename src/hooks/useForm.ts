// ============================================
// HOOK: useForm
// ============================================
// Propósito: Manejar formularios con validación,
// estados de envío y almacenamiento de datos.
//
// Ahora guarda en:
// 1. Supabase (nube) - principal
// 2. localStorage - respaldo local
// ============================================

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

// ============================================
// TIPOS DE DATOS
// ============================================
type ValidationRule = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

type FieldConfig = {
  name: string
  label: string
  type: string
  placeholder: string
  rules: ValidationRule
  errorMessages?: {
    required?: string
    minLength?: string
    maxLength?: string
    pattern?: string
    custom?: string
  }
}

type FormData = Record<string, string>
type FormErrors = Record<string, string>

// ============================================
// CONFIGURACIÓN DE CAMPOS COMUNES
// ============================================
export const contactFields: FieldConfig[] = [
  {
    name: "name",
    label: "Nombre completo",
    type: "text",
    placeholder: "Ej: María García",
    rules: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    errorMessages: {
      required: "El nombre es obligatorio",
      minLength: "Mínimo 3 caracteres",
      maxLength: "Máximo 100 caracteres",
    },
  },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
    placeholder: "Ej: maria@empresa.com",
    rules: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    errorMessages: {
      required: "El email es obligatorio",
      pattern: "Ingresa un email válido (ej: nombre@dominio.com)",
    },
  },
  {
    name: "phone",
    label: "Teléfono (opcional)",
    type: "tel",
    placeholder: "Ej: +34 612 345 678",
    rules: {
      pattern: /^[+]?[\d\s()-]{7,15}$/,
    },
    errorMessages: {
      pattern: "Ingresa un teléfono válido",
    },
  },
  {
    name: "company",
    label: "Empresa (opcional)",
    type: "text",
    placeholder: "Ej: Mi Empresa S.L.",
    rules: {
      maxLength: 100,
    },
    errorMessages: {
      maxLength: "Máximo 100 caracteres",
    },
  },
]

// ============================================
// HOOK PRINCIPAL
// ============================================
export const useForm = (fields: FieldConfig[]) => {
  // ESTADO 1: Datos del formulario
  const [formData, setFormData] = useState<FormData>(() => {
    const initial: FormData = {}
    fields.forEach((field) => {
      initial[field.name] = ""
    })
    return initial
  })

  // ESTADO 2: Errores de validación
  const [errors, setErrors] = useState<FormErrors>({})

  // ESTADO 3: ¿Se está enviando?
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ESTADO 4: ¿Envío exitoso?
  const [isSuccess, setIsSuccess] = useState(false)

  // ESTADO 5: Campos tocados por el usuario
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // ============================================
  // FUNCIÓN: Validar un campo individual
  // ============================================
  const validateField = (name: string, value: string): string | null => {
    const field = fields.find((f) => f.name === name)
    if (!field) return null

    const { rules, errorMessages } = field

    if (rules.required && !value.trim()) {
      return errorMessages?.required || "Este campo es obligatorio"
    }

    if (!value.trim() && !rules.required) return null

    if (rules.minLength && value.trim().length < rules.minLength) {
      return errorMessages?.minLength || `Mínimo ${rules.minLength} caracteres`
    }

    if (rules.maxLength && value.trim().length > rules.maxLength) {
      return errorMessages?.maxLength || `Máximo ${rules.maxLength} caracteres`
    }

    if (rules.pattern && !rules.pattern.test(value.trim())) {
      return errorMessages?.pattern || "Formato inválido"
    }

    if (rules.custom) {
      const customError = rules.custom(value.trim())
      if (customError) return errorMessages?.custom || customError
    }

    return null
  }

  // ============================================
  // FUNCIÓN: Manejar cambio en un input
  // ============================================
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => {
        const newErrors = { ...prev }
        if (error) {
          newErrors[name] = error
        } else {
          delete newErrors[name]
        }
        return newErrors
      })
    }
  }

  // ============================================
  // FUNCIÓN: Marcar campo como tocado (onBlur)
  // ============================================
  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name])
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[name] = error
      } else {
        delete newErrors[name]
      }
      return newErrors
    })
  }

  // ============================================
  // FUNCIÓN: Validar todo el formulario
  // ============================================
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    fields.forEach((field) => {
      const error = validateField(field.name, formData[field.name])
      if (error) {
        newErrors[field.name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    const allTouched: Record<string, boolean> = {}
    fields.forEach((f) => (allTouched[f.name] = true))
    setTouched(allTouched)

    return isValid
  }

  // ============================================
  // FUNCIÓN: Guardar lead en Supabase (NUBE)
  // También guarda en localStorage como respaldo
  // ============================================
  const saveLead = async (data: FormData) => {
    try {
      // 1. Guardar en Supabase (nube)
      const { error } = await supabase
        .from("leads")
        .insert([
          {
            name: data.name || null,
            email: data.email,
            phone: data.phone || null,
            company: data.company || null,
            source: window.location.pathname,
          },
        ])

      if (error) {
        console.error("❌ Error al guardar en Supabase:", error.message)
      } else {
        console.log("✅ Lead guardado en Supabase")
      }

      // 2. Guardar también en localStorage como respaldo
      const existingLeads = localStorage.getItem("elevate_leads")
      const leads = existingLeads ? JSON.parse(existingLeads) : []

      const newLead = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        source: window.location.pathname,
      }

      leads.push(newLead)
      localStorage.setItem("elevate_leads", JSON.stringify(leads))

      return newLead
    } catch (error) {
      console.error("Error guardando lead:", error)
      return null
    }
  }

  // ============================================
  // FUNCIÓN: Enviar formulario
  // ============================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simular envío (para feedback visual)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Guardar en Supabase + localStorage
      const lead = await saveLead(formData)

      if (lead) {
        setIsSuccess(true)

        // Resetear después de 3 segundos
        setTimeout(() => {
          const resetData: FormData = {}
          fields.forEach((f) => (resetData[f.name] = ""))
          setFormData(resetData)
          setTouched({})
          setErrors({})
          setIsSuccess(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Error enviando formulario:", error)
      setErrors({ submit: "Error al enviar. Intenta de nuevo." })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ============================================
  // RETORNO DEL HOOK
  // ============================================
  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
  }
}
