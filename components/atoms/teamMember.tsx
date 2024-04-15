"use client";
import { urlFor } from "@/sanity";
import { Member } from "@/types/typings";
import Image from "next/image";
import React, { useContext } from "react";
import Socials from "../molecules/socials";
import { LanguageContext } from "@/context/languageContext";
type Props = {
  member: Member;
};
function TeamMember({ member }: Props) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="flex flex-col gap-4  trid__centering">
      <div className="relative xl:size-96 lg:size-72 md:size-48 size-24 rounded-full">
        <Image
          src={urlFor(member.picture).url()}
          fill
          alt="pic"
          className="flex rounded-full"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <p className="uppercase tracking-[3px]">{member.name}</p>
      <p className="italic text-primary-trid">{member.title[language.code]}</p>
      <Socials socials={member.socials} />
    </div>
  );
}

export default TeamMember;
