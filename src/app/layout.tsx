import type { Metadata } from "next"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Barista Pro - Escuela de Café Profesional",
  description: "Aprende el arte del café con los mejores baristas. Cursos de espresso, latte art, tueste y certificación SCA.",
  keywords: "barista, café, latte art, espresso, curso barista, certificación SCA, café de especialidad",
  authors: [{ name: "Barista Pro" }],
  openGraph: {
    title: "Barista Pro - Escuela de Café Profesional",
    description: "Aprende el arte del café con los mejores baristas.",
    url: "https://tusitio.com",
    type: "website",
    images: [{ url: "https://tusitio.com/og-image.jpg", width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Fuentes profesionales: Playfair Display (títulos) + Inter (textos) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        
      </head>
      <body className="bg-stone-950 text-white antialiased font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
