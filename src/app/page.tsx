"use client"

import Navbar from "@/components/Navbar"
//import SliderSection from "@/components/SliderSection"
import Services from "@/components/Services"
//import Stats from "@/components/Stats"
//import Testimonials from "@/components/Testimonials"
//import FAQ from "@/components/FAQ"
//import CTAFinal from "@/components/CTAFinal"
import Footer from "@/components/Footer"
//import CustomCursor from "@/components/CustomCursor"
//import FloatingMenu from "@/components/FloatingMenu"
import Loader from "@/components/Loader"
//import LeadsDashboard from "@/components/LeadsDashboard"
//import PWAInstallPrompt from "@/components/PWAInstallPrompt"
import Hero1 from "@/components/Hero1"
//import Hero2 from "@/components/Hero2"
//import Hero3 from "@/components/Hero3"
//import SliderSection2 from "@/components/SliderSection2"
// app/tu-ruta/page.js (Esto es un Server Component, ¡sin problema!)
//import TutorialesSection from "@/components/TutorialesSection"
import ArticulosCafe from "@/components/ArticulosCafe"
//import InfoCafeGrafico from "@/components/InfoCafeGrafico"

export default function Home() {
  return (
    <main className="bg-slate-900 text-white">
      <Loader />
      {/*<CustomCursor />*/}
      <Navbar />
      <Hero1 />
      {/*<SliderSection2 />*/}
      {/*<InfoCafeGrafico /> */}
      <ArticulosCafe />
      {/*<TutorialesSection />*/}
      {/*<SliderSection />*/}
      <Services />
      {/*<Stats />*/}
      {/*<Testimonials />*/}
      {/*<FAQ />*/}
      {/*<CTAFinal />*/}
      <Footer />
      {/*<FloatingMenu />*/}
      {/*<LeadsDashboard />*/}
      {/*<PWAInstallPrompt />*/}
    </main>
  )
}
