import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "copyRights",
      title: "CopyRights",
      description: "The copy rights of TRID-INNOVATIONS",
      type: "string",
    },
    {
      name: "TermsOfUse",
      title: "TermsOfUse",
      description: "The copy rights of TRID-INNOVATIONS",
      type: "string",
    },
  ],
});
