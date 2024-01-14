import { defineField, defineType } from "sanity";

export default defineType({
  name: "menuItem",
  title: "MenuItem",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "The title of the menu",
      type: "localeString",
    },
  ],
});
