import { FooterData } from "@/typings";
import React from "react";
import FooterColumn from "../molecules/footerColumn";
type Props = {
  data: FooterData;
};
function Footer({ data }: Props) {
  console.log({ data });
  return (
    <div className=" h-36 bg-white py-4">
      <div className="h-4 w-full bg-primary-trid" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center overflow-scroll h-full">
        {data.columns.map((column, index) => (
          <FooterColumn key={index} column={column} />
        ))}
      </div>
    </div>
    //   <div className="sticky bottom-0 px-10 h-48 border-t z-0 w-full bg-white">
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center">
    //     {data.columns.map((column, index) => (
    //       <FooterColumn key={index} />
    //     ))}
    //   </div>
    // </div>
  );
}

export default Footer;
