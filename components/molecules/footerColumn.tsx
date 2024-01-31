"use client";
import { LanguageContext } from "@/context/languageContext";
import { FooterColumn } from "@/types/typings";
import Link from "next/link";
import React, { useContext } from "react";

type Props = {
  column: FooterColumn;
};
function FooterColumn({ column }: Props) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="flex flex-col md:gap-3">
      <div className="text-lg lg:text-xl xl:text-2xl font-bold tracking-wider">
        {column.title[language.code]}
      </div>
      <div className="flex flex-col">
        {column.links.map((link, index) =>
          !link.url ? (
            <div
              className="text-xs lg:text-md xl:text-lg font-bold"
              key={index}
            >
              {link.title[language.code]}
            </div>
          ) : (
            <Link
              href={`/${link.url}`}
              className="text-xs lg:text-md xl:text-lg font-bold hover:text-primary-trid"
              key={index}
            >
              {link.title[language.code]}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default FooterColumn;
