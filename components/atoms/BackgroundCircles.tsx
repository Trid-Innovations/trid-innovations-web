import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function BackgroundCircles({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{
        duration: 2.5,
      }}
      className="relative flex justify-center items-center  bg-red-500"
    >
      <div className="absolute border border-primary-trid/60 h-[50px] w-[50px] xl:h-[100px] lg:w-[100px] rounded-full mt-48 animate-ping" />
      <div className="absolute border border-primary-trid h-[100px] w-[100px] xl:h-[200px] xl:w-[200px] rounded-full mt-48" />
      <div className="absolute border border-primary-trid h-[300px] w-[300px] xl:h-[400px] xl:w-[400px] rounded-full mt-48" />
      <div className="absolute border border-[#F7AB0A] h-[450px] w-[450px] xl:h-[550px] xl:w-[550px] rounded-full mt-48 animate-pulse opacity-20" />
      <div className="absolute border border-primary-trid h-[600px] w-[600px] xl:h-[700px] xl:w-[700px] rounded-full mt-48 " />
    </motion.div>
  );
}
