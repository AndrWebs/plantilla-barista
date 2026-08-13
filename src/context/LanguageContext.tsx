// ============================================
// CONTEXTO: LanguageContext
// ============================================
// Propósito: Proveer el idioma actual (es/en) a toda la app.
// Patrón: React Context + Diccionario de traducciones.
// Flujo:
//   1. LanguageProvider envuelve la app
//   2. useLanguage() devuelve { language, t(), toggleLanguage() }
//   3. t("clave") busca la traducción según el idioma activo
// ============================================

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Tipos de idioma disponibles
type Language = "es" | "en"

// Estructura del contexto
type LanguageContextType = {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string  // Función traductora: recibe clave, devuelve texto
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// ============================================
// DICCIONARIO DE TRADUCCIONES
// Cada clave tiene su versión en español e inglés
// ============================================
const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home":     { es: "Inicio",   en: "Home" },
  "nav.services": { es: "Servicios", en: "Services" },
  "nav.about":    { es: "Nosotros", en: "About" },
  "nav.pricing": { es: "Precios",   en: "Pricing" },
  "nav.contact": { es: "Contacto",  en: "Contact" },
  "nav.cta":     { es: "Comenzar Gratis", en: "Start Free" },
  
  //Formulario FORM
  "form.title":  { es: "titulo del formulario", en: "title of the form"},
  "form.subtitle":  { es: "subtitulo del formulario", en: "subtitle of the form"},
  "form.submit":  { es: "Enviar el formulario", en: "submit the form"},
  
 

  // Hero
  "hero.badge": { es: "Descubrir sabores de Vanguardia ",
                  en: " Cutting-Edge Technology" },
  "hero.title1": { es: "Impresionar a familia y amigos. ", 
                   en: "Transformation" },
  "hero.title2": { es: "Romper creencias ", 
                   en: "Break beliefs" },
  "hero.description": { es: "El secreto que cambia completamente el sabor del café.", 
                        en: "coffie es como preparar un buen cafe todos los dias " },
  "hero.cta1": { es: "Empieza Hoy", en: "Request Free Demo" },
  "hero.cta2": { es: "Ver Video ▶", en: "Watch Video ▶" },
  "hero.stat1": { es: "Clientes Activos", en: "Active Clients" },
  "hero.stat2": { es: "Satisfacción", en: "Satisfaction" },
  "hero.stat3": { es: "Soporte", en: "Support" },
  
  "hero.card.title": { es: "Descubre el Arte del Café de Especialidad ", 
                       en: "AI Optimization" },
  "hero.card.desc": { es: "Aprende paso a paso incluso si nunca has preparado un espresso.", 
                      en: "learn 1 to 1" },
  
  // Slider
  "slider.title": {es: "Conoce lo basico ", en: "Title of the Slider"},
  "slider.subtitle": {es: " sorprende a tus familiares con una nueva habilidad ", en: "Subtitle of the Slider"},
  "slider.desc": {es: "descripcion del Slider",en: "description to the Slider"},
  
  // Services
  "services.badge": { es: "⚡ Lo que hacemos mejor", en: "⚡ What We Do Best" },
  "services.title1": { es: "Servicios ", en: "Services " },
  "services.title2": { es: "que Impulsan Resultados", en: "that Drive Results" },
  "services.description": { 
    es: "Soluciones digitales completas diseñadas para hacer crecer tu negocio. Cada servicio está optimizado para maximizar tu retorno de inversión.", 
    en: "Complete digital solutions designed to grow your business. Each service is optimized to maximize your return on investment." 
  },
  "service1.title": { es: "Diseño Web Premium", en: "Premium Web Design" },
  "service1.desc": { 
    es: "Interfaces modernas y persuasivas que cautivan a tus visitantes desde el primer segundo. Diseño responsivo que se adapta a cualquier dispositivo.", 
    en: "Modern and persuasive interfaces that captivate your visitors from the first second. Responsive design that adapts to any device." 
  },
  "service2.title": { es: "Optimización de Velocidad", en: "Speed Optimization" },
  "service2.desc": { 
    es: "Tus páginas cargan en milisegundos. Optimizamos cada byte para que Google te ame y tus usuarios nunca esperen.", 
    en: "Your pages load in milliseconds. We optimize every byte so Google loves you and your users never wait." 
  },
  "service3.title": { es: "Automatización con IA", en: "AI Automation" },
  "service3.desc": { 
    es: "Integramos inteligencia artificial para automatizar tareas repetitivas, analizar datos y mejorar la experiencia de usuario.", 
    en: "We integrate artificial intelligence to automate repetitive tasks, analyze data and improve user experience." 
  },
  "service4.title": { es: "SEO y Marketing Digital", en: "SEO & Digital Marketing" },
  "service4.desc": { 
    es: "Posicionamos tu marca en los primeros resultados de Google. Estrategias probadas que aumentan tu tráfico orgánico.", 
    en: "We position your brand in Google's top results. Proven strategies that increase your organic traffic." 
  },
  "service5.title": { es: "Seguridad Avanzada", en: "Advanced Security" },
  "service5.desc": { 
    es: "Protegemos tu sitio contra amenazas con encriptación de grado militar, backups automáticos y monitoreo 24/7.", 
    en: "We protect your site against threats with military-grade encryption, automatic backups and 24/7 monitoring." 
  },
  "service6.title": { es: "Mantenimiento Continuo", en: "Continuous Maintenance" },
  "service6.desc": { 
    es: "Nos encargamos de que todo funcione perfecto. Actualizaciones, fixes y mejoras constantes sin que te preocupes.", 
    en: "We make sure everything runs perfectly. Updates, fixes and constant improvements without you worrying." 
  },
  "service.cta": { es: "Saber más", en: "Learn more" },
  "service.feature1.1": { es: "UX/UI Personalizado", en: "Custom UX/UI" },
  "service.feature1.2": { es: "Mobile First", en: "Mobile First" },
  "service.feature1.3": { es: "Animaciones Fluidas", en: "Fluid Animations" },
  "service.feature2.1": { es: "Core Web Vitals 100%", en: "Core Web Vitals 100%" },
  "service.feature2.2": { es: "Lazy Loading", en: "Lazy Loading" },
  "service.feature2.3": { es: "CDN Global", en: "Global CDN" },
  "service.feature3.1": { es: "Chatbots 24/7", en: "24/7 Chatbots" },
  "service.feature3.2": { es: "Análisis Predictivo", en: "Predictive Analytics" },
  "service.feature3.3": { es: "Personalización", en: "Personalization" },
  "service.feature4.1": { es: "Keywords Research", en: "Keywords Research" },
  "service.feature4.2": { es: "Link Building", en: "Link Building" },
  "service.feature4.3": { es: "Analytics", en: "Analytics" },
  "service.feature5.1": { es: "SSL Wildcard", en: "SSL Wildcard" },
  "service.feature5.2": { es: "Anti-DDoS", en: "Anti-DDoS" },
  "service.feature5.3": { es: "Backups Diarios", en: "Daily Backups" },
  "service.feature6.1": { es: "Updates Semanales", en: "Weekly Updates" },
  "service.feature6.2": { es: "Soporte 24/7", en: "24/7 Support" },
  "service.feature6.3": { es: "Monitoreo Pro", en: "Pro Monitoring" },

  // Stats
  "stats.title1": { es: "Números que ", en: "Numbers that " },
  "stats.title2": { es: "Hablan", en: "Speak" },
  "stats.desc": { es: "Resultados comprobables que respaldan nuestro trabajo", en: "Proven results that back our work" },
  "stat1.label": { es: "Proyectos Entregados", en: "Projects Delivered" },
  "stat2.label": { es: "Clientes Satisfechos", en: "Satisfied Clients" },
  "stat3.label": { es: "Usuarios Impactados", en: "Users Impacted" },
  "stat4.label": { es: "Experiencia", en: "Experience" },

  // Testimonials
  "testimonials.badge": { es: "⭐ Lo que dicen nuestros clientes", en: "⭐ What Our Clients Say" },
  "testimonials.title1": { es: "Clientes ", en: "Clients " },
  "testimonials.title2": { es: "Felices", en: "Happy" },
  "testimonials.desc": { 
    es: "No confíes en nuestra palabra, escucha lo que dicen quienes ya transformaron su negocio con nosotros.", 
    en: "Don't take our word for it, listen to what those who have already transformed their business with us say." 
  },

  // Pricing
  "pricing.badge": { es: "💎 Planes y Precios", en: "💎 Plans & Pricing" },
  "pricing.title1": { es: "Inversión ", en: "Investment " },
  "pricing.title2": { es: "Transparente", en: "Transparent" },
  "pricing.desc": { 
    es: "Sin costos ocultos. Elige el plan que mejor se adapte a tus necesidades y escala cuando estés listo.", 
    en: "No hidden costs. Choose the plan that best fits your needs and scale when you're ready." 
  },
  "plan1.name": { es: "Starter", en: "Starter" },
  "plan1.desc": { es: "Perfecto para empezar tu presencia digital.", en: "Perfect to start your digital presence." },
  "plan1.feature1": { es: "Landing Page Profesional", en: "Professional Landing Page" },
  "plan1.feature2": { es: "Formulario de Contacto", en: "Contact Form" },
  "plan1.feature3": { es: "Optimización SEO Básica", en: "Basic SEO Optimization" },
  "plan1.feature4": { es: "Hosting Incluido", en: "Hosting Included" },
  "plan1.feature5": { es: "Soporte por Email", en: "Email Support" },
  "plan1.feature6": { es: "1 Revisión Mensual", en: "1 Monthly Review" },
  "plan2.name": { es: "Profesional", en: "Professional" },
  "plan2.desc": { es: "La opción más popular para negocios en crecimiento.", en: "The most popular option for growing businesses." },
  "plan2.feature1": { es: "Hasta 5 Páginas Web", en: "Up to 5 Web Pages" },
  "plan2.feature2": { es: "Panel Administrativo", en: "Admin Panel" },
  "plan2.feature3": { es: "SEO Avanzado", en: "Advanced SEO" },
  "plan2.feature4": { es: "Integración con IA", en: "AI Integration" },
  "plan2.feature5": { es: "Soporte Prioritario 24/7", en: "24/7 Priority Support" },
  "plan2.feature6": { es: "Revisión Semanal", en: "Weekly Review" },
  "plan2.feature7": { es: "Analytics Avanzado", en: "Advanced Analytics" },
  "plan2.feature8": { es: "Email Marketing", en: "Email Marketing" },
  "plan3.name": { es: "Enterprise", en: "Enterprise" },
  "plan3.desc": { es: "Para empresas que necesitan soluciones a medida.", en: "For companies that need custom solutions." },
  "plan3.feature1": { es: "Páginas Ilimitadas", en: "Unlimited Pages" },
  "plan3.feature2": { es: "Desarrollo a Medida", en: "Custom Development" },
  "plan3.feature3": { es: "API Personalizada", en: "Custom API" },
  "plan3.feature4": { es: "Múltiples Integraciones", en: "Multiple Integrations" },
  "plan3.feature5": { es: "Gerente de Cuenta Dedicado", en: "Dedicated Account Manager" },
  "plan3.feature6": { es: "SLA Garantizado", en: "Guaranteed SLA" },
  "plan3.feature7": { es: "Backups Diarios", en: "Daily Backups" },
  "plan3.feature8": { es: "Consultoría Estratégica", en: "Strategic Consulting" },
  "plan3.feature9": { es: "White Label", en: "White Label" },
  "pricing.guarantee": { es: "🔒 Garantía de devolución de 30 días. Sin preguntas.", en: "🔒 30-day money-back guarantee. No questions asked." },
  "plan.cta1": { es: "Comenzar Gratis", en: "Start Free" },
  "plan.cta2": { es: "Elegir Plan", en: "Choose Plan" },
  "plan.cta3": { es: "Contactar Ventas", en: "Contact Sales" },
  "plan.badge": { es: "⭐ Más Popular", en: "⭐ Most Popular" },

  // FAQ
  "faq.badge": { es: "❓ Preguntas Frecuentes", en: "❓ Frequently Asked Questions" },
  "faq.title1": { es: "¿Tienes ", en: "Do You Have " },
  "faq.title2": { es: "Dudas?", en: "Questions?" },
  "faq.desc": { 
    es: "Respuestas claras a las preguntas más comunes. Si no encuentras lo que buscas, contáctanos directamente.", 
    en: "Clear answers to the most common questions. If you don't find what you're looking for, contact us directly." 
  },
  "faq.q1": { es: "¿Cuánto tiempo toma desarrollar mi página web?", en: "How long does it take to develop my website?" },
  "faq.a1": { 
    es: "Dependiendo de la complejidad, una landing page profesional puede estar lista en 5-7 días hábiles. Proyectos más complejos como e-commerce toman de 2 a 4 semanas. Siempre entregamos un MVP funcional en la primera semana.", 
    en: "Depending on complexity, a professional landing page can be ready in 5-7 business days. More complex projects like e-commerce take 2-4 weeks. We always deliver a functional MVP in the first week." 
  },
  "faq.q2": { es: "¿Puedo actualizar el contenido yo mismo?", en: "Can I update the content myself?" },
  "faq.a2": { 
    es: "¡Por supuesto! Todos nuestros proyectos incluyen un panel de administración intuitivo donde puedes modificar textos, imágenes y productos sin necesidad de conocimientos técnicos. Además, te capacitamos en su uso.", 
    en: "Of course! All our projects include an intuitive admin panel where you can modify texts, images and products without technical knowledge. We also train you in its use." 
  },
  "faq.q3": { es: "¿Ofrecen garantía o soporte después del lanzamiento?", en: "Do you offer warranty or support after launch?" },
  "faq.a3": { 
    es: "Sí. Todos los planes incluyen soporte técnico. El plan Profesional incluye soporte prioritario 24/7 y el plan Enterprise tiene un gerente de cuenta dedicado. Además, ofrecemos 30 días de garantía de satisfacción.", 
    en: "Yes. All plans include technical support. The Professional plan includes 24/7 priority support and the Enterprise plan has a dedicated account manager. We also offer a 30-day satisfaction guarantee." 
  },
  "faq.q4": { es: "¿Mi sitio web será responsive y funcionará en móviles?", en: "Will my website be responsive and work on mobile?" },
  "faq.a4": { 
    es: "Absolutamente. Diseñamos con enfoque Mobile First. Todos nuestros proyectos se ven y funcionan perfectamente en smartphones, tablets y desktop. Es parte de nuestro estándar de calidad.", 
    en: "Absolutely. We design with a Mobile First approach. All our projects look and work perfectly on smartphones, tablets and desktop. It's part of our quality standard." 
  },
  "faq.q5": { es: "¿Qué incluye el SEO que mencionan en los planes?", en: "What does the SEO mentioned in the plans include?" },
  "faq.a5": { 
    es: "El SEO básico incluye optimización de meta tags, estructura semántica HTML5, sitemap XML, optimización de velocidad y configuración de Google Search Console. El SEO avanzado añade investigación de keywords, optimización de contenido y link building.", 
    en: "Basic SEO includes meta tag optimization, HTML5 semantic structure, XML sitemap, speed optimization and Google Search Console setup. Advanced SEO adds keyword research, content optimization and link building." 
  },
  "faq.q6": { es: "¿Puedo migrar mi sitio actual a su plataforma?", en: "Can I migrate my current site to your platform?" },
  "faq.a6": { 
    es: "Sí, realizamos migraciones desde cualquier plataforma (WordPress, Wix, Shopify, etc.) sin perder tráfico ni posicionamiento SEO. El proceso incluye redirecciones 301 y preservación de URLs cuando es posible.", 
    en: "Yes, we perform migrations from any platform (WordPress, Wix, Shopify, etc.) without losing traffic or SEO positioning. The process includes 301 redirects and URL preservation when possible." 
  },
  "faq.q7": { es: "¿Qué pasa si necesito funcionalidades personalizadas?", en: "What if I need custom functionalities?" },
  "faq.a7": { 
    es: "Nuestro equipo de desarrollo puede crear cualquier funcionalidad a medida: sistemas de reservas, marketplaces, plataformas de aprendizaje, integraciones con APIs externas, etc. Conversamos tus necesidades y te damos una solución.", 
    en: "Our development team can create any custom functionality: booking systems, marketplaces, learning platforms, external API integrations, etc. We discuss your needs and give you a solution." 
  },
  "faq.q8": { es: "¿Cómo funciona el proceso de pago?", en: "How does the payment process work?" },
  "faq.a8": { 
    es: "Trabajamos con pagos mensuales sin contratos forzosos. Puedes cancelar en cualquier momento. Para proyectos grandes, ofrecemos un esquema 50% al inicio y 50% al finalizar. Aceptamos transferencias, tarjetas y PayPal.", 
    en: "We work with monthly payments without forced contracts. You can cancel at any time. For large projects, we offer a 50% upfront and 50% on completion scheme. We accept transfers, cards and PayPal." 
  },
  "faq.contact": { es: "¿No encontraste tu respuesta?", en: "Didn't find your answer?" },
  "faq.contact.link": { es: "Escríbenos ahora", en: "Write us now" },
  "faq.contact.promise": { es: "y te respondemos en menos de 2 horas.", en: "and we'll respond in less than 2 hours." },

  // CTA Final
  "cta.badge": { es: "Solo quedan 3 cupos este mes", en: "Only 3 spots left this month" },
  "cta.title1": { es: "¿Listo para ", en: "Ready to " },
  "cta.title2": { es: "Transformar", en: "Transform" },
  "cta.title3": { es: "tu Negocio?", en: "your Business?" },
  "cta.desc": { 
    es: "Únete a más de 500 empresas que ya están creciendo con nuestra tecnología. No esperes más, el momento es ahora.", 
    en: "Join over 500 companies that are already growing with our technology. Don't wait any longer, the time is now." 
  },
  "cta.button1": { es: "🚀 Comenzar Ahora Gratis", en: "🚀 Start Now for Free" },
  "cta.button2": { es: "📞 Agendar Llamada", en: "📞 Schedule a Call" },
  "cta.footnote": { es: "✨ Sin tarjeta de crédito • Cancela cuando quieras • 30 días de garantía", en: "✨ No credit card • Cancel anytime • 30-day guarantee" },

  // Footer
  "footer.title": { es: "¿Listo para transformar tu negocio?", en: "Ready to transform your business?" },
  "footer.desc": { es: "Únete a más de 500 empresas que ya confían en nosotros.", en: "Join over 500 companies that already trust us." },
  "footer.placeholder": { es: "tu@email.com", en: "your@email.com" },
  "footer.button": { es: "Enviar →", en: "Send →" },
  "footer.col1.title": { es: "Producto", en: "Product" },
  "footer.col2.title": { es: "Empresa", en: "Company" },
  "footer.col3.title": { es: "Soporte", en: "Support" },
  "footer.col4.title": { es: "Legal", en: "Legal" },
  "footer.copyright": { es: "© 2026 Elevate. Todos los derechos reservados.", en: "© 2026 Elevate. All rights reserved." },
}

// ============================================
// COMPONENTE: LanguageProvider
// ============================================
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {

    const saved = typeof window !== "undefined"
      ? localStorage.getItem("language") as Language | null
      : "es"

    return saved || "es"
  })

  useEffect(() => {
    localStorage.setItem("language", language)
    // Actualizar el atributo lang del HTML para SEO
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"))
  }

  // FUNCIÓN TRADUCTORA: Busca la clave en el diccionario
  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider")
  return context
}
