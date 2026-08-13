// components/VideoPaso.tsx
import VideoPaso from "@/components/VideoPaso"; // Nuestro cliente

const pasos = [
  { id: 1, src: '/videos/molido.webm', titulo: 'Molienda', desc: 'Fresco y con la textura justa' },
  { id: 2, src: '/videos/vertido.webm', titulo: 'Vertido', desc: 'Ángulo de 45° en espiral' },
  { id: 3, src: '/videos/extraccion.webm', titulo: 'Extracción', desc: 'Tiempo exacto de 3 min' },
];

export const BrewingProcess = () => {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-amber-50/50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-stone-800 mb-4">
          El ritual del café
        </h2>
        <p className="text-center text-stone-500 mb-12 max-w-md mx-auto">
          Cada paso cuenta una historia de sabor
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pasos.map((paso) => (
            <VideoPaso 
              key={paso.id}
              stepNumber={paso.id}
              src={paso.src}
              alt={paso.titulo}
              description={paso.desc}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
// src/components/VideoPaso.tsx
// ... todo el código del componente igual ...

export default VideoPaso;  // ← añade esta línea al final



