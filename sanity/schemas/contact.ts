import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of Contact page",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      type: "localeText",
    },
    {
      name: "buttonLabel",
      title: "Button Label",
      type: "localeString",
    },
    {
      name: "emailLabel",
      title: "email Label",
      type: "localeString",
    },
    {
      name: "inputs",
      title: "Inputs",
      type: "array",
      of: [{ type: "reference", to: { type: "inputField" } }],
    },
  ],
});
