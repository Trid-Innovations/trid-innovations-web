import { sanityClient, revalidate } from "@/sanity";
import { AboutData } from "@/types/typings";
import { groq } from "next-sanity";

export const fetchAboutData = async () => {
  const aboutData: AboutData = await sanityClient.fetch(
    groq` 
    *[_type == "about"][0] {
      ...,
      members[]->{
        ...,
        socials[]{
          ...,
          _type == 'social' => {
            ...,
            platform->{  // Assuming 'platform' is a field within 'social'
              ...
            },
            url
          }
        }
      }
    }`,
    { revalidate: revalidate }
  );
  return aboutData;
};
