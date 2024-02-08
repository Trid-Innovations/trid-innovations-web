"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Service } from "@/types/typings";
import { urlFor } from "@/sanity";
import Image from "next/image";
import BackgroundCircles from "../atoms/BackgroundCircles";
import { LanguageContext } from "@/context/languageContext";

type Props = {
  data: Service[];
};
function Services({ data }: Props) {
  const calculateStyle = (index: number, total: number) => {
    const angle = (360 / total) * index;
    return `rotate(${angle}deg) translate(10rem) rotate(-${angle}deg)`;
  };

  const { language } = useContext(LanguageContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="trid__page--section"
    >
      <h3 className=" uppercase tracking-[10px] text-gray-500 text-lg md:text-xl lg:text-2xl">
        Services
      </h3>
      <motion.div
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="z-10 flex flex-col gap-4"
      >
        {data?.map((service, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="font-bold text-primary-trid text-2xl ">
              {service.title[language.code]}
            </div>
            <div className="text-xs md:text-base">
              {service.description[language.code]}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{
          x: 200,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="z-0 hidden md:flex"
      ></motion.div>
    </motion.div>
  );
}

export default Services;
