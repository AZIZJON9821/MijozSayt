"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Layers, Zap, ShieldCheck } from "lucide-react";

export default function Services() {
  const t = useTranslations("Services");

  const services = [
    {
      icon: <Layers className="w-10 h-10 text-neon-blue" />,
      title: t("webDev"),
      description: t("webDevDesc"),
      color: "from-neon-blue/20 to-transparent"
    },
    {
      icon: <Zap className="w-10 h-10 text-neon-purple" />,
      title: t("tgBots"),
      description: t("tgBotsDesc"),
      color: "from-neon-purple/20 to-transparent"
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-neon-cyan" />,
      title: t("apiSystems"),
      description: t("apiSystemsDesc"),
      color: "from-neon-cyan/20 to-transparent"
    }
  ];

  return (
    <section id="services" className="py-24 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative overflow-hidden glass p-10 border-t-2 border-white/5 bg-gradient-to-br ${service.color}`}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>
              
              {/* Corner Accent */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
