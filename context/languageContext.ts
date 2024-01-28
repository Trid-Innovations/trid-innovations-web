import {
  LanguageContextType,
  defaultLanguage,
} from "@/types/language.definition";
import { createContext } from "react";

export const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
});
