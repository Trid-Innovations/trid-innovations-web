import { sanityClient, revalidate } from "@/sanity";
import { Service } from "@/types/typings";
import { groq } from "next-sanity";

export const fetchServices = async () => {
  const services: Service[] = await sanityClient.fetch(
    groq`
  *[_type=="service"]
  `,

    { revalidate: revalidate }
  );
  return services;
};
