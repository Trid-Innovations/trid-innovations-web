import { sanityClient, revalidate } from "@/sanity";
import { CompanyData } from "@/types/typings";
import { groq } from "next-sanity";

export const fetchCompanyData = async () => {
  const companyData: CompanyData = await sanityClient.fetch(
    groq`
  *[_type=="company"][0]
  `,
    { next: { revalidate } },
    { cache: "no-store" }
  );
  return companyData;
};
