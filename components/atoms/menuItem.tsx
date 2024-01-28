import Link from "next/link";
import React, { useState } from "react";

type Props = {
  title: string;
  name: string;
};
function MenuItem({ title, name }: Props) {
  return (
    <Link
      href={`#${name}`}
      className="tracking-[2px] text-xs uppercase lg:text-base  hover:text-primary-trid/80  cursor-pointer font-bold"
    >
      {title}
    </Link>
  );
}

export default MenuItem;
