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
      type: "localeString",
    },
    {
      name: "termsOfUse",
      title: "TermsOfUse",
      description: "Terms of use of TRID-INNOVATIONS",
      type: "localeString",
    },
    {
      name: "privacyPolicy",
      title: "PrivacyPolicy",
      description: "Privacy policy of TRID-INNOVATIONS",
      type: "localeString",
    },
    {
      type: "array",
      name: "columns",
      title: "columns",
      of: [{ type: "footerColumn" }],
    },
    {
      type: "array",
      name: "socials",
      title: "Socials",
      of: [{ type: "social" }],
    },
  ],
});
