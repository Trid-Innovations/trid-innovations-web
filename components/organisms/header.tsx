import React from "react";
import Menu from "../molecules/menu";
import { HeaderData } from "@/typings";
import Logo from "../atoms/logo";
import { urlFor } from "@/sanity";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { fetchHeaderData } from "@/utils/fetchHeaderData";

async function Header() {
  const data: HeaderData = await fetchHeaderData();
  return (
    <div className="sticky top-0 w-full shadow-lg  z-50">
      <header className="flex items-center justify-between max-w-7xl mx-auto xl:items-center p-5">
        <Logo logo={data.logo} />

        <Menu menu={data?.menu} />
      </header>
    </div>
  );
}

export default Header;
