"use client";
import { AMenu } from "@/types/typings";
import React, { useContext, useState } from "react";
import MenuItem from "../atoms/menuItem";
import { LanguageContext } from "@/context/languageContext";
import { motion } from "framer-motion";
import Language from "./language";
type Props = {
  menu: AMenu[];
};

function MobileMenu({ menu }: Props) {
  const { language } = useContext(LanguageContext);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const variants = {
    open: { height: "100vh" },
    closed: { height: 0 },
  };
  return (
    <div className="flex md:hidden flex-col">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-8 h-8 text-primary-trid font-extrabold"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <motion.div
        initial="closed"
        animate={showMobileMenu ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
        className={`overflow-hidden absolute flex  items-center  justify-center gap-2  z-50 bg-white shadow-lg left-0 w-full top-0 ${
          !showMobileMenu ? "hidden" : ""
        }`}
      >
        <div
          onClick={() => setShowMobileMenu(false)}
          className="absolute top-0 m-4  right-0 items-center flex justify-center text-xl font-bold"
        >
          X
        </div>
        <div className="items-center gap-10 flex-col flex ">
          {menu?.map((item) => (
            <MenuItem
              key={item.title}
              title={item.title[language.code]}
              name={item.name}
              onClick={() => setShowMobileMenu(false)}
            />
          ))}

          <Language />
        </div>
      </motion.div>
    </div>
  );
}

export default MobileMenu;
