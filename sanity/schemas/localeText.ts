import { defineType, defineField } from "sanity";

const supportedLanguages = [
  { id: "en", title: "English", isDefault: true },
  { id: "fr", title: "French" },
];

export const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default defineType({
  title: "Localized string",
  name: "localeText",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],

  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "text",
    // fieldset: lang.isDefault ? null : "translations",
  })),
});
