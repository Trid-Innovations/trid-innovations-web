import { sanityClient, revalidate } from "@/sanity";
import { HeaderData } from "@/types/typings";
import { groq } from "next-sanity";
export const fetchHeaderData = async () => {
  const headerData: HeaderData = await sanityClient.fetch(
    groq` 
  *[_type=="header"][0]{
    ...,
    logo,
    menu[]->
   
  }
  `
  );
  return headerData;
};
