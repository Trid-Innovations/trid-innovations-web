import { Language } from "../types";

export const toggleLanguage = (currentLang: Language): Language => {
  return currentLang === "fr" ? "en" : "fr";
};

const LANGUAGE_KEY = 'trid_language';

export const getStoredLanguage = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LANGUAGE_KEY);
};

export const setStoredLanguage = (language: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANGUAGE_KEY, language);
};

export const removeStoredLanguage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LANGUAGE_KEY);
};

export const getLanguageFromPathname = (pathname: string): Language | null => {
  // Extract the first part of the path after the leading slash
  const match = pathname.match(/^\/([^/]+)/);
  const lang = match ? match[1] : null;
  
  // Return the language if it's valid, otherwise return null
  return (lang === 'fr' || lang === 'en') ? lang : null;
};

export const getInitialLanguage = (pathname: string): Language => {
  // First try to get language from pathname
  const pathnameLanguage = getLanguageFromPathname(pathname);
  if (pathnameLanguage) {
    return pathnameLanguage;
  }

  // If no language in pathname, try stored language
  const storedLanguage = getStoredLanguage();
  if (storedLanguage === 'fr' || storedLanguage === 'en') {
    return storedLanguage;
  }

  // Default to French
  return 'fr';
}; 
