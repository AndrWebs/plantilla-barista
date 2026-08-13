import type { Metadata } from "next"
import CookiesPolicy from "@/components/CookiesPolicy"

export const metadata: Metadata = {
  title: "Política de Cookies | Barista Pro",
  description: "Aprende cómo usamos las cookies en Barista Pro para mejorar tu experiencia. Transparencia y control sobre tus datos.",
}

export default function CookiesPage() {
  return <CookiesPolicy />
}
