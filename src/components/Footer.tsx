import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Language } from "../types";

interface FooterProps {
  language: Language;
}

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/trid-innovations" },
  { icon: Mail, href: "mailto:contact@tridinnovations.com" },
];

const footerLinks = [
  { key: "services", items: ["technical", "integration", "custom"] },
  { key: "company", items: ["about", "articles", "contact"] },
];

const isServiceLink = (section: string, item: string) => {
  return section === "services";
};

export default function Footer({ language }: FooterProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleNavigation = useCallback(
    (section: string) => {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
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
                    {isServiceLink(section.key, item) ? (
                      <Link
                        to={`/services/${item}`}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {t(`footer.${section.key}.${item}`)}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleNavigation(item)}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {t(`footer.${section.key}.${item}`)}
                      </button>
                    )}
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
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TRID INNOVATIONS.{" "}
              {t("footer.rights")}
            </p>
            {/* <div className="flex space-x-8">
              {["privacy", "terms", "cookies"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t(`footer.legal.${item}`)}
                </a>
              ))}
            </div> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
