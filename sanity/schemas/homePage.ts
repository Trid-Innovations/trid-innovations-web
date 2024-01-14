import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "homePage",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the home page",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      type: "localeText",
    },
    {
      name: "heroImage",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
