import Link from "next/link";
import React, { useState } from "react";

type Props = {
  title: string;
  name: string;
  onClick?: () => void;
};
function MenuItem({ title, name, onClick }: Props) {
  return (
    <Link
      href={`#${name}`}
      onClick={() => onClick && onClick()}
      className="tracking-[2px] text-xs uppercase lg:text-base  hover:text-primary-trid/80  cursor-pointer "
    >
      {title}
    </Link>
  );
}

export default MenuItem;
