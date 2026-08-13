// ============================================
// COMPONENTE: PrivacyPolicy
// Página de Política de Privacidad profesional.
// Se accede desde el Footer.
// ============================================

import { motion } from "framer-motion"

const PrivacyPolicy = () => {
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
              Política de Privacidad
            </span>
          </h1>

          <p className="text-gray-400 mb-6">Última actualización: Julio 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Información que recopilamos</h2>
              <p>Recopilamos información que usted nos proporciona voluntariamente al completar formularios en nuestro sitio web, incluyendo:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono (opcional)</li>
                <li>Nombre de la empresa (opcional)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. Cómo utilizamos su información</h2>
              <p>Utilizamos la información recopilada para:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Responder a sus solicitudes de información y demostraciones</li>
                <li>Enviar comunicaciones relacionadas con nuestros servicios</li>
                <li>Mejorar nuestro sitio web y servicios</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Protección de datos</h2>
              <p>Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción. Sus datos se almacenan de forma segura en servidores con cifrado AES-256.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. No compartimos sus datos</h2>
              <p>No vendemos, intercambiamos ni transferimos su información personal a terceros. Esto no incluye a los proveedores de servicios de confianza que nos asisten en la operación de nuestro sitio web, siempre que acepten mantener la confidencialidad de la información.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Cookies</h2>
              <p>Utilizamos cookies esenciales para el funcionamiento del sitio web. No utilizamos cookies de seguimiento ni publicitarias sin su consentimiento. Puede configurar su navegador para rechazar todas las cookies.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">6. Sus derechos</h2>
              <p>Usted tiene derecho a:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Acceder a sus datos personales</li>
                <li>Solicitar la rectificación de datos inexactos</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al tratamiento de sus datos</li>
                <li>Solicitar la portabilidad de sus datos</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">7. Contacto</h2>
              <p>Si tiene preguntas sobre esta Política de Privacidad, contáctenos en:</p>
              <p className="text-purple-400 mt-1">📧 privacidad@elevate.com</p>
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

export default PrivacyPolicy
