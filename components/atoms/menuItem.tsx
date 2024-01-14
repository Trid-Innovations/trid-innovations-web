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
      className="text-sm lg:text-2xl text-primary-trid/70 hover:text-primary-trid cursor-pointer font-bold"
    >
      {title}
    </Link>
  );
}

export default MenuItem;
