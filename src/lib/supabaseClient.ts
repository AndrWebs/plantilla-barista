// ============================================
// CLIENTE DE SUPABASE
// ============================================
// Este archivo inicializa la conexión con tu
// base de datos en la nube usando las variables
// de entorno del archivo .env
// ============================================

import { createClient } from "@supabase/supabase-js"

// Leer las credenciales desde el archivo .env para next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificar que las variables existen
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY. Revisa tu archivo .env"
  )
}

// Crear y exportar el cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
