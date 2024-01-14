import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "accueil",
      title: "Accueil",
      description: "",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "desktop",
      title: "Desktop",
      description: "Desktop logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
