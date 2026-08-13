"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const CookiesPolicy = () => {
  return (
    <section className="min-h-screen bg-stone-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl font-black mb-8">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Política de Cookies
            </span>
          </h1>

          <p className="text-stone-400 mb-6">Última actualización: Julio 2025</p>

          <div className="space-y-8 text-stone-300 leading-relaxed">
            
            {/* INTRODUCCIÓN */}
            <div>
              <h2 className="font-serif text-xl font-bold text-white mb-3">☕ ¿Qué son las cookies?</h2>
              <p>
                Imagina que visitas tu cafetería favorita y el barista recuerda que te gusta el espresso doble 
                sin azúcar. Las cookies son como ese barista: pequeños archivos que se guardan en tu dispositivo 
                cuando navegas por nuestra web, y que nos ayudan a recordar tus preferencias para ofrecerte 
                una experiencia más personalizada, como preparar la taza perfecta cada vez que vuelves.
              </p>
              <p className="mt-2">
                En términos técnicos, una cookie es un pequeño fragmento de texto que los sitios web envían 
                a tu navegador y que se almacena en tu ordenador, tableta o móvil. Son totalmente inofensivas, 
                no contienen virus ni software malicioso.
              </p>
            </div>

            {/* CÓMO FUNCIONAN */}
            <div>
              <h2 className="font-serif text-xl font-bold text-white mb-3">⚙️ ¿Cómo funcionan?</h2>
              <p>
                Cuando entras en <strong>Barista Pro</strong>, el sitio le pide permiso a tu navegador para 
                guardar una pequeña cantidad de información. Esa información permite, por ejemplo, mantener 
                abierta tu sesión, recordar el idioma que elegiste o saber qué páginas has visitado.
              </p>
              <p className="mt-2">
                Hay dos tipos principales de cookies según su duración:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-stone-400">
                <li><strong>Cookies de sesión:</strong> desaparecen al cerrar el navegador (como la espuma del café recién hecho).</li>
                <li><strong>Cookies persistentes:</strong> permanecen un tiempo definido para recordarte en futuras visitas (como el aroma que perdura en la taza).</li>
              </ul>
            </div>

            {/* PARA QUÉ LAS USAMOS */}
            <div>
              <h2 className="font-serif text-xl font-bold text-white mb-3">🎯 ¿Para qué las utilizamos en Barista Pro?</h2>
              <p>
                Nuestro objetivo es que tu experiencia en la web sea tan placentera como disfrutar de un café 
                de especialidad. Las cookies nos ayudan a:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-stone-400">
                <li><strong>Cookies técnicas (esenciales):</strong> son como el agua para preparar café: sin ellas, la máquina no funciona. Permiten navegar por la web, acceder a zonas seguras o utilizar el carrito de la tienda.</li>
                <li><strong>Cookies de preferencias:</strong> recuerdan tu idioma, moneda o región, igual que un barista que ya sabe si prefieres leche de avena o almendra.</li>
                <li><strong>Cookies de análisis (estadísticas):</strong> nos cuentan cuántas personas nos visitan, qué páginas son las más populares y si encuentran rápido lo que buscan. Son como el termómetro que mide la temperatura del espresso: nos ayudan a ajustar la receta.</li>
                <li><strong>Cookies de marketing:</strong> nos permiten mostrarte contenido relevante, como cursos de latte art o productos de tu interés, evitando ofrecerte cosas que no te gustan (no te mostraremos té si amas el café).</li>
              </ul>
            </div>

            {/* COOKIES DE TERCEROS */}
            <div>
              <h2 className="font-serif text-xl font-bold text-white mb-3">🤝 Cookies de terceros</h2>
              <p>
                Al igual que un buen café puede llevar un toque de canela o chocolate, nuestra web utiliza 
                servicios de terceros de confianza que también instalan cookies:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-stone-400">
                <li><strong>Google Analytics:</strong> para entender cómo interactúas con nuestro contenido.</li>
                <li><strong>Meta (Facebook/Instagram):</strong> para mostrarte nuestros cursos y productos si nos sigues en redes.</li>
                <li><strong>YouTube:</strong> cuando incrustamos videos de tutoriales.</li>
              </ul>
              <p className="mt-2">
                Todas estas herramientas cumplen con las normativas internacionales de privacidad.
              </p>
            </div>

            {/* GESTIÓN DE COOKIES */}
            <div>
              <h2 className="font-serif text-xl font-bold text-white mb-3">🛠️ Tú decides: cómo gestionar las cookies</h2>
              <p>
                Al entrar por primera vez, te mostramos un aviso para que aceptes o configures las cookies 
                según tus preferencias. En cualquier momento puedes cambiar de opinión:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-stone-400">
                <li>Configurando las opciones de tu navegador (Chrome, Safari, Firefox).</li>
                <li>Eliminando las cookies almacenadas desde los ajustes de privacidad.</li>
                <li>Usando el panel de configuración que aparece en la esquina inferior izquierda (si está disponible).</li>
              </ul>
              <p className="mt-2">
                Ten en cuenta que si desactivas las cookies esenciales, algunas partes de la web pueden 
                no funcionar correctamente (como un espresso sin presión: no sale bien).
              </p>
            </div>

            {/* ACTUALIZACIONES Y CONTACTO */}
            <div>
              <h2 className="font-serif text-xl font-bold text-white mb-3">📜 Cambios en esta política</h2>
              <p>
                Así como perfeccionamos nuestras recetas de café, podemos actualizar esta política 
                para reflejar cambios legales o nuevas funcionalidades. Te avisaremos con un aviso visible 
                cuando haya modificaciones importantes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-white mb-3">📬 Contacto</h2>
              <p>
                Si tienes preguntas sobre nuestras cookies o sobre cómo tratamos tus datos, 
                escríbenos a{" "}
                <a href="mailto:privacidad@baristapro.com" className="text-amber-400 hover:text-amber-300 underline">
                  privacidad@baristapro.com
                </a>
                . Estaremos encantados de aclarar cualquier duda, con la misma dedicación 
                que ponemos en cada taza.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10"
          >
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-amber-600 to-orange-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            >
              ← Volver al inicio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CookiesPolicy
