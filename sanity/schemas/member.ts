import { defineField, defineType } from "sanity";

export default defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      description: "The name of the member",
      type: "string",
    },
    {
      name: "title",
      title: "title",
      description: "The title of the member",
      type: "localeString",
    },
    {
      name: "picture",
      title: "Picture",
      description: "The picture of the member",
      type: "image",
    },
    {
      type: "array",
      name: "socials",
      title: "Socials",
      of: [{ type: "social" }],
    },
  ],
});
