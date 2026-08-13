import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog de Tecnología Digital | Elevate",
  description: "Artículos sobre desarrollo web, marketing digital, IA y transformación digital para impulsar tu negocio.",
}

const posts = [

  {
    slug: "monetizar-ia-sin-programar",
    title: "Cómo monetizar la IA sin ser programador en 2026",
    description: "Descubre 5 formas reales de generar ingresos con Inteligencia Artificial sin saber programar. Herramientas gratuitas y casos reales.",
    date: "Julio 2026",
    category: "IA & Negocios",
    readTime: "7 min de lectura",
  },


  {
    slug: "primer-articulo",
    title: "Por qué la IA transformará tu negocio en 2026",
    description: "Descubre cómo la Inteligencia Artificial está cambiando las reglas del juego para las pequeñas y medianas empresas.",
    date: "Julio 2026",
    category: "Inteligencia Artificial",
    readTime: "5 min de lectura",
  },
]

export default function BlogPage() {
  return (
    <section className="min-h-screen bg-slate-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Blog de Tecnología
          </span>
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Artículos, tutoriales y casos de estudio sobre tecnología digital, marketing e IA.
        </p>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-slate-800/50 border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-0.5 rounded-full text-xs">
                  {post.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-400">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
