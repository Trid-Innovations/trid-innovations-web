"use client";
import React, { Fragment } from "react";
import { urlFor } from "@/sanity";
import Image from "next/image";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { Logo } from "@/typings";
type Props = {
  logo: Logo;
};
function Logo({ logo }: Props) {
  const { isMobile } = useDeviceDetect();
  return (
    <Fragment>
      {!isMobile ? (
        <div className="relative justify-start  flex h-16 w-52 lg:h-20 lg:w-60 object-cover">
          <Image
            src={urlFor(logo.desktop).url()}
            fill
            alt="pic"
            className="flex place-self-start"
          />
        </div>
      ) : (
        <div className="relative justify-start  flex h-12 w-24  object-cover">
          <Image
            src={urlFor(logo.mobile).url()}
            fill
            alt="pic"
            className="flex place-self-start"
          />
        </div>
      )}
    </Fragment>
  );
}

export default Logo;
