"use client";
import React from "react";
import { urlFor } from "@/sanity";
import { motion } from "framer-motion";
import { PageInfo } from "@/typings";
type Props = {
  data: PageInfo;
};
function Home({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center bg="
    >
      <motion.div
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-10 px-0 md:px-10"
      >
        <h4 className="md:text-6xl  text-lg font-semibold">{data.title.en}</h4>
        <p className="md:text-base  text-sm text-justify">
          {data.description.en}
        </p>
      </motion.div>
      <motion.img
        initial={{
          x: 200,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        src={urlFor(data.heroImage).url()}
        className="-mb-20 md:mb-0 flex-shrink-0   rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
      />
    </motion.div>
  );
}

export default Home;
