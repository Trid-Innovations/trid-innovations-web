import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of About page",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      type: "localeText",
    },
    {
      name: "members",
      title: "Members",
      type: "array",
      of: [{ type: "reference", to: { type: "member" } }],
    },
    {
      name: "items",
      title: "items",
      type: "array",
      of: [{ type: "aboutItem" }],
    },
  ],
});
