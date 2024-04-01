import { sanityClient, revalidate } from "@/sanity";
import { ContactData } from "@/types/typings";
import { groq } from "next-sanity";
export const fetchContactData = async () => {
  const contactData: ContactData = await sanityClient.fetch(
    groq` 
  *[_type=="contact"][0] {
    ...,
    inputs[]->{
      ...,
        validations[]->{
          ...,
          
        }
    }
   
  }`,

    { revalidate: revalidate }
  );
  return contactData;
};
