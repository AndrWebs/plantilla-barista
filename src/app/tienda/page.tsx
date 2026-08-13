import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Tienda de Café Profesional | Barista Pro",
  description: "Descubre los mejores instrumentos para barista profesional. Máquinas de espresso, molinillos, prensas francesas y más. Compra en Amazon con nuestros enlaces de afiliado.",
  keywords: "tienda café, máquina espresso, molinillo café, prensa francesa, accesorios barista, café especialidad",
}

// ============================================
// DATOS DE PRODUCTOS (Amazon Afiliados)
// ============================================
const products = [
  {
    id: 1,
    name: "Máquina de Espresso Profesional",
    description: "Máquina de espresso semiautomática con bomba de 15 bares, vaporizador de leche y termómetro integrado. Perfecta para uso doméstico y pequeñas cafeterías.",
    price: "$299.99",
    rating: "4.7 ★ (2,345 reseñas)",
    image: "https://m.media-amazon.com/images/I/71kpxVx3rjL._AC_SL1500_.jpg",
    amazonLink: "https://www.amazon.com/dp/B08XYZ1234?tag=TU-AFILIADO-ID",
    category: "Máquinas",
    badge: "🔥 Más Vendido",
  },
  {
    id: 2,
    name: "Molinillo de Café Burr",
    description: "Molinillo de muelas cónicas con 40 ajustes de molienda. Ideal para espresso, prensa francesa y filtrado. Motor de bajo ruido y tolva de 250g.",
    price: "$149.99",
    rating: "4.5 ★ (1,890 reseñas)",
    image: "https://m.media-amazon.com/images/I/61xT2B8XjML._AC_SL1500_.jpg",
    amazonLink: "https://www.amazon.com/dp/B08XYZ5678?tag=TU-AFILIADO-ID",
    category: "Molinillos",
    badge: "",
  },
  {
    id: 3,
    name: "Prensa Francesa de Acero Inoxidable",
    description: "Prensa francesa de doble pared con filtro de malla fina. Mantiene el café caliente por más tiempo. Capacidad 1 litro (8 tazas).",
    price: "$49.99",
    rating: "4.6 ★ (3,210 reseñas)",
    image: "https://m.media-amazon.com/images/I/71rOq4JKMPL._AC_SL1500_.jpg",
    amazonLink: "https://www.amazon.com/dp/B08XYZ9012?tag=TU-AFILIADO-ID",
    category: "Filtrado",
    badge: "⭐ Recomendado",
  },
  {
    id: 4,
    name: "Kit de Arte Latte Profesional",
    description: "Set completo de 3 jarras de acero inoxidable (350ml, 600ml, 900ml) con picos de precisión. Incluye termómetro digital y plantillas de etching.",
    price: "$79.99",
    rating: "4.8 ★ (987 reseñas)",
    image: "https://m.media-amazon.com/images/I/71nKx2XJqQL._AC_SL1500_.jpg",
    amazonLink: "https://www.amazon.com/dp/B08XYZ3456?tag=TU-AFILIADO-ID",
    category: "Kits",
    badge: "🏆 Top Ventas",
  },
  {
    id: 5,
    name: "Báscula Digital de Precisión",
    description: "Báscula con temporizador integrado, precisión de 0.1g y bandeja antideslizante. Ideal para pesar café y controlar el tiempo de extracción.",
    price: "$39.99",
    rating: "4.4 ★ (1,567 reseñas)",
    image: "https://m.media-amazon.com/images/I/61yUXPmKoHL._AC_SL1500_.jpg",
    amazonLink: "https://www.amazon.com/dp/B08XYZ7890?tag=TU-AFILIADO-ID",
    category: "Accesorios",
    badge: "",
  },
  {
    id: 6,
    name: "Tamper de Café Calibrado",
    description: "Tamper de acero inoxidable con resorte calibrado a 30 libras de presión. Base plana de 58mm. Mango ergonómico de madera de nogal.",
    price: "$34.99",
    rating: "4.6 ★ (2,134 reseñas)",
    image: "https://m.media-amazon.com/images/I/61MyK6a7laL._AC_SL1500_.jpg",
    amazonLink: "https://www.amazon.com/dp/B08XYZ2345?tag=TU-AFILIADO-ID",
    category: "Accesorios",
    badge: "",
  },
  {
    id: 7,
    name: "Cafetera Chemex Clásica",
    description: "Cafetera de vidrio borosilicato con capacidad para 6 tazas. Diseño icónico premiado. Filtros incluidos. Perfecta para café filtrado limpio.",
    price: "$44.99",
    rating: "4.7 ★ (4,567 reseñas)",
    image: "https://m.media-amazon.com/images/I/51lYiVaJ4oL._AC_SL1500_.jpg",
    amazonLink: "https://www.amazon.com/dp/B08XYZ6789?tag=TU-AFILIADO-ID",
    category: "Filtrado",
    badge: "",
  },
  {
    id: 8,
    name: "Set de Tazas de Café de Cerámica",
    description: "Juego de 4 tazas de cerámica artesanal con platillo. Capacidad 180ml. Aptas para microondas y lavavajillas. Diseño italiano.",
    price: "$29.99",
    rating: "4.3 ★ (876 reseñas)",
    image: "https://m.media-amazon.com/images/I/71xGHmnTvvL._AC_SL1500_.jpg",
    amazonLink: "https://www.amazon.com/dp/B08XYZ0123?tag=TU-AFILIADO-ID",
    category: "Vajilla",
    badge: "",
  },
]

// Categorías únicas para filtrar
const categories = ["Todos", ...new Set(products.map((p) => p.category))]

export default function TiendaPage() {
  return (
    <section className="min-h-screen bg-stone-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/15 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-500/20">
            🛒 Tienda Oficial
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">Instrumentos </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              de Café Profesional
            </span>
          </h1>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Equipa tu cafetería o tu hogar con las mejores herramientas seleccionadas por baristas profesionales.
            Todos los productos son enlaces de afiliado de Amazon.
          </p>
        </div>

        {/* Grid de productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-stone-800/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 flex flex-col"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </div>
              )}

              {/* Imagen del producto */}
              <div className="relative h-56 bg-white/5 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Información del producto */}
              <div className="p-5 flex flex-col flex-1">
                {/* Categoría */}
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {product.category}
                </span>

                {/* Nombre */}
                <h3 className="font-serif text-lg font-bold text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <p className="text-yellow-400 text-sm mb-2">{product.rating}</p>

                {/* Descripción */}
                <p className="text-stone-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* Precio */}
                <div className="text-2xl font-black text-white mb-4 mt-auto">
                  {product.price}
                </div>

                {/* Botón de Amazon Afiliado */}
                <a
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-black font-bold py-3 px-4 rounded-xl text-center hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  Comprar en Amazon
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                {/* Disclaimer */}
                <p className="text-stone-600 text-xs text-center mt-2">
                  Enlace de afiliado · Ganas una comisión sin costo extra
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer general */}
        <div className="mt-12 p-6 bg-stone-800/50 border border-white/5 rounded-2xl text-center">
          <p className="text-stone-400 text-sm">
            🛒 <strong>Barista Pro</strong> participa en el Programa de Afiliados de Amazon. 
            Como Afiliado de Amazon, ganamos una comisión por compras elegibles sin costo adicional para ti.
            Esto nos ayuda a mantener nuestro contenido gratuito y de calidad.
          </p>
        </div>

        {/* Botón volver */}
        <div className="text-center mt-10">
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