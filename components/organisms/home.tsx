"use client";
import React from "react";
import { urlFor } from "@/sanity";
import { motion } from "framer-motion";
import { PageInfo } from "@/typings";
import Link from "next/link";
import BackgroundCircles from "../atoms/BackgroundCircles";
type Props = {
  data: PageInfo;
};
function Home({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen z-10 relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 py-28 justify-evenly mx-auto items-center"
    >
      <motion.div
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <h4 className="lg:text-6xl md:tracking-[10px] tracking-[4px]  md:text-2xl text-xs font-semibold mb-5">
          {data.title.en}
        </h4>
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
      <Link
        href="#about"
        className="m-5 w-18 h-18 rounded-full bg-primary-trid items-center justify-center absolute bottom-0 mx-auto flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-white font-extrabold"
        >
          <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </Link>
    </motion.div>
  );
}

export default Home;
