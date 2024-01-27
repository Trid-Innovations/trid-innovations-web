import { sanityClient, revalidate } from "@/sanity";
import { Service } from "@/typings";
import { groq } from "next-sanity";

export const fetchServices = async () => {
  const services: Service[] = await sanityClient.fetch(
    groq`
  *[_type=="service"]
  `,
    { next: { revalidate } }
  );
  return services;
};
