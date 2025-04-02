export interface Section {
  fr: {
    title: string;
    subtitle: string;
  };
  en: {
    title: string;
    subtitle: string;
  };
}

// export interface Service {
//   icon: string;
//   fr: {
//     title: string;
//     description: string[];
//   };
//   en: {
//     title: string;
//     description: string[];
//   };
// }

export type Language = "fr" | "en";

export interface LanguageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export interface TranslatedContent {
  fr?: string;
  en?: string;
}

export interface Article {
  id: string;
  title: TranslatedContent;
  summary: TranslatedContent;
  content: TranslatedContent;
  author: string;
  date: string;
  image: string;
  language?: Language;
  archived?: boolean;
  archivedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  restoredAt?: string | null;
}
