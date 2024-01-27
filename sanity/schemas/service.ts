import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "The title of the service",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      description: "The description of the service",
      type: "localeString",
    },
    {
      name: "image",
      title: "Image",
      description: "The image of the service",
      type: "image",
    },
  ],
});
