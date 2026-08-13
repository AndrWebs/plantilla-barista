"use client"

import { motion } from "framer-motion"
import Link from "next/link"

// ============================================
// DATOS DE SERVICIOS (ahora con link)
// ============================================
const services = [
  {
    icon: "☕",
    title: "Curso de Barista Profesional",
    description: ["Domina el espresso, la texturización de leche y ",
                  "el latte art con técnicas de campeones mundiales."
                 ],
    description1: [" Como la forma de acabar con el estres y crear una", 
                   " bebida excelente y que se pueda degustar",
                   " para tu caso una habilidad que puedes volver un negocio"
                  ],
    features: ["Certificación incluida", 
               "Práctica intensiva", 
               "Materiales y café explicados"
              ],
    
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-300/10",
    borderColor: "border-amber-100",
    link: "https://go.hotmart.com/D84617070N",  // ← NUEVO: enlace interno
    cta:"quiero saber un poco mas :)",
  },
  {
    icon: "🎨",
    title: "Latte Art Avanzado",
    description: [ "Aprende a crear rosettas, tulipanes y cisnes.",
                   " Técnicas de vertido libre y etching."
                 ],
    features: ["Rosetta perfecta", 
               "Tulipanes 3D", 
               "Etching avanzado"
              ],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-300",
    link: "/tutoriales",  // ← NUEVO
    cta:"Mas latte Art",
  },
  {
    icon: "🌱",
    title: "Tueste y Origen del Café",
    description:["Conoce los orígenes del café, perfiles de tueste y", 
                 " selección de granos premium."
                ],
    description1:["Es un primer paso",                
                 " como parte del proceso "
                ],
    features: ["Cata de orígenes", "Perfiles de tueste", "Selección de granos"],
    color: "from-green-700 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-100",
    link: "/tutoriales",  // ← NUEVO
    cta:"Un buen proceso con calidad = buenos resultados.",
  },
  {
    icon: "🏪",
    title: "Monta tu Cafetería",
    description: "Guía completa para emprender: plan de negocio, maquinaria y diseño del local.",
    features: ["Plan de negocio", "Selección de equipo", "Diseño de interiores"],
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    link: "https://go.hotmart.com/D84617070N?dp=1",  // ← NUEVO
  },
  {
    icon: "🫖",
    title: "Métodos de Filtrado",
    description: "V60, Chemex, Aeropress, French Press. Domina cada método de extracción.",
    features: ["V60 avanzado", "Chemex perfecto", "Aeropress campeón"],
    color: "from-stone-500 to-stone-700",
    bgColor: "bg-stone-500/10",
    borderColor: "border-stone-500/20",
    link: "/cursos/metodos-filtrado",  // ← NUEVO
  },
  {
    icon: "🏆",
    title: "Certificación SCA",
    description: "Prepárate para la certificación internacional de la Specialty Coffee Association.",
    features: ["Reconocimiento mundial", "Examen oficial", "Temario completo"],
    color: "from-amber-600 to-yellow-500",
    bgColor: "bg-amber-600/10",
    borderColor: "border-amber-600/20",
    link: "https://go.hotmart.com/D84617070N",  // ← NUEVO
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const Services = () => {
  return (
    <section id="services" className="py-24 px-6 relative overflow-hidden bg-stone-950">
      {/* Fondos decorativos */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-amber-500/15 text-amber-300 px-4 py-2 
                       rounded-full text-sm font-semibold mb-4 
                       border border-amber-500/20"
          >
            ⚡ Nuestros Servicios
          </motion.span>
          
          <h2 className="font-serif text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Formación </span>
            <span className="bg-gradient-to-r 
                             from-amber-400 via-orange-400 to-amber-100 
                             bg-clip-text text-transparent">
              Profesional
            </span>
          </h2>
          
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Cursos diseñados por baristas campeones para llevar tus habilidades 
            al siguiente nivel.
          </p>
        </motion.div>

        {/* Grid de Servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative bg-stone-800/50 backdrop-blur-sm border ${service.borderColor} rounded-2xl p-8 hover:bg-stone-800/80 transition-all duration-300`}
            >
              {/* Efecto hover gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              {/* Contenido */}
              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Título */}
                <h3 className="font-serif text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>

                {/* Descripción */}
                <p className="text-stone-400 mb-6 leading-relaxed">
                  {service.description} 
                </p>
                
                {/* Descripción1 */}
                <p className="text-amber-200 mb-6 leading-relaxed">
                  {service.description1}
                </p>


                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-stone-300">
                      <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-xs`}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* ============================================ */}
                {/* BOTÓN "SABER MÁS" CON ENLACE REAL            */}
                {/* ============================================ */}
                <Link
                  href={service.link}
                  className={`mt-6 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent flex items-center gap-2 group/link`}
                >
                  {service.cta}
                  
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    + →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services
