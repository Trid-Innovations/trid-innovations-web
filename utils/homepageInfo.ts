import { sanityClient, revalidate } from "@/sanity";
import { PageInfo } from "@/typings";
import { groq } from "next-sanity";
export const fetchPageInfo = async () => {
  const pageInfo: PageInfo = await sanityClient.fetch(
    groq` 
  *[_type=="homePage"][0]`,
    { next: { revalidate } }
  );
  return pageInfo;
};
