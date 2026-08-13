"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import { useLanguage } from "../context/LanguageContext"

// ============================================
// LOGO: TAZA DE CAFÉ ANIMADA (CSS puro)
// ============================================
const CoffeeCupLogo = () => {
  return (
    <motion.div
      className="relative w-[48px] h-[48px] flex items-center justify-center"
      animate={{ rotate: [0, 3, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Plato */}
      <div className="absolute bottom-0 w-[40px] h-[6px] rounded-full bg-amber-700/60 shadow-md" />
      
      {/* Cuerpo de la taza */}
      <div 
        className="absolute bottom-[4px] w-[30px] h-[32px] rounded-b-xl"
        style={{
          background: "linear-gradient(135deg, #faf8f5 0%, #f5f0e8 40%, #e8d5b7 100%)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 4px rgba(255,255,255,0.5)",
        }}
      >
        {/* Café dentro */}
        <div 
          className="absolute top-1 left-1.5 right-1.5 h-[10px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, #5c2a1e, #3e1f14, #1a0c08)",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
          }}
        />
        {/* Crema */}
        <div 
          className="absolute top-1 left-1.5 right-1.5 h-[5px] rounded-full"
          style={{
            background: "linear-gradient(180deg, #d4a574, #c4956a)",
          }}
        />
        {/* Brillo */}
        <div className="absolute left-1 top-2 w-[6px] h-[20px] 
                        rounded-full bg-gradient-to-r from-white/40 
                        to-transparent" />
      </div>
      
      {/* Asa */}
      <div 
        className="absolute right-[2px] top-[8px] w-[12px] h-[18px]"
        style={{
          border: "4px solid transparent",
          borderRight: "4px solid #e8d5b7",
          borderRadius: "0 20px 20px 0",
          boxShadow: "1px 0 2px rgba(0,0,0,0.1)",
        }}
      />
      
      {/* Vapor del logo */}
      <motion.div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-[6px] bg-white/50 rounded-full blur-[1px]"
        animate={{ y: [-2, -10], opacity: [0.5, 0], scaleY: [1, 2.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-[1.5px] h-[5px] bg-white/40 rounded-full blur-[1px]"
        animate={{ y: [-2, -12], opacity: [0.4, 0], scaleY: [1, 3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
      />
    </motion.div>
  )
}

// ============================================
// NAVBAR PRINCIPAL
// ============================================
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.services"), href: "#services" },
    { name: "Tutoriales", href: "/tutoriales" },   // ← NUEVO
    { name: "Tienda", href: "/tienda" },          // ver la tienda
    { name: "Blog", href: "/blog" },             // ver los articulos
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.contact"), href: "#contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-950/90 backdrop-blur-md shadow-2xl shadow-amber-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* ============================================ */}
          {/* LOGO: TAZA DE CAFÉ + TEXTO                   */}
          {/* ============================================ */}
          <motion.a 
            href="https://go.hotmart.com/D84617070N"
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-[48px] h-[48px] rounded-full border-2 border-amber-500/30 shadow-lg shadow-amber-500/15 flex-shrink-0 flex items-center justify-center bg-stone-900/50 group-hover:border-amber-400/50 transition-all duration-300">
              <CoffeeCupLogo />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent leading-tight">
                BARISPRO
              </span>
              <span className="text-[10px] text-cyan-400 leading-tight 
                               tracking-wider">
                Escuela del Café
              </span>
            </div>
          </motion.a>

          {/* ============================================ */}
          {/* LINKS DE NAVEGACIÓN (DESKTOP)                 */}
          {/* ============================================ */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-stone-300 hover:text-amber-300 font-medium transition-colors relative group py-2"
              >
                {link.name}
                
                {/* ============================================ */}
                {/* LÍNEA INFERIOR COLOR CREMA DE CAFÉ           */}
                {/* ============================================ */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300 rounded-full" />
                
                {/* ============================================ */}
                {/* EFECTO VAPOR AL HACER HOVER                   */}
                {/* ============================================ */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-[2px] h-0 bg-amber-300/0 rounded-full blur-[1px] group-hover:h-[8px] group-hover:bg-amber-300/40 transition-all duration-500" />
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-[1px] h-0 bg-amber-200/0 rounded-full blur-[1px] group-hover:h-[12px] group-hover:bg-amber-200/30 transition-all duration-700 delay-75" />
              </a>
            ))}

            {/* Toggles */}
            <LanguageToggle />
            <ThemeToggle />

            {/* ============================================ */}
            {/* BOTÓN CTA CON FORMA DE TAZA ANTIGUA          */}
            {/* ============================================ */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-amber-600 to-orange-500 px-6 py-2.5 rounded-b-full rounded-t-2xl font-semibold text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 overflow-hidden group"
            >
              {/* Brillo superior de la taza */}
              <div className="absolute top-0 left-2 right-2 h-[3px] bg-white/20 rounded-full" />
              
              {/* Vapor del botón */}
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-[2px] h-0 bg-white/0 rounded-full group-hover:h-[10px] group-hover:bg-white/30 transition-all duration-500" />
              <span className="absolute -top-2 left-1/3 -translate-x-1/2 w-[1.5px] h-0 bg-white/0 rounded-full group-hover:h-[14px] group-hover:bg-white/20 transition-all duration-600 delay-100" />
              
              {/* Texto */}
              <span className="relative z-10 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {t("nav.cta")}
              </span>
            </motion.button>
          </div>

          {/* ============================================ */}
          {/* BOTÓN MENÚ MOBILE (HAMBURGUESA)              */}
          {/* ============================================ */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-stone-300 focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ============================================ */}
      {/* MENÚ MOBILE DESPLEGABLE                       */}
      {/* ============================================ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-950/95 backdrop-blur-md 
                       border-t border-amber-500/10"
          >
            <div className="px-6 py-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-stone-300 hover:text-amber-300 
                             font-medium py-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-4 py-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-500 
                           px-6 py-3 rounded-b-full rounded-t-2xl 
                           font-semibold text-white"
              >
                {t("nav.cta")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar




