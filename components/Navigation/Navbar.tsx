"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { name: t("about"), href: "#about" },
    { name: t("services"), href: "#services" },
    { name: t("portfolio"), href: "#portfolio" },
    { name: t("contact"), href: "#contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-black/50 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
          Hushkordik
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {["uz", "ru", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold transition-all",
                  locale === lang ? "bg-white text-black" : "text-white/40 hover:text-white"
                )}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 mt-4">
                {["uz", "ru", "en"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      toggleLanguage(lang);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-lg border border-white/10 text-white",
                      locale === lang ? "border-white bg-white/10" : ""
                    )}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
