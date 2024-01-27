// footerSection.js
export default {
  name: "footerColumn",
  type: "object",
  title: "Footer Column",
  fields: [
    {
      type: "localeString",
      name: "title",
      title: "Title",
    },
    {
      type: "array",
      name: "links",
      title: "Links",
      of: [{ type: "footerLink" }],
    },
  ],
};
