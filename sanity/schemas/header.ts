import { defineField, defineType } from "sanity";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "logo",
      description: "TRID-INNOVATIONS LOGO",
    },
    {
      name: "menu",
      title: "Menu",
      type: "array",
      of: [{ type: "reference", to: { type: "menuItem" } }],
    },
  ],
});
