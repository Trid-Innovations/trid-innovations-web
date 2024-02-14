import React from "react";
import Menu from "../molecules/menu";
import { HeaderData } from "@/types/typings";
import Logo from "../atoms/logo";
import { fetchHeaderData } from "@/client/fetchHeaderData";
import MobileMenu from "../molecules/mobileMenu";

async function Header() {
  const data: HeaderData = await fetchHeaderData();
  return (
    <div className="sticky top-0 w-full shadow-lg  z-50 bg-white">
      <header className="flex items-center justify-between max-w-7xl mx-auto xl:items-center p-5">
        <Logo logo={data.logo} />
        <Menu menu={data?.menu} />
        <MobileMenu menu={data?.menu} />
      </header>
    </div>
  );
}

export default Header;
