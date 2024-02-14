import { sanityClient, revalidate } from "@/sanity";
import { FooterData } from "@/types/typings";
import { groq } from "next-sanity";
export const fetchFooterData = async () => {
  const footerData: FooterData = await sanityClient.fetch(
    groq` 
    *[_type == 'footer'][0] {
        ...,
        columns[]{
          ...,
          target->{title, slug, _id},
          links[]{
            ...,
            target->{title, slug, _id},
            children[]{
              ...,
              target->{title, slug, _id}
            }
          }
        }
      }
      `
  );
  return footerData;
};
