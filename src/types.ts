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
  author: string;
  date: number | string;
  language: string;
  content: string;
}

export type Language = "fr" | "en";
