"use client";
import { useState } from "react";
import { LanguageContext } from "./languageContext";
import { Language, defaultLanguage } from "@/types/language.definition";

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
