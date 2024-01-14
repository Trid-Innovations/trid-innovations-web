import { defineField, defineType } from "sanity";

export default defineType({
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "The title of the menu",
      type: "string",
    },
  ],
});
