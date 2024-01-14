import React from "react";

type Props = {
  title: string;
};
function MenuItem({ title }: Props) {
  return <div>{title}</div>;
}

export default MenuItem;
