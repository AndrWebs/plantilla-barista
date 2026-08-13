import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Tutoriales de Café Premium | Barista Pro",
  description: "Aprende a preparar café de especialidad con nuestros tutoriales paso a paso. Métodos V60, Chemex, Espresso, Latte Art y más. GIFs explicativos.",
  keywords: "tutoriales café, preparar café premium, V60, Chemex, espresso, latte art, café de especialidad, barista",
}

// Datos de los tutoriales (añade todos los que quieras)
const tutoriales = [
  {
    id: 1,
    titulo: "Espresso Perfecto en 5 Pasos",
    descripcion: "Aprende a calibrar tu molinillo, dosificar, tampear y extraer el espresso perfecto con crema espesa y sabor balanceado.",
    gif: "/tutorials/espresso.gif", // Reemplaza con tu GIF
    pasos: [
      "Moler 18g de café fresco a granulometría fina",
      "Distribuir y tamper con presión uniforme (15kg)",
      "Extraer 36g de espresso en 25-30 segundos",
      "Observar la crema: debe ser espesa y color avellana",
      "Ajustar molienda si el tiempo de extracción no es el correcto"
    ],
    nivel: "Intermedio",
    duracion: "3 min",
    link:"https://www.wwe.com",
  },
  {
    id: 2,
    titulo: "Método V60: El Filtrado Perfecto",
    descripcion: "Domina la técnica de vertido en espiral y la importancia de la temperatura del agua para un café limpio y aromático.",
    gif: "/tutorials/v60.gif",
    pasos: [
      "Calentar agua a 92°C y enjuagar el filtro de papel",
      "Agregar 20g de café molido medio (como sal de mesa)",
      "Hacer un hueco en el centro y verter 40g de agua para la preinfusión (30 seg)",
      "Verter el resto del agua (300g) en espiral suave",
      "El goteo debe terminar a los 2:30-3:00 minutos"
    ],
    nivel: "Principiante",
    duracion: "4 min",
  },
  {
    id: 3,
    titulo: "Latte Art: Corazón y Rosetta",
    descripcion: "Texturiza la leche correctamente y aprende a verter un corazón perfecto y una rosetta clásica.",
    gif: "/tutorials/latte-art.gif",
    pasos: [
      "Usar leche entera fría (4°C) y una jarra de acero inoxidable",
      "Introducir vapor hasta que la leche alcance 60-65°C",
      "Golpear y girar la jarra para eliminar burbujas",
      "Verter desde altura para integrar, luego acercar el pico",
      "Para el corazón: verter en el centro y cortar al final"
    ],
    nivel: "Avanzado",
    duracion: "5 min",
  },
  {
    id: 4,
    titulo: "Chemex: Elegancia y Pureza",
    descripcion: "Prepara café para varios comensales con este método de filtrado total que resalta las notas florales del café de especialidad.",
    gif: "/slider/cafe15.png",
    pasos: [
      "Colocar filtro cuadrado con triple capa hacia el pico",
      "Enjuagar filtro con agua caliente y desechar el agua",
      "Agregar 30g de café molido medio-grueso",
      "Preinfusión con 60g de agua durante 45 segundos",
      "Verter el resto del agua (500g) en etapas, esperando que drene"
    ],
    nivel: "Principiante",
    duracion: "4 min",
  },
]

export default function TutorialesPage() {
  return (
    <section className="min-h-screen bg-stone-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/15 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-500/20">
            🎓 Tutoriales Premium
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">Preparación de </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Café de Especialidad
            </span>
          </h1>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Aprende paso a paso las técnicas de los campeones mundiales. 
            GIFs explicativos para que no te pierdas ningún detalle.
          </p>
        </div>

        {/* Grid de tutoriales */}
        <div className="grid md:grid-cols-2 gap-8">
          {tutoriales.map((tutorial) => (
            <div
              key={tutorial.id}
              className="bg-stone-800/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 group"
            >
              {/* GIF animado */}
              <div className="relative w-full h-64 bg-black/30 flex items-center justify-center overflow-hidden">
                <img
                  src={tutorial.gif}
                  alt={tutorial.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlay con nivel y duración */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="bg-black/70 backdrop-blur-sm text-amber-300 text-xs font-medium px-3 py-1 rounded-full">
                    {tutorial.nivel}
                  </span>
                  <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                    ⏱ {tutorial.duracion}
                  </span>
                </div>
              </div>

              {/* Información */}
              <div className="p-6">
                <h2 className="font-serif text-2xl font-bold text-white mb-3">
                  {tutorial.titulo}
                </h2>
                <p className="text-stone-400 mb-4 leading-relaxed">
                  {tutorial.descripcion}
                </p>

                {/* Lista de pasos */}
                <div className="bg-stone-900/50 rounded-xl p-4 mb-4">
                  <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">
                    Pasos a seguir
                  </h3>
                  <ol className="space-y-2">
                    {tutorial.pasos.map((paso, i) => (
                      <li key={i} className="flex gap-3 text-stone-300 text-sm">
                        <span className="text-amber-400 font-bold flex-shrink-0">
                          {i + 1}.
                        </span>
                        {paso}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Botón (opcional: podría enlazar a un artículo más detallado) */}
                <Link
                  href={`/blog/${tutorial.id}`}
                  className="inline-flex items-center gap-2 
                             text-amber-400 hover:text-amber-300 
                             font-semibold text-sm transition-colors"
                >
                  Ver tutorial completo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Botón volver */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block bg-stone-800 hover:bg-stone-700 text-white px-8 py-3 rounded-full font-bold transition-all"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
