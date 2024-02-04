"use client";
import { LanguageContext } from "@/context/languageContext";
import { FooterData } from "@/types/typings";
import React, { useContext } from "react";

function FooterBottom({ data }: { data: FooterData }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="flex md:justify-between flex-wrap text-xs md:text-base mb-10">
      <div>{data.copyRights[language.code]}</div>
      <div className="flex flex-wrap uppercase gap-2">
        <div>{data.termsOfUse[language.code]}</div>
        <div>{data.privacyPolicy[language.code]}</div>
      </div>
    </div>
  );
}

export default FooterBottom;
