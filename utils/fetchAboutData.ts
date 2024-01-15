import { sanityClient, revalidate } from "@/sanity";
import { AboutData } from "@/typings";
import { groq } from "next-sanity";
export const fetchAboutData = async () => {
  const aboutData: AboutData = await sanityClient.fetch(
    groq` 
  *[_type=="about"][0] {
    ...,
    members[]->
   
  }`,
    { next: { revalidate } }
  );
  return aboutData;
};
