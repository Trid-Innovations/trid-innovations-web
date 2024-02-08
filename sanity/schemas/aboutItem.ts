import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutItem",
  title: "About Item",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "The title of the menu",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      description: "The description of the  item",
      type: "localeText",
    },
  ],
});
