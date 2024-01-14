import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId, useCdn } from "./sanity/env";

export const config = {
  dataset: dataset,
  projectId: projectId,
  apiVersion: apiVersion,
  useCdn: useCdn,
};

console.log({ config });
export const sanityClient = createClient(config);
export const revalidate = 10;
export const urlFor = (source: any) => {
  return createImageUrlBuilder(config).image(source);
};
