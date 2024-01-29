"use client";
import { AMenu } from "@/types/typings";
import React, { useContext } from "react";
import MenuItem from "../atoms/menuItem";
import { LanguageContext } from "@/context/languageContext";
import Language from "./language";
type Props = {
  menu: AMenu[];
};

function Menu({ menu }: Props) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="items-center gap-4 relative hidden md:flex">
      <div className="flex items-center gap-4 ">
        {menu?.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title[language.code]}
            name={item.name}
          />
        ))}
      </div>
      <Language />
    </div>
  );
}

export default Menu;
