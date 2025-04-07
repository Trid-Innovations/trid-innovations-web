import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { handleContactClick } from "../utils/contact";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="relative h-[85vh] md:h-[70vh] flex items-center bg-gradient-to-br from-trid-teal via-trid-teal-light to-trid-lime pt-36 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80')] bg-cover bg-center opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/90 mb-8"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#contact"
            onClick={(e) => handleContactClick(e, navigate, lang)}
            className="inline-flex items-center px-6 py-3 text-white rounded-lg bg-gradient-to-r from-trid-teal to-trid-lime-light hover:from-trid-teal-dark hover:to-trid-lime transition-all duration-300 cursor-pointer relative"
          >
            {t("hero.cta")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
