import { Social } from "@/types/typings";
import Link from "next/link";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
type Props = {
  socials: Social[];
};
function Socials({ socials }: Props) {
  return (
    <div className="flex gap-2 ">
      {socials.map((social, index) => {
        if (social.title === "linkedin") {
          return (
            <Link
              key={index}
              target="_blank"
              href={social.url}
              className="cursor-pointer hover:text-primary-trid"
            >
              <FaLinkedinIn />
            </Link>
          );
        } else return null;
      })}
    </div>
  );
}

export default Socials;
