import { defineField, defineType } from "sanity";

export default defineType({
  name: "logo",
  title: "Logo",
  type: "document",
  fields: [
    {
      name: "mobile",
      title: "Mobile",
      description: "Mobile logo",
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
