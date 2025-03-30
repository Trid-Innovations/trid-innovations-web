import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Link, useNavigate } from "react-router-dom";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/trid-innovations" },
  { icon: Mail, href: "mailto:contact@tridinnovations.com" },
];

const footerLinks = [
  { key: "services", items: ["technical", "integration", "custom"] },
  { key: "company", items: ["about", "articles", "contact"] },
];

const isServiceLink = (section: string) => {
  if (section === "services") {
    return true;
  }
  return false;
};

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleNavigation = useCallback(
    (section: string) => {
      // Use URL anchors for navigation
      navigate(`/#${section}`);
    },
    [navigate]
  );

  return (
    <footer className="py-12 text-white bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-8 md:grid-cols-3"
        >
          {/* Company Info */}
          <div className="space-y-4">
            <span>TRID INNOVATIONS</span>
            <p className="text-sm text-gray-400">{t("footer.description")}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-white"
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
              <h3 className="mb-4 text-lg font-semibold text-trid-lime">
                {t(`footer.${section.key}.title`)}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    {isServiceLink(section.key) ? (
                      <Link
                        to={`/services/${item}`}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
                      >
                        {t(`footer.${section.key}.${item}`)}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleNavigation(item)}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
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
          className="pt-8 mt-12 border-t border-gray-800"
        >
          <div className="flex flex-col justify-center items-center space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} TRID INNOVATIONS.{" "}
              {t("footer.rights")}
            </p>
            {/* <div className="flex space-x-8">
              {["privacy", "terms", "cookies"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
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
