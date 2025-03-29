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

export interface Service {
  icon: string;
  fr: {
    title: string;
    description: string[];
  };
  en: {
    title: string;
    description: string[];
  };
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  language: Language;
}

export type Language = 'fr' | 'en';