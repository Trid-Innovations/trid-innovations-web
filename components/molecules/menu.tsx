import { AMenu } from "@/typings";
import React from "react";
import MenuItem from "../atoms/menuItem";
type Props = {
  menu: AMenu[];
};

function Menu({ menu }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className=" items-center gap-4 hidden md:flex">
        {menu?.map((item) => (
          <MenuItem key={item.title} title={item.title.en} name={item.name} />
        ))}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 flex md:hidden text-primary-trid"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
}

export default Menu;
