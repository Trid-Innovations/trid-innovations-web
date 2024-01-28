"use client";
import { LanguageContext } from "@/context/languageContext";
import { FooterData } from "@/types/typings";
import React, { useContext } from "react";

function FooterBottom({ data }: { data: FooterData }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="flex justify-between flex-wrap">
      <div>{data.copyRights[language.code]}</div>
      <div className="flex flex-wrap uppercase gap-10">
        <div>{data.termsOfUse[language.code]}</div>
        <div>{data.privacyPolicy[language.code]}</div>
      </div>
    </div>
  );
}

export default FooterBottom;
