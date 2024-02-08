import { FooterData } from "@/types/typings";
import React from "react";
import FooterColumn from "../molecules/footerColumn";
import { fetchFooterData } from "@/utils/fetchFooterData";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity";
import FooterBottom from "../molecules/footerBottom";

async function Footer() {
  const data = await fetchFooterData();

  return (
    <div className="bg-white relative px-5 pt-4  ">
      <div className="h-2 w-full bg-primary-trid absolute top-0 left-0" />
      <div className="flex flex-wrap  overflow-y-scroll h-full max-w-7xl mx-auto gap-3  sm:justify-center md:justify-between">
        {data.columns.map((column, index) => (
          <FooterColumn key={index} column={{ ...column }} />
        ))}
      </div>
      <div className="flex flex-col max-w-7xl mx-auto mt-10">
        {data.socials.map((social, index) => (
          <Link
            key={index}
            href={social.url}
            className="relative justify-start  flex h-12 w-12  object-cover"
          >
            <Image
              src={urlFor(social.logo).url()}
              fill
              alt="pic"
              className="flex place-self-start bg-primary-trid"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        ))}
        <FooterBottom data={data} />
      </div>
    </div>
  );
}

export default Footer;
