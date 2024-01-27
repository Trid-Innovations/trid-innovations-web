"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Service } from "@/typings";
import { urlFor } from "@/sanity";
import Image from "next/image";
import BackgroundCircles from "../atoms/BackgroundCircles";

type Props = {
  data: Service[];
};
function Services({ data }: Props) {
  const calculateStyle = (index: number, total: number) => {
    const angle = (360 / total) * index;
    return `rotate(${angle}deg) translate(10rem) rotate(-${angle}deg)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen  relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <motion.div
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-10 px-0 md:px-10 z-10"
      >
        {data?.map((service, index) => (
          <div key={index}>
            <div className="text-primary-trid  tracking-[5px]">
              {service.title.en}
            </div>
            <div>{service.description.en}</div>
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
        className="space-y-10 px-0 md:px-10 z-0"
      >
        <div className="relative flex justify-center items-center h-96 w-96">
          {data.map((service, index) => (
            <div
              key={index}
              className="absolute transform"
              style={{ transform: calculateStyle(index, data.length) }}
            >
              <div className="flex-col justify-start  flex h-16 w-16 object-cover">
                <Image
                  src={urlFor(service.image).url()}
                  alt={service.title.en}
                  fill
                  className="h-6 w-6 rounded-full z-0"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <p className="font-bold text-xs mt-2 z-10">
                  {service.title.en}
                </p>
              </div>
            </div>
          ))}
          <BackgroundCircles />
          <div className="absolute text-center">
            <p className="font-bold">Text Here</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Services;
