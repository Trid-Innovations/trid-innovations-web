import { Globe, Home, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Language } from "../types";
import { trackUserAction } from "../utils/analytics";
import { toggleLanguage } from "../utils/language";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleNavigation = (item: string) => {
    setIsMenuOpen(false);

    if (item === "services" || item === "contact") {
      trackUserAction.service(item);
    }

    // Use URL with hash fragment for navigation
    navigate(`/${lang}/#${item}`);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    trackUserAction.language(newLang);
    
    // Get the current path without the language prefix
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/[^\/]+/, '');
    
    // Navigate to the new path with the new language
    navigate(`/${newLang}${pathWithoutLang}`);
  };

  const menuItems = ["services", "about", "articles", "contact"];

  return (
    <header className="fixed top-10 z-40 w-full backdrop-blur-sm bg-white/90">
      <nav className="container flex justify-between items-center px-4 py-4 mx-auto">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate(`/${lang}`)}
        >
          <img src="/logo.png" alt="TRID INNOVATIONS" className="h-12" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-8 md:flex">
          <button
            onClick={() => navigate(`/${lang}`)}
            className="flex items-center capitalize transition-colors text-trid-teal hover:text-trid-lime"
          >
            {t("nav.home")}
          </button>
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item)}
              className="capitalize transition-colors text-trid-teal hover:text-trid-lime"
            >
              {t(`nav.${item}`)}
            </button>
          ))}
          <button
            onClick={() => handleLanguageChange(toggleLanguage(language))}
            className="flex items-center transition-colors text-trid-teal hover:text-trid-lime"
          >
            <Globe className="mr-1 w-5 h-5" />
            <span>{(language === "fr" ? "EN" : "FR")}</span>
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
        <div className="bg-white border-t md:hidden">
          <div className="container flex flex-col px-4 py-4 mx-auto space-y-4">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate(`/${lang}`);
              }}
              className="flex items-center capitalize transition-colors text-trid-teal hover:text-trid-lime"
            >
              <Home className="mr-1 w-5 h-5" />
              {t("nav.home")}
            </button>
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className="capitalize transition-colors text-trid-teal hover:text-trid-lime"
              >
                {t(`nav.${item}`)}
              </button>
            ))}
            <button
              onClick={() => {
                handleLanguageChange(toggleLanguage(language));
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <Globe className="w-4 h-4" />
              <span>{(language === "fr" ? "EN" : "FR")}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
