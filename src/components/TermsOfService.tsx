import { motion } from "framer-motion"

const TermsOfService = () => {
  return (
    <section className="min-h-screen bg-slate-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-black mb-8">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Términos y Condiciones
            </span>
          </h1>

          <p className="text-gray-400 mb-6">Última actualización: Julio 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Aceptación de los términos</h2>
              <p>Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. Uso del servicio</h2>
              <p>Este sitio web proporciona información sobre nuestros servicios de tecnología digital. Usted se compromete a utilizar el sitio web solo con fines lícitos y de acuerdo con la legislación aplicable.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Propiedad intelectual</h2>
              <p>Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de Elevate y está protegido por las leyes de propiedad intelectual.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Limitación de responsabilidad</h2>
              <p>Elevate no será responsable de ningún daño directo, indirecto, incidental o consecuente que resulte del uso o la imposibilidad de usar este sitio web.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Enlaces a terceros</h2>
              <p>Nuestro sitio web puede contener enlaces a sitios externos. No tenemos control sobre el contenido de esos sitios y no asumimos responsabilidad por ellos.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">6. Modificaciones</h2>
              <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">7. Contacto</h2>
              <p>Si tiene preguntas sobre estos Términos y Condiciones, contáctenos en:</p>
              <p className="text-purple-400 mt-1">📧 legal@elevate.com</p>
            </div>
          </div>

          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="inline-block mt-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold"
          >
            ← Volver al inicio
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default TermsOfService
