import { motion } from "framer-motion";
import { Facebook, Linkedin, Mail, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/tridinnovations" },
  { icon: Twitter, href: "https://twitter.com/tridinnovations" },
  { icon: Linkedin, href: "https://linkedin.com/company/tridinnovations" },
  { icon: Mail, href: "mailto:contact@tridinnovations.com" },
];

const footerLinks = [
  { key: "services", items: ["technical", "integration", "custom"] },
  { key: "company", items: ["about", "team", "contact"] },
  { key: "legal", items: ["privacy", "terms", "cookies"] },
];

export default function Footer() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <div className="space-y-4">
            <span>TRID INNOVATIONS</span>
            <p className="text-gray-400 text-sm">{t("footer.description")}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.key}>
              <h3 className="text-lg font-semibold mb-4 text-trid-lime">
                {t(`footer.${section.key}.title`)}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {t(`footer.${section.key}.${item}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TRID INNOVATIONS.{" "}
              {t("footer.rights")}
            </p>
            <div className="flex space-x-8">
              {["privacy", "terms", "cookies"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t(`footer.legal.${item}`)}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
