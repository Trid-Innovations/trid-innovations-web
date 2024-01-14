import { type SchemaTypeDefinition } from "sanity";
import header from "../sanity/schemas/header";
import footer from "../sanity/schemas/footer";
import social from "../sanity/schemas/social";
import localeString from "../sanity/schemas/localeString";
import logo from "../sanity/schemas/logo";
import menu from "../sanity/schemas/menu";
import page from "../sanity/schemas/page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, footer, header, social, localeString, logo, menu],
};
