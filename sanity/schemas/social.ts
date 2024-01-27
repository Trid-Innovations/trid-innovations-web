import { defineField, defineType } from "sanity";

export default defineType({
  name: "social",
  title: "Social",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Platform for for social media",
      type: "string",
    },
    {
      name: "url",
      title: "Url",
      type: "url",
    },
    {
      name: "logo",
      title: "Logo",
      description: "Social logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
