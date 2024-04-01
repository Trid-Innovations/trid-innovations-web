import { sanityClient, revalidate } from "@/sanity";
import { PageInfo } from "@/types/typings";
import { groq } from "next-sanity";
export const fetchPageInfo = async () => {
  const pageInfo: PageInfo = await sanityClient.fetch(
    groq` 
  *[_type=="homePage"][0]`,
    { revalidate: revalidate }
  );
  return pageInfo;
};
