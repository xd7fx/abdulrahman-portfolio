"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL = "abdulrahman.alnashri9@gmail.com";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    // If no access key configured, fall back to opening the user's mail client.
    if (!accessKey) {
      const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
      const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio contact from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status !== "idle") setStatus("idle");
  };

  const inputCls =
    "w-full px-4 py-3 rounded-lg bg-space-navy/50 border border-space-cyan/30 focus:border-space-cyan focus:outline-none focus:ring-2 focus:ring-space-cyan/50 transition-all";

  return (
    <section id="contact" className="py-12 relative overflow-hidden z-[1]">
      <SectionPlanet planet="baren" size={420} position="right" />
      <div className="container mx-auto px-4 relative z-[2]">
        <SectionHeader title={t("contactTitle")} subtitle={t("contactSubtitle")} />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-lg text-space-ice/80 max-w-2xl mx-auto">{t("contactDescription")}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="card-glow">
                <h3 className="text-2xl font-orbitron font-bold mb-6 text-space-cyan">{t("contactInfo")}</h3>

                <div className="space-y-4">
                  <motion.a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-space-navy/30 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-space-cyan/20 flex items-center justify-center group-hover:bg-space-cyan/30 transition-colors">
                      <Mail className="w-6 h-6 text-space-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-space-ice/70">{t("email")}</p>
                      <p className="font-semibold break-all">{EMAIL}</p>
                    </div>
                  </motion.a>

                  <motion.div className="flex items-center gap-4 p-4 rounded-lg" whileHover={{ x: 5 }}>
                    <div className="w-12 h-12 rounded-full bg-space-cyan/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-space-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-space-ice/70">{t("location")}</p>
                      <p className="font-semibold">{t("saudiArabia")}</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="card-glow">
                <h3 className="text-xl font-orbitron font-bold mb-4 text-space-cyan">{t("connectWithMe")}</h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/XD7FX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-space-navy/50 flex items-center justify-center hover:bg-space-cyan/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/abdulrahman-alnashri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-space-navy/50 flex items-center justify-center hover:bg-space-cyan/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="card-glow" noValidate>
                <h3 className="text-2xl font-orbitron font-bold mb-6 text-space-cyan">{t("sendMessage")}</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className={inputCls}
                      placeholder={t("yourName")}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className={inputCls}
                      placeholder={t("yourEmail")}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t("message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${inputCls} resize-none`}
                      placeholder={t("yourMessage")}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={status === "sending" ? undefined : { scale: 1.02 }}
                    whileTap={status === "sending" ? undefined : { scale: 0.98 }}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>{t("sending")}</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>{t("send")}</span>
                      </>
                    )}
                  </motion.button>

                  <div role="status" aria-live="polite" className="min-h-[1.5rem]">
                    {status === "success" && (
                      <p className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle2 size={16} />
                        {t("messageSent")}
                      </p>
                    )}
                    {status === "error" && (
                      <p className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle size={16} />
                        {t("messageError")}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
