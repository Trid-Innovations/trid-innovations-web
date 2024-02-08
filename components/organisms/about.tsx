"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AboutData } from "@/types/typings";
import { LanguageContext } from "@/context/languageContext";
type Props = {
  data: AboutData;
};
function About({ data }: Props) {
  const { language } = useContext(LanguageContext);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="trid__page--section"
    >
      <h3 className=" uppercase tracking-[10px] text-gray-500 text-lg md:text-xl lg:text-2xl">
        {data.title[language.code]}
      </h3>
      <div className="flex flex-col gap-5">
        {data.items.map((item, index) => (
          <div key={index} className=" flex gap-2">
            <div className="flex flex-col gap-4 ">
              <div className="font-bold text-primary-trid text-2xl">
                {item.title[language.code]}
              </div>
              <div className="text-xs md:text-base">
                {item.description[language.code]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default About;
