import { defineField, defineType } from "sanity";

export default defineType({
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    {
      name: "description",
      title: "Description",
      type: "localeText",
    },
    {
      name: "image",
      title: "Image",
      description: "Company image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
