import { Language } from "../types";

export const getLanguageAwarePath = (path: string, lang: Language): string => {
  // Remove any leading slash to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${lang}/${cleanPath}`;
};

export const getLanguageAwareHashPath = (hash: string, lang: Language): string => {
  // Remove any leading slash or hash to avoid double slashes/hashes
  const cleanHash = hash.startsWith('/') ? hash.slice(1) : hash;
  const cleanHashWithoutHash = cleanHash.startsWith('#') ? cleanHash.slice(1) : cleanHash;
  return `/${lang}/#${cleanHashWithoutHash}`;
}; 