import { AMenu } from "@/typings";
import React from "react";
import MenuItem from "../atoms/menuItem";
type Props = {
  menu: AMenu[];
};

function Menu({ menu }: Props) {
  return (
    <div className="flex items-center ">
      {menu?.map((item) => (
        <MenuItem key={item.title} title={item.title} />
      ))}
    </div>
  );
}

export default Menu;
