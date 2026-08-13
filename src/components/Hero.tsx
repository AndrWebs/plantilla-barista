// ============================================
// COMPONENTE: Hero
// ============================================
// Propósito: Sección principal de la landing page.
//
// Características:
// - Partículas animadas que reaccionan al mouse
// - Badge, título con gradiente, descripción
// - Botones CTA (abren modal con formulario)
// - Estadísticas (clientes, satisfacción, soporte)
// - Tarjeta visual decorativa (simula dashboard)
// - Fondos animados con círculos difuminados
// - Soporte multi-idioma con useLanguage()
// ============================================

import { motion } from "framer-motion"
import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import ContactForm from "./ContactForm"
import Particles from "./Particles"

const Hero = () => {
  // ============================================
  // HOOKS
  // ============================================
  const { t } = useLanguage()                    // Traducciones ES/EN
  const [showForm, setShowForm] = useState(false) // Modal del formulario

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      
      {/* ============================================ */}
      {/* MEJORA 1: PARTÍCULAS ANIMADAS                 */}
      {/* 30 partículas púrpuras que flotan y reaccionan */}
      {/* al movimiento del mouse                       */}
      {/* ============================================ */}
      <Particles />

      {/* ============================================ */}
      {/* FONDO DECORATIVO                              */}
      {/* Círculos difuminados que se mueven suavemente  */}
      {/* ============================================ */}
      <div className="absolute inset-0">
        {/* Círculo púrpura (izquierda) */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        {/* Círculo rosa (derecha) */}
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* ============================================ */}
          {/* COLUMNA IZQUIERDA: TEXTO + CTAs + ESTADÍSTICAS */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}    // Entra desde la izquierda
            animate={{ opacity: 1, x: 0 }}      // Posición final
            transition={{ duration: 0.8 }}       // Duración de la animación
          >
            {/* ============================================ */}
            {/* BADGE: Etiqueta superior                      */}
            {/* "🚀 Tecnología de Vanguardia"                 */}
            {/* ============================================ */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-stone-200 
                         text-amber-800
                         shadow-orange-500/20 
                         px-4 py-2 
                         rounded-full text-sm font-semibold mb-6"
            >
              {t("hero.badge")}
               Muy formal
            </motion.span>

            {/* ============================================ */}
            {/* TÍTULO PRINCIPAL                             */}
            {/* "Impulsa tu" + "Negocio Digital" (gradiente) */}
            {/* ============================================ */}
            <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="text-yellow">{t("hero.title1")}</span>
              <span className="bg-gradient-to-r from-amber-200 via-stone-500 to-amber-600 bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>

            {/* ============================================ */}
            {/* DESCRIPCIÓN  HERO                                */}
            {/* Texto persuasivo que explica el valor         */}
            {/* ============================================ */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t("hero.description")}Preparar un café extraordinario no depende de 
              tener una máquina costosa. Depende de conocer los principios 
              que usan los baristas profesionales. Con el mismo café que 
              tienes en casa puedes obtener un sabor completamente diferente.
              Y en pocos minutos te mostraremos por qué.
            </p>

            {/* ============================================ */}
            {/* BOTONES CTA (Call to Action)                  */}
            {/* - Principal: "Solicitar Demo Gratis"          */}
            {/* - Secundario: "Ver Video ▶"                   */}
            {/* ============================================ */}
            <div className="flex flex-wrap gap-4">
              {/* Botón principal: abre modal con formulario */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-yellow-600 to-pink-600 px-8 py-4 rounded-full font-bold text-lg text-white shadow-xl shadow-purple-500/25"
              >
                {t("hero.cta1")}
              </motion.button>

              {/* Botón secundario */}
              <motion.a 
                href="https://fit1.vercel.app/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 
                           border-white/20 
                           hover:border-purple-400 
                           px-8 py-4 
                           rounded-full 
                           font-bold 
                           text-lg 
                           text-white 
                           transition-all"
              >
                {t("hero.cta2")} 
              </motion.a>
            </div>

            {/* ============================================ */}
            {/* ESTADÍSTICAS                                 */}
            {/* Prueba social con números impactantes        */}
            {/* - +500 Clientes Activos                      */}
            {/* - 98% Satisfacción                          */}
            {/* - 24/7 Soporte                              */}
            {/* ============================================ */}
            <div className="flex gap-8 mt-12">
              {/* Estadística 1 */}
              <div>
                <div className="text-3xl font-black text-purple-400">+300</div>
                <div className="text-cyan-600 text-sm">{t("hero.stat1")}</div>
              </div>
              {/* Estadística 2 */}
              <div>
                <div className="text-3xl font-black text-pink-400">92%</div>
                <div className="text-gray-400 text-sm">{t("hero.stat2")}</div>
              </div>
              {/* Estadística 3 */}
              <div>
                <div className="text-3xl font-black text-purple-400">24/7</div>
                <div className="text-indigo-700 text-sm">{t("hero.stat3")}</div>
              </div>
            </div>
          </motion.div>

          {/* ============================================ */}
          {/* COLUMNA DERECHA: TARJETA VISUAL DECORATIVA    */}
          {/* Simula una ventana de dashboard/terminal      */}
          {/* con puntos de colores, líneas y notificación  */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}    // Entra desde la derecha
            animate={{ opacity: 1, x: 0 }}     // Posición final
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Contenedor con efecto glass */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              
              {/* Tarjeta interna (simula una app) */}
              <div className="bg-amber-950 rounded-2xl p-6 space-y-4">
                
                {/* Puntos de ventana (rojo, amarillo, verde) */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                </div>

                {/* Líneas simulando texto o código */}
                <div className="space-y-3">
                  <div className="h-3 bg-gradient-to-r from-green-500 to-pink-500 rounded w-3/4
                                  text-green-600"/>
                                  
                       Podemos añadir textos por debajo.
                       
                  <div className="h-3 bg-stone-800 hover:bg-pink-700 rounded w-1/2" />
                                  
                       desde aqui tambien para usarlo.
                       
                  <div className="h-3 bg-white/10 rounded w-2/3 text-stone-200" />
                       otra forma eficiencia. por que no cambia los textos.
                </div>

                {/* Tarjeta de notificación (IA) */}
                <div className="bg-amber-900 text-green-300 
                                rounded-lg p-4 flex items-center gap-3"> 
                  
                    Domina las técnicas utilizadas por cafeterías 
                    profesionales.  
                  
                  <div className="w-10 h-10 bg-white 
                       rounded-full flex items-center 
                       justify-center text-2xl">                    ⚡
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold text-purple-300">
                      {t("hero.card.title")}
                    </div>
                    <div className="text-xs text-gray-400">
                      {t("hero.card.desc")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================ */}
      {/* MODAL DEL FORMULARIO DE CONTACTO              */}
      {/* Se abre al hacer clic en "Solicitar Demo"    */}
      {/* ============================================ */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            // Cerrar al hacer clic fuera del formulario
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
              {t("form.title")} "Solicita tu Demo Gratis"
            </h3>
            
            {/* Subtítulo del modal */}
            <p className="text-green-400 text-center mb-6">
              {t("form.subtitle")} "Déjanos tus datos y te contactamos en menos de 2 horas"
            </p>

            {/* Formulario con validación */}
            <ContactForm />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Hero
