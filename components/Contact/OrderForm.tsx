"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function OrderForm() {
  const t = useTranslations("Order");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    budget: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", description: "", budget: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="glass p-8 md:p-12 relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center neon-text">
            {t("title")}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">{t("name")}</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">{t("phone")}</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                  placeholder="+998 90 123 45 67"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">{t("description")}</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all resize-none"
                placeholder="Loyiha haqida..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">{t("budget")}</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                placeholder="1000$"
              />
            </div>

            <button
              disabled={status === "loading"}
              type="submit"
              className="w-full bg-neon-blue text-black font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="animate-spin" />
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send size={20} />
                  {t("submit")}
                </>
              )}
            </button>
          </form>

          {/* Popups */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-20"
              >
                <CheckCircle2 size={80} className="text-green-500 mb-6 animate-bounce" />
                <h3 className="text-2xl font-bold mb-2">{t("success")}</h3>
                <p className="text-white/60">Tez orada siz bilan bog'lanamiz.</p>
              </motion.div>
            )}
            
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-20"
              >
                <AlertCircle size={80} className="text-red-500 mb-6" />
                <h3 className="text-2xl font-bold mb-2">{t("error")}</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
