"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Member } from "@/types/typings";
import { LanguageContext } from "@/context/languageContext";
import TeamMember from "../atoms/teamMember";
type Props = {
  data: Member[];
};
function Team({ data }: Props) {
  const { language } = useContext(LanguageContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="trid__page--section"
    >
      <h3 className=" uppercase tracking-[10px] text-gray-500 text-lg md:text-xl lg:text-2xl">
        {language.code === "en" ? "The team" : "L'équipe"}
      </h3>
      <div className="flex gap-5 flex-wrap trid__centering">
        {data.map((member, index) => (
          <TeamMember key={index} member={member} />
        ))}
      </div>
    </motion.div>
  );
}

export default Team;
