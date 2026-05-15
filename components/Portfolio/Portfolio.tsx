"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Portfolio() {
  const t = useTranslations("Portfolio");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/portfolio/1rasm.jpeg",
    "/portfolio/2rasm.jpeg",
    "/portfolio/3rasm.jpeg"
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="portfolio" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          {t("title")}
        </h2>

        {/* Carousel Container */}
        <div className="relative group max-w-5xl mx-auto h-[400px] md:h-[600px]">
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setSelectedImage(images[currentIndex])}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Portfolio ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10 text-3xl font-black text-white/90">
                  PROJECT 0{currentIndex + 1}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-neon-blue hover:text-black transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-neon-blue hover:text-black transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === i ? "bg-neon-blue w-8" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 p-4 text-white hover:text-neon-blue">
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <Image
                src={selectedImage}
                alt="Selected project"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
