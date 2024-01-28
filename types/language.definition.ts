import { Dispatch, SetStateAction } from "react";

export type LanguageCode = (typeof LanguageEnum)[keyof typeof LanguageEnum];

export const LanguageEnum = {
  fr: "fr",
  en: "en",
};

export interface Language {
  code: LanguageCode;
  displayName: string;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export const defaultLanguage: Language = {
  code: "fr",
  displayName: "Français",
};
