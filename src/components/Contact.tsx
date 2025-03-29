import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { ToastContainer } from "react-toastify";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-trid-teal mb-16 text-center">
            {t("contact.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info Column */}
            <ContactInfo inView={inView} />
            {/* Contact Form Column */}
            <ContactForm inView={inView} />
          </div>
          <ToastContainer position="bottom-right" />
        </motion.div>
      </div>
    </section>
  );
}
