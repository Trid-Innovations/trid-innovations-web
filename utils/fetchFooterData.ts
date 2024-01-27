import { sanityClient, revalidate } from "@/sanity";
import { FooterData } from "@/typings";
import { groq } from "next-sanity";
export const fetchFooterData = async () => {
  const aboutData: FooterData = await sanityClient.fetch(
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
      `,
    { next: { revalidate } }
  );
  return aboutData;
};
