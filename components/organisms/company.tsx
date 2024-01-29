"use client";
import { CompanyData } from "@/types/typings";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity";
import { LanguageContext } from "@/context/languageContext";

type Props = {
  data: CompanyData;
};
function Company({ data }: Props) {
  const { language } = useContext(LanguageContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="gap-20 h-screen z-10 relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 py-28 justify-evenly mx-auto items-center"
    >
      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        src={urlFor(data.image).url()}
        className="-mb-20 md:mb-0 flex-shrink-0   rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
      />
      <motion.div
        initial={{
          x: 200,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="md:text-base  text-sm text-justify mt-5">
          {data.description[language.code]}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Company;
