import { FooterData } from "@/typings";
import React from "react";
import FooterColumn from "../molecules/footerColumn";
import { fetchFooterData } from "@/utils/fetchFooterData";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity";

async function Footer() {
  const data = await fetchFooterData();
  console.log({ data });
  debugger;
  return (
    <div className="h-52 bg-white py-4 relative px-5">
      <div className="h-4 w-full bg-primary-trid absolute top-0 left-0" />
      <div className="flex flex-wrap  overflow-y-scroll h-full max-w-7xl mx-auto gap-3 justify-between">
        {data.columns.map((column, index) => (
          <FooterColumn key={index} column={{ ...column }} />
        ))}
      </div>
      <div className="flex flex-col max-w-7xl mx-auto">
        {data.socials.map((social, index) => (
          <Link
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
        <div className="flex justify-between flex-wrap">
          <div>{data.copyRights.en}</div>
          <div className="flex flex-wrap uppercase gap-10">
            <div>{data.termsOfUse.en}</div>
            <div>{data.privacyPolicy.en}</div>
          </div>
          {/* <div>{data.}</div> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
