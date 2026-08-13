"use client"

import { motion } from "framer-motion"

// ============================================
// DATOS DE LOS 3 ARTÍCULOS INFOGRÁFICOS
// ============================================
const articulos = [
  {
    id: 1,
    titulo: "Lo que para muchos es simplemente tomar cafe. ",
    descripcion: "para un barista es comprender un arte donde cada pequeño detalle, tiene el poder de cambiar el resultado final", 
    datos: [
      { clave: "En la temperatura del agua. ☕ Cambio casi imperceptible en el tiempo de extracción", 
        valor: "Una variación en la molienda, pocos grados de diferencia" },
      { clave: "De reprende, La misma bolsa de café puede revelar sabores distintos.", 
        valor: "Descubres que preparar café no consiste únicamente en seguir una receta." },
      { clave: "Es entender, cómo crear una experiencia que despierte los sentidos,", 
        valor: "Sorprenda a quienes la prueban y convierta una bebida cotidiana en un momento inolvidable." },
    ],
    imagen: "/slider/cafe.png", // ← cambia por tu imagen real
    lado: "derecha", // ← imagen a la derecha, texto a la izquierda
    colorAcento: "from-amber-500 to-orange-500",
    icono: "☕",
  },
  {
    id: 2,
    titulo: "La Ciencia del Espresso",
    descripcion: "El espresso es el corazón de la cafetería moderna. ",
    descripcion1: " Una extracción precisa que combina presión, temperatura y tiempo para obtener una bebida intensa y equilibrada.",
    datos: [
      
      { clave: "18 gramos de café recién molido. Consejo: Utiliza una báscula digital. Un gramo de diferencia puede cambiar el sabor.",
        valor: "1. Pesa el café: coloca en el portafiltro:"}, 
        
      { clave: "La molienda debe ser fina, con una textura parecida al azúcar de mesa Si el café está demasiado grueso, el agua pasará muy rápido y obtendrás una bebeida ácida y poco equilibrada.",
        valor: "2. Muele correctamente" },
      
      { clave: "Después, utiliza un tramper para prensarlo con una presión firme y uniforme. Sin fuerza excesiva; lo importante es dejarlo nivelado  y compacto donde el agua lo atraviese nivelado", 
        valor: "3. Distribuye y Prensa el café de manera uniforme dentro del portafiltro." },
    ],
    imagen: "/slider/caf5.png", // ← cambia por tu imagen real
    lado: "derecha", // ← imagen a la derecha, texto a la izquierda
    colorAcento: "from-amber-500 to-orange-500",
    icono: "☕",
  },

  {
    id: 3,
    titulo: "4. inicia la extracción",
    descripcion: "Coloca el portafiltro en la máquina e inicia la extracción inmediatamente",
    descripcion1: "Comenzamos buscando estos valores: Una relacion 1:2 (18g - 36g) Es la referencia utilizada para calibrar un espresso.",
    datos: [
      
      { clave: "Bebida odtenida: 36g",
        valor: "Café molido: 18g"}, 
        

      { clave: "25 a 30 segundos en tiempo de extraccion",
        valor: "Temperatura del agua: 92 a 94 ºC" },

      { clave: "Después podrás ajustarla según el café y el perfil de sabor que BUSQUES. ",
        valor: "Presión de la Máquina: 9 Bares" },
    ],
    imagen: "/slider/cafe12.png", // ← cambia por tu imagen real
    lado: "izquierda", // ← imagen a la derecha, texto a la izquierda
    colorAcento: "from-amber-500 to-orange-500",
    icono: "☕",
  },

  {
    id: 4,
    titulo: "5. Observa la crema: Un buen expresso suele presentar una crema de color avellana con tonos dorados",
    descripcion: "Debe verse uniforme y persistir durante unos instantes, aunque la crema por sí sola no garantiza que el espresso esté perfectamente preparado.",
    descripcion1:"Ahora el momento mas importante: Prueba el café. no busques únicamente si está fuerte. pregúntate: ",
    datos: [
      { clave: "¿Tiene buena acidez?", valor: "¿Es dulce?" },
      { clave: "¿Qué aromas puedes identificar?", valor: "¿Está amargo o equilibrado" },
      { clave: "la taza le está diciendo.", valor: "Es lo que busacamos : Aprender a interpretar lo que" },
    ],
    imagen: "/slider/cafe6.png", // ← cambia por tu imagen real
    lado: "izquierda", // ← imagen a la izquierda, texto a la derecha
    colorAcento: "from-orange-500 to-red-500",
    icono: "🎨",
  },


  {
    id: 5,
    titulo: "El Arte del Latte",
    descripcion: "Texturizar la leche hasta obtener una microespuma sedosa es el secreto para crear figuras perfectas en la superficie del café. Un equilibrio entre ciencia y creatividad.",
    datos: [
      { clave: "Temperatura", valor: "60-65°C" },
      { clave: "Ángulo", valor: "45°" },
      { clave: "Técnica", valor: "Vertido libre" },
    ],
    imagen: "/slider/caf8.png", // ← cambia por tu imagen real
    lado: "izquierda", // ← imagen a la izquierda, texto a la derecha
    colorAcento: "from-orange-500 to-red-500",
    icono: "🎨",
  },
  {
    id: 6,
    titulo: "La Pureza del Filtrado",
    descripcion: "Los métodos de filtrado como V60 o Chemex resaltan las notas más delicadas del café. Un proceso limpio que produce una taza aromática y sin sedimentos.",
    datos: [
      { clave: "Ratio", valor: "1:16" },
      { clave: "Molienda", valor: "Media-gruesa" },
      { clave: "Tiempo", valor: "2:30-3:00 min" },
    ],
    imagen: "/slider/caf5.png", // ← cambia por tu imagen real
    lado: "derecha", // ← imagen a la derecha, texto a la izquierda
    colorAcento: "from-yellow-500 to-amber-500",
    icono: "🫖",
  },
  {
    id: 7,
    titulo: "¿Que passaría si el resultado no fuera el esperado?",
    descripcion: "Un barista no adivina el problema. Lo identifica y lo corrige.",
    descripcion1: "",
    datos: [
      { clave: "1. Sale en menos de 20 segundos.  2. Sale en mas de 35s.  3. Sabor muy ácido.  4.  Sabor muy amargo.", 
        valor: "Si ocurre esto..." },
      { clave: "1. Molienda muy gruesa. 2. Molienda muy fina.  3. Subextracción.  4. Sobreextracción", 
        valor: "Probablemente significa..." },
      { clave: "Con solo 4 números: 18g,  36g,  25s<==>30s,  92ºC <==> 94ºC", 
        valor: "¿Te das cuenta?" },
    ],
    imagen: "/slider/cafe9.png", // ← cambia por tu imagen real
    lado: "derecha", // ← imagen a la derecha, texto a la izquierda
    colorAcento: "from-yellow-500 to-amber-500",
    icono: "🫖",
  },


]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const ArticulosCafe = () => {
  return (
    <section className="py-10 px-6 relative overflow-hidden bg-stone-950">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-transparent to-stone-950" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Encabezado de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-amber-700 text-white-100 
                           px-4 py-2 rounded-full text-sm 
                           font-script mb-2 border border-amber-500/20">
            📚 ¿y si te dijéramos que durante años has conocido solo una pequeña 
            parte de este increíble universo?
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-black mb-2">
            <span className="text-white">Tu primer Espresso Profesional en 5 pasos. </span>
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 
                             bg-clip-text text-transparent">
              Solo debes controlar cuatro variables: 
            </span>
            <p className="bg-gradient-to-r from-amber-200 via-orange-800 to-amber-100 
                          bg-clip-text text-transparent">
              Cantidad de café, molienda, tiempo y rendimiento.
            </p>
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Detrás de cada taza existe una historia que comienza mucho antes 
            de llegar a tus manos. Un viaje que atraviesa montañas, climas únicos, 
            variedades de café, procesos de cultivo, técnicas de tostión y métodos 
            de preparación capaces de transformar por completo la experiencia 
            de quien la disfruta.
          </p>
        </motion.div>

        {/* Artículos en zigzag */}
        <div className="space-y-4 md:space-y-4">
          {articulos.map((articulo, index) => {
            // Determinar si la imagen va a la derecha o izquierda
            const esDerecha = articulo.lado === "derecha"

            return (
              <motion.div
                key={articulo.id}
                initial={{ opacity: 0, x: esDerecha ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={`flex flex-col ${esDerecha ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10 items-center`}
              >
                
                {/* ============================================ */}
                {/* COLUMNA DE TEXTO                              */}
                {/* ============================================ */}
                <div className="w-full md:w-[55%]">
                  <div className="bg-stone-800/50 backdrop-blur-sm 
                                  border border-amber-500/10 rounded-2xl 
                                  p-2 md:p-8 hover:border-amber-500/20 
                                  transition-all duration-300">
                    
                    {/* Icono del artículo */}
                    <span className="text-4xl block mb-4">{articulo.icono}</span>

                    {/* Título con fuente elegante */}
                    <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-4">
                      {articulo.titulo}
                    </h3>

                    {/* Descripción del artículo */}
                    <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-6">
                      {articulo.descripcion}
                    </p>
                    
                    {/* Descripción1 del artículo */}
                    <p className="text-amber-150 text-base md:text-lg leading-relaxed mb-6">
                      {articulo.descripcion1}
                    </p>

                    {/* Datos destacados con fuente decorativa */}
                    <div className="grid grid-cols-3 gap-4">
                      {articulo.datos.map((dato, i) => (
                        <div key={i} className="text-center">
                          <div className={`text-lg md:text-xl font-script 
                                           text-amber-400`}>
                            {dato.valor}
                          </div>
                          <div className="text-amber-200 text-2xs font-sans 
                                          tracking-wider mt-1">
                            {dato.clave}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Línea decorativa */}
                    <div className={`w-16 h-1 bg-gradient-to-r ${articulo.colorAcento} rounded-full mt-6`} />
                  </div>
                </div>

                {/* ============================================ */}
                {/* COLUMNA DE IMAGEN                             */}
                {/* ============================================ */}
                <div className="w-full md:w-[45%] flex-shrink-0">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 group">
                    {/* Imagen ajustable al contenedor */}
                    <img
                      src={articulo.imagen}
                      alt={articulo.titulo}
                      className="w-full h-auto object-contain rounded-2xl 
                                 transition-transform duration-500 
                                 group-hover:scale-115"
                      loading="lazy"
                    />
                    
                    {/* Overlay sutil al hover */}
                    <div className="absolute inset-0 bg-gradient-to-t 
                                    from-white/10 to-transparent opacity-0 
                                    group-hover:opacity-100 transition-opacity 
                                    duration-300" />
                    
                    {/* Borde decorativo */}
                    <div className={`absolute inset-0 rounded-4xl border-2 border-transparent bg-gradient-to-br ${articulo.colorAcento} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} 
                      style={{ WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} 
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ArticulosCafe
