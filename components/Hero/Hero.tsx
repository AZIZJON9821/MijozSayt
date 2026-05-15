"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const t = useTranslations("Hero");
  const typingTexts = t.raw("typing") as string[];
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = typingTexts[currentIndex];
      
      if (isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setSpeed(50);
      } else {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, typingTexts, speed]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-4xl text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
        >
          {t("title")}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-2xl md:text-4xl font-light mb-12 h-10 text-neon-blue"
        >
          {displayText}
          <span className="animate-pulse ml-1">|</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a 
            href="#contact" 
            className="px-8 py-4 bg-neon-blue text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all transform hover:scale-105 inline-block"
          >
            {t("cta")}
          </a>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
