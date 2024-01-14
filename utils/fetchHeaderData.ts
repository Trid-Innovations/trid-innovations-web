import { sanityClient, revalidate } from "@/sanity";
import { HeaderData } from "@/typings";
import { groq } from "next-sanity";
export const fetchHeaderData = async () => {
  const headerData: HeaderData = await sanityClient.fetch(
    groq` 
  *[_type=="header"][0]
  `,
    { next: { revalidate } }
  );
  console.log({ headerData });
  return headerData;
};
