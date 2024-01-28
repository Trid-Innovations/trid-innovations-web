"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AboutData } from "@/types/typings";
import { urlFor } from "@/sanity";
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
      className="h-screen relative flex flex-col text-center md:text-left  max-w-7xl px-10 justify-center space-y-20 mx-auto items-center"
    >
      <h3 className=" uppercase tracking-[20px] text-gray-500 text-2xl">
        {data.title[language.code]}
      </h3>
      <p className="md:text-base  text-sm text-justify">
        {data.description[language.code]}
      </p>
      <div className="flex items-center justify-center space-x-10">
        {data?.members.map((member, index) => (
          <div
            key={index}
            className="group relative cursor-pointer flex-col items-center flex justify-center gap-2"
          >
            <motion.img
              initial={{
                x: -100,
                opacity: 0,
              }}
              transition={{
                duration: 1,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              src={urlFor(member.picture).url()}
              className="rounded-full border border-gray-500 object-cover h-24 w-24 md:w-32 md:h-32  lg:w-48 lg:h-48  filter group:grayscale transition duration-100 ease-in-out"
            />
            <div className="text-sm italic font-light ">{member.name}</div>
            <div className="text-sm italic font-light ">
              {member.title[language.code]}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default About;
