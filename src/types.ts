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

export interface Article {
  id: string;
  title: string;
  summary: string;
  author: string;
  content: string;
  date: string | number;
  language: string;
  archived?: boolean;
  archivedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  restoredAt?: string | null;
  image: string;
}

export type Language = "fr" | "en";
