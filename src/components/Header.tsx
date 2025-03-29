import { Globe, Home, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Language } from "../types";
import { trackUserAction } from "../utils/analytics";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleNavigation = (item: string) => {
    setIsMenuOpen(false);

    if (item === "services" || item === "contact") {
      trackUserAction.service(item);
    }

    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(item);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(item);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const menuItems = ["services", "about", "articles", "contact"];

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-40 top-10">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo.svg" alt="TRID INNOVATIONS" className="h-12" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigate("/")}
            className="text-trid-teal hover:text-trid-lime transition-colors flex items-center capitalize"
          >
            <Home className="w-5 h-5 mr-1" />
            {t("nav.home")}
          </button>
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item)}
              className="text-trid-teal hover:text-trid-lime transition-colors capitalize"
            >
              {t(`nav.${item}`)}
            </button>
          ))}
          <button
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            className="flex items-center text-trid-teal hover:text-trid-lime transition-colors"
          >
            <Globe className="w-5 h-5 mr-1" />
            {language.toUpperCase()}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-trid-teal"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/");
              }}
              className="text-trid-teal hover:text-trid-lime transition-colors flex items-center capitalize"
            >
              <Home className="w-5 h-5 mr-1" />
              {t("nav.home")}
            </button>
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className="text-trid-teal hover:text-trid-lime transition-colors capitalize"
              >
                {t(`nav.${item}`)}
              </button>
            ))}
            <button
              onClick={() => {
                setLanguage(language === "fr" ? "en" : "fr");
                setIsMenuOpen(false);
              }}
              className="flex items-center text-trid-teal hover:text-trid-lime transition-colors"
            >
              <Globe className="w-5 h-5 mr-1" />
              {language.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
