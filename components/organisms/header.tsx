import React from "react";
import Menu from "../molecules/menu";
import { HeaderData } from "@/typings";
type Props = {
  data: HeaderData;
};

function Header({ data }: Props) {
  console.log({ data });
  return (
    <header className="sticky text-black top-0 flex items-center justify-between max-w-7xl mx-auto z-50 xl:items-center p-5">
      <div>Logo</div>
      {/* <Menu menu={data?.menu} /> */}
    </header>
  );
}

export default Header;
