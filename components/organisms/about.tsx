"use client";
import React from "react";
import { motion } from "framer-motion";
import { AboutData } from "@/typings";
import { urlFor } from "@/sanity";
type Props = {
  data: AboutData;
};
function About({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      // className="flex relative flex-col text-center md:text-left  max-w-7xl xl:px-0 min-h-screen justify-center xl:space-y-2 mx-auto"
      className="h-screen relative flex flex-col text-center md:text-left  max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute left-10 top-36 uppercase tracking-[20px] text-gray-500 text-2xl">
        {data.title.en}
      </h3>
      <h4 className="text-3xl ">{data.description.en}</h4>
      <div className="flex items-center justify-center gap-10">
        {data?.members.map((member, index) => (
          <div key={index} className="group relative cursor-pointer flex-col">
            <motion.img
              initial={{
                x: -200,
                opacity: 0,
              }}
              transition={{
                duration: 1,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              src={urlFor(member.picture).url()}
              className="rounded-full border border-gray-500 object-cover h-24 w-24 md:w-32 md:h-32  lg:w-48 lg:h-48  filter group:grayscale transition duration-300 ease-in-out"
            />
            <div className="text-sm italic font-light ">{member.title.en}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default About;
