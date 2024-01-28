"use client";
import React, { Fragment } from "react";
import { urlFor } from "@/sanity";
import Image from "next/image";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { Logo } from "@/typings";
import Link from "next/link";
type Props = {
  logo: Logo;
};
function Logo({ logo }: Props) {
  const { isMobile } = useDeviceDetect();

  return (
    <Fragment>
      {!isMobile ? (
        <Link
          href={"/"}
          className="relative justify-start  flex h-16 w-52 lg:h-16 lg:w-54 object-cover"
        >
          <Image
            src={urlFor(logo.desktop).url()}
            fill
            alt="pic"
            className="flex place-self-start"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      ) : (
        <Link
          href={"/"}
          className="relative justify-start  flex h-12 w-24  object-cover"
        >
          <Image
            src={urlFor(logo.mobile).url()}
            fill
            alt="pic"
            className="flex place-self-start"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
    </Fragment>
  );
}

export default Logo;
