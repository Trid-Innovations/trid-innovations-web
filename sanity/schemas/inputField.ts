// footerSection.js
export default {
  name: "inputField",
  type: "document",
  title: "Input Field",
  fields: [
    {
      type: "string",
      name: "name",
      title: "Name",
    },
    {
      type: "localeString",
      name: "label",
      title: "Label",
    },
    {
      type: "array",
      name: "validations",
      title: "Validations",
      of: [{ type: "reference", to: { type: "inputValidation" } }],
    },
  ],
};
