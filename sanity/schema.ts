import { type SchemaTypeDefinition } from "sanity";
import header from "../sanity/schemas/header";
import footer from "../sanity/schemas/footer";
import social from "../sanity/schemas/social";
import localeString from "../sanity/schemas/localeString";
import logo from "../sanity/schemas/logo";
import menuItem from "./schemas/menuItem";
import localeText from "./schemas/localeText";
import homePage from "./schemas/homePage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePage,
    footer,
    header,
    social,
    localeString,
    logo,
    menuItem,
    localeText,
  ],
};
