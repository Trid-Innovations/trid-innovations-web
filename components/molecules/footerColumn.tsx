import { FooterColumn } from "@/typings";
import Link from "next/link";
import React from "react";

type Props = {
  column: FooterColumn;
};
function FooterColumn({ column }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg lg:text-xl xl:text-2xl font-bold tracking-wider">
        {column.title.en}
      </div>
      <div className="flex flex-col">
        {column.links.map((link, index) =>
          !link.url ? (
            <div
              className="text-xs lg:text-md xl:text-lg font-bold"
              key={index}
            >
              {link.title.en}
            </div>
          ) : (
            <Link
              href={`/${link.url}`}
              className="text-xs lg:text-md xl:text-lg font-bold hover:text-primary-trid"
              key={index}
            >
              {link.title.en}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default FooterColumn;
