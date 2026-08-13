// ============================================
// COMPONENTE: Dashboard (Métricas en Tiempo Real)
// ============================================
// Propósito: Mostrar un panel de métricas que se actualizan
// automáticamente, simulando datos en tiempo real.
// Psicología: Transparencia + Tecnología = Confianza.
// Los números que cambian solos generan sensación de
// actividad constante y empresa viva.
// ============================================

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useLanguage } from "../context/LanguageContext"

// ============================================
// TIPOS DE DATOS
// ============================================
type MetricData = {
  label: string       // Nombre de la métrica
  value: number       // Valor actual
  target: number      // Valor máximo (para barras de progreso)
  unit: string        // Unidad (%, k, ms, etc.)
  icon: string        // Emoji decorativo
  color: string       // Color de la barra y acentos
  history: number[]   // Últimos valores para calcular tendencia
}

// ============================================
// SUB-COMPONENTE: MiniGraph
// Pequeño gráfico de barras que muestra la historia reciente
// ============================================
const MiniGraph = ({ data, color, maxValue }: { data: number[]; color: string; maxValue: number }) => {
  return (
    <div className="flex items-end gap-1 h-8">
      {data.map((value, i) => {
        // Calculamos la altura como porcentaje del valor máximo
        const height = maxValue > 0 ? (value / maxValue) * 100 : 0
        return (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`w-2 rounded-t-sm bg-gradient-to-t ${color}`}
            style={{ minHeight: "4px" }}
          />
        )
      })}
    </div>
  )
}

// ============================================
// SUB-COMPONENTE: MetricCard
// Tarjeta individual con métrica, barra de progreso y mini gráfico
// ============================================
const MetricCard = ({ metric }: { metric: MetricData }) => {
  // Calculamos el porcentaje de progreso
  const percentage = Math.round((metric.value / metric.target) * 100)
  
  // Calculamos la tendencia: diferencia entre el último valor y el primero
  const trend = metric.history.length >= 2 
    ? metric.history[metric.history.length - 1] - metric.history[0]
    : 0
  
  // Texto de tendencia
  const trendText = trend >= 0 ? `+${trend}%` : `${trend}%`
  const trendColor = trend >= 0 ? "text-green-400" : "text-red-400"
  const trendIcon = trend >= 0 ? "↑" : "↓"

  // Valor máximo para el mini gráfico (el mayor del historial o el target)
  const maxGraphValue = Math.max(...metric.history, metric.target)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300"
    >
      {/* Cabecera: icono + nombre + tendencia */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{metric.icon}</span>
          <span className="text-gray-400 text-sm font-medium">{metric.label}</span>
        </div>
        {/* Indicador de tendencia */}
        <span className={`text-xs font-bold ${trendColor}`}>
          {trendIcon} {trendText}
        </span>
      </div>

      {/* Valor principal grande */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-4xl font-black text-white">
          {metric.value.toLocaleString()}
        </span>
        <span className="text-gray-500 text-lg">{metric.unit}</span>
      </div>

      {/* Barra de progreso animada */}
      <div className="w-full h-2 bg-white/5 rounded-full mb-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
        />
      </div>

      {/* Meta + Mini gráfico */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Meta: {metric.target.toLocaleString()}{metric.unit}
        </span>
        <MiniGraph data={metric.history} color={metric.color} maxValue={maxGraphValue} />
      </div>
    </motion.div>
  )
}

// ============================================
// COMPONENTE PRINCIPAL: Dashboard
// ============================================
const Dashboard = () => {
  const { t } = useLanguage()

  // ============================================
  // ESTADO: Métricas iniciales
  // En producción, estos datos vendrían de una API
  // ============================================
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      label: "Visitantes Hoy",
      value: 12847,
      target: 15000,
      unit: "",
      icon: "👥",
      color: "from-purple-500 to-pink-500",
      history: [12000, 12300, 12400, 12500, 12600, 12700, 12847],
    },
    {
      label: "Tasa de Conversión",
      value: 4.8,
      target: 5,
      unit: "%",
      icon: "🎯",
      color: "from-cyan-500 to-blue-500",
      history: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8],
    },
    {
      label: "Proyectos Activos",
      value: 47,
      target: 50,
      unit: "",
      icon: "⚡",
      color: "from-emerald-500 to-teal-500",
      history: [40, 41, 42, 43, 44, 45, 47],
    },
    {
      label: "Tiempo de Carga",
      value: 0.8,
      target: 1,
      unit: "s",
      icon: "⏱️",
      color: "from-orange-500 to-red-500",
      history: [1.2, 1.1, 1.0, 0.95, 0.9, 0.85, 0.8],
    },
    {
      label: "Uptime del Servidor",
      value: 99.99,
      target: 100,
      unit: "%",
      icon: "🖥️",
      color: "from-green-500 to-emerald-500",
      history: [99.95, 99.96, 99.97, 99.98, 99.98, 99.99, 99.99],
    },
    {
      label: "Clientes Nuevos",
      value: 234,
      target: 300,
      unit: "",
      icon: "🎉",
      color: "from-pink-500 to-rose-500",
      history: [200, 205, 210, 215, 220, 228, 234],
    },
  ])

  // ============================================
  // EFECTO: Simular actualización en tiempo real
  // Cada 3 segundos, algunas métricas cambian ligeramente
  // Esto da la ilusión de datos en vivo
  // ============================================
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          // Solo actualizamos algunas métricas aleatoriamente
          if (Math.random() > 0.5) {
            // Pequeña variación aleatoria (+-2% del valor actual)
            const variation = metric.value * (Math.random() * 0.02 - 0.01)
            const newValue = Math.max(0, metric.value + variation)
            // Redondeamos a 2 decimales máximo
            const roundedValue = Number(newValue.toFixed(2))
            
            // Actualizamos el historial (quitamos el más antiguo, añadimos el nuevo)
            const newHistory = [...metric.history.slice(1), roundedValue]
            
            return { ...metric, value: roundedValue, history: newHistory }
          }
          return metric
        })
      )
    }, 3000) // Cada 3 segundos

    // Limpieza al desmontar
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="dashboard" className="py-24 px-6 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Indicador de "en vivo" con punto pulsante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full mb-4"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-green-300 text-sm font-semibold">
              {t("dashboard.live") || "Métricas en Vivo"}
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">{t("dashboard.title1") || "Dashboard "}</span>
            <span className="bg-gradient-to-r from-green-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              {t("dashboard.title2") || "en Tiempo Real"}
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("dashboard.desc") || "Monitorea el rendimiento de tu negocio digital con métricas actualizadas al instante. Datos que impulsan decisiones."}
          </p>
        </motion.div>

        {/* Grid de métricas: 3 columnas en desktop, 2 en tablet, 1 en móvil */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Footer del dashboard */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          📊 Datos actualizados cada 3 segundos • Precisión del 99.9%
        </motion.p>
      </div>
    </section>
  )
}

export default Dashboard
