// footerLink.js
export default {
  name: "footerLink",
  type: "object",
  title: "Footer Link",

  fields: [
    {
      type: "localeString",
      name: "title",
      title: "Title",
      description: "Footer item",
    },

    {
      type: "string",
      name: "url",
      title: "Url",
      description: "Url of the footer item",
    },
  ],
};
