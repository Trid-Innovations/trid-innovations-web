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
      className="h-screen relative flex flex-col  md:flex-row max-w-7xl p-5 justify-evenly mx-auto items-center"
    >
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
            <div className="text-primary-trid  tracking-[5px] text-2xl ">
              {service.title[language.code]}
            </div>
            <div className="text-xs lg:text-base">
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
      >
        <div className="relative flex justify-center items-center h-96 w-96">
          {data.map((service, index) => (
            <div
              key={index}
              className="absolute transform "
              style={{ transform: calculateStyle(index, data.length) }}
            >
              <div className="flex-col justify-start  flex h-16 w-16 object-cover  overflow-visible">
                <Image
                  src={urlFor(service.image).url()}
                  alt={service.title[language.code]}
                  fill
                  className="h-6 w-6 rounded-full z-0"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="font-bold text-xs z-10 absolute -top-10 w-full">
                {service.title[language.code]}
              </div>
            </div>
          ))}

          {/* <BackgroundCircles /> */}
          <div className="absolute text-center">
            <p className="font-bold">Our services</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Services;
