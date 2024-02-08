"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { PageInfo } from "@/types/typings";
import { LanguageContext } from "@/context/languageContext";

type Props = {
  data: PageInfo;
};
function Hero({ data }: Props) {
  const { language } = useContext(LanguageContext);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pt-20 h-screen md:h-[60vh] text-center relative flex flex-col  max-w-7xl p-5 justify-center space-y-20 mx-auto items-center"
    >
      <div className="text-3xl  flex flex-col gap-10 py-10">
        <h3 className=" uppercase tracking-[10px] text-primary-trid text-lg md:text-xl lg:text-2xl">
          TRID INNOVATIONS
        </h3>
        <p className="text-base md:text-xl">
          {data.introduction[language.code]}
        </p>
      </div>
    </motion.div>
  );
}

export default Hero;
