import Home from "@/app/page";
import React, { Fragment } from "react";
import About from "../organisms/about";
import Services from "../organisms/services";
import Contact from "../organisms/contact";

function Trid() {
  return (
    <Fragment>
      <Home />
      <About />
      <Services />
      <Contact />
    </Fragment>
  );
}

export default Trid;
