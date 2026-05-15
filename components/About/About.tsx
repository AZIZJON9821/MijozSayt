"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code, Bot, Cpu } from "lucide-react";

export default function About() {
  const t = useTranslations("About");

  const skills = [
    { icon: <Code className="w-8 h-8 text-neon-blue" />, title: t("web") },
    { icon: <Bot className="w-8 h-8 text-neon-purple" />, title: t("bots") },
    { icon: <Cpu className="w-8 h-8 text-neon-cyan" />, title: t("api") },
  ];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 neon-text">
              {t("title")}
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-12">
              {t("description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="glass p-8 flex flex-col items-center text-center group transition-all"
              >
                <div className="mb-4 transform transition-transform group-hover:scale-110">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-bold">{skill.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
