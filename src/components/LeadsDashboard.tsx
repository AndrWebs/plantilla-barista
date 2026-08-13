// ============================================
// COMPONENTE: LeadsDashboard
// ============================================
// Propósito: Mostrar todos los leads capturados
// a través de los formularios de la web.
//
// Se accede añadiendo ?admin=true a la URL
// Ej: http://localhost:5173?admin=true
// ============================================

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// Tipo de dato para un lead
type Lead = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  createdAt: string
  source: string
}

const LeadsDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isVisible, setIsVisible] = useState(false)

  // Cargar leads desde localStorage
  useEffect(() => {
    // Verificar si la URL tiene ?admin=true
    const params = new URLSearchParams(window.location.search)
    if (params.get("admin") === "true") {
      setIsVisible(true)
      loadLeads()
    }
  }, [])

  const loadLeads = () => {
    const stored = localStorage.getItem("elevate_leads")
    if (stored) {
      setLeads(JSON.parse(stored))
    }
  }

  const exportToCSV = () => {
    if (leads.length === 0) return

    // Crear CSV
    const headers = ["ID", "Nombre", "Email", "Teléfono", "Empresa", "Fecha", "Origen"]
    const rows = leads.map((lead) => [
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      new Date(lead.createdAt).toLocaleString(),
      lead.source,
    ])

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")
    
    // Descargar archivo
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const clearLeads = () => {
    if (confirm("¿Seguro que quieres eliminar TODOS los leads?")) {
      localStorage.removeItem("elevate_leads")
      setLeads([])
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-sm overflow-auto p-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Cabecera */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white">
              📊 Dashboard de Leads
            </h2>
            <p className="text-gray-400 mt-1">
              Total: {leads.length} contactos capturados
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              📥 Exportar CSV
            </button>
            <button
              onClick={clearLeads}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              🗑️ Limpiar
            </button>
            <a
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm"
            >
              ✕ Cerrar
            </a>
          </div>
        </div>

        {/* Tabla de leads */}
        {leads.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl">📭</span>
            <p className="text-gray-400 mt-4">No hay leads todavía</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-gray-400 text-sm">Fecha</th>
                  <th className="py-3 px-4 text-gray-400 text-sm">Nombre</th>
                  <th className="py-3 px-4 text-gray-400 text-sm">Email</th>
                  <th className="py-3 px-4 text-gray-400 text-sm">Teléfono</th>
                  <th className="py-3 px-4 text-gray-400 text-sm">Empresa</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-gray-300 text-sm">
                      {new Date(lead.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-white font-medium">{lead.name}</td>
                    <td className="py-3 px-4 text-purple-300">{lead.email}</td>
                    <td className="py-3 px-4 text-gray-300">{lead.phone || "-"}</td>
                    <td className="py-3 px-4 text-gray-300">{lead.company || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default LeadsDashboard
