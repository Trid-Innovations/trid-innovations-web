import React from "react";
import Menu from "../molecules/menu";
import { HeaderData } from "@/typings";
import Logo from "../atoms/logo";
import { urlFor } from "@/sanity";
import useDeviceDetect from "@/hooks/useDeviceDetect";
type Props = {
  data: HeaderData;
};

function Header({ data }: Props) {
  return (
    <div className="sticky w-full shadow-lg">
      <header className=" top-0 flex items-center justify-between max-w-7xl mx-auto z-50 xl:items-center p-5 shadow-b-md">
        <Logo logo={data.logo} />

        <Menu menu={data?.menu} />
      </header>
    </div>
  );
}

export default Header;
