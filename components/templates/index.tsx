import React, { Fragment } from "react";
import About from "../organisms/about";
import Services from "../organisms/services";
import Contact from "../organisms/contact";
import Home from "../organisms/home";
import { fetchPageInfo } from "@/utils/homepageInfo";
import { fetchAboutData } from "@/utils/fetchAboutData";

async function Trid() {
  const pageInfo = await fetchPageInfo();
  const aboutData = await fetchAboutData();
  return (
    <Fragment>
      <section id="home" className="snap-center w-full  bg-secondary-trid">
        <Home data={pageInfo} />
      </section>
      <section id="about" className="snap-center">
        <About data={aboutData} />
      </section>
      <section id="services" className="snap-center">
        <Services />
      </section>
      <section id="contact" className="snap-start">
        <Contact />
      </section>
    </Fragment>
  );
}

export default Trid;
