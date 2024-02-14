"use client";
import React, { useContext } from "react";
import { urlFor } from "@/sanity";
import { motion } from "framer-motion";
import { PageInfo } from "@/types/typings";
import Link from "next/link";
import BackgroundCircles from "../atoms/BackgroundCircles";
import { LanguageContext } from "@/context/languageContext";
type Props = {
  data: PageInfo;
};
function Home({ data }: Props) {
  const { language } = useContext(LanguageContext);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex flex-col text-center md:text-left md:flex-row max-w-7xl  p-5 lg:justify-evenly mx-auto items-center"
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
        <h4 className="lg:text-6xl md:text-2xl text-base font-semibold mb-5 text-left">
          {data.title[language.code]}
        </h4>
        <p className="md:text-base  text-sm text-justify">
          {data.description[language.code]}
        </p>
        <div className="hidden my-4 md:flex flex-col gap-4">
          <Link
            href={"#contact"}
            className="flex items-center gap-2 bg-gradient-to-r sm:w-40 capitalize font-bold from-primary-trid to-[#CFD02B] p-3 text-center  rounded-lg text-white"
          >
            <h1 className="flex">{data.heroButtonLabel[language.code]}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
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
        className="-mb-20 md:mb-0 flex-shrink-0 w-48 h-auto object-cover md:w-96 md:h-auto xl:w-[500px] xl:h-[600px]"
      />

      <Link
        href={"#contact"}
        className="gap-4 md:hidden w-[90%] my-2 absolute bottom-20  flex  items-center bg-gradient-to-r capitalize font-bold from-primary-trid to-[#CFD02B] p-3 text-center  rounded-lg text-white"
      >
        <h1 className="flex">{data.heroButtonLabel[language.code]}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </motion.div>
  );
}

export default Home;
