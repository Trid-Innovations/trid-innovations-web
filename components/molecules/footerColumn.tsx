import { FooterColumn } from "@/typings";
import React from "react";

type Props = {
  column: FooterColumn;
};
function FooterColumn({ column }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg lg:text-xl xl:text-2xl font-bold">
        {column.title.en}
      </div>
      {column.links.map((link, index) => (
        <div className="text-xs lg:text-md xl:text-lg font-bold" key={index}>
          {link.title.en}
        </div>
      ))}
    </div>
  );
}

export default FooterColumn;
