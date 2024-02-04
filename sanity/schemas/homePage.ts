import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "HomePage",
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
      name: "introduction",
      title: "Introduction",
      type: "localeText",
    },
    {
      name: "heroButtonLabel",
      title: "Hero Button Label",
      type: "localeString",
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
