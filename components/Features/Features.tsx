"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

export default function Features() {
  const t = useTranslations("Features");
  
  const features = [
    {
      id: "services",
      title: t("webTitle"),
      subtitle: t("webSubtitle"),
      description: t("webDesc"),
      desktopImage: "/portfolio/1rasm.jpeg",
      mobileImage: "/portfolio/4rasm.jpeg",
      reverse: false,
    },
    {
      id: "portfolio",
      title: t("botTitle"),
      subtitle: t("botSubtitle"),
      description: t("botDesc"),
      desktopImage: "/portfolio/2rasm.jpeg",
      mobileImage: "/portfolio/5rasm.jpeg",
      reverse: true,
    },
    {
      id: "api",
      title: t("apiTitle"),
      subtitle: t("apiSubtitle"),
      description: t("apiDesc"),
      desktopImage: "/portfolio/3rasm.jpeg",
      mobileImage: "/portfolio/6rasm.jpeg",
      reverse: false,
    }
  ];

  return (
    <div className="bg-black">
      {features.map((feature, index) => (
        <FeatureSection key={index} feature={feature} index={index} orderBtnText={t("orderBtn")} />
      ))}
    </div>
  );
}

function FeatureSection({ feature, index, orderBtnText }: { feature: any, index: number, orderBtnText: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section 
      id={feature.id}
      ref={containerRef}
      className="relative h-[100dvh] w-full flex items-center overflow-hidden scroll-mt-20"
    >
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ scale }} className="relative w-full h-full">
          {/* Desktop Image */}
          <Image
            src={feature.desktopImage}
            alt={feature.title}
            fill
            className="hidden md:block object-cover object-center"
            priority={index === 0}
          />
          {/* Mobile Image */}
          <Image
            src={feature.mobileImage}
            alt={feature.title}
            fill
            className="block md:hidden object-cover object-center"
            priority={index === 0}
          />
          
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-black/40 md:bg-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/60 to-transparent ${feature.reverse ? 'md:rotate-180' : ''} opacity-95 md:opacity-85`} />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10 pt-10 md:pt-20">
        <motion.div 
          style={{ opacity }}
          className={`flex flex-col ${feature.reverse ? 'md:items-end md:text-right md:ml-auto' : 'md:items-start md:text-left'} max-w-2xl gap-3 md:gap-4`}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs mb-1 block"
          >
            {feature.subtitle}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter mb-2 md:mb-4 text-white uppercase"
          >
            {feature.title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-base md:text-lg lg:text-xl text-white/80 md:text-white/60 leading-relaxed mb-6 md:mb-8 max-w-xl font-medium md:font-normal"
          >
            {feature.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`flex ${feature.reverse ? 'md:justify-end' : 'md:justify-start'}`}
          >
            <a href="#contact" className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-cyan-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] text-sm md:text-base"
              >
                {orderBtnText}
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/20">
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-cyan-500/50 to-transparent" />
        <span className="text-[7px] md:text-[8px] uppercase tracking-widest font-bold">Scroll</span>
      </div>
    </section>
  );
}
