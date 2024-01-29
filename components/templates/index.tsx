import React, { Fragment } from "react";
import About from "../organisms/about";
import Services from "../organisms/services";
import Contact from "../organisms/contact";
import Home from "../organisms/home";
import { fetchPageInfo } from "@/utils/homepageInfo";
import { fetchAboutData } from "@/utils/fetchAboutData";
import { fetchServices } from "@/utils/fetchServices";
import Company from "../organisms/company";
import { fetchCompanyData } from "@/utils/fetchCompanyData";

async function Trid() {
  const pageInfo = await fetchPageInfo();
  const aboutData = await fetchAboutData();
  const servicesData = await fetchServices();
  const companyData = await fetchCompanyData();
  return (
    <Fragment>
      <section id="home" className="snap-center w-full  bg-secondary-trid">
        <Home data={pageInfo} />
      </section>
      <section id="about" className="snap-end bg-white">
        <About data={aboutData} />
      </section>
      <section id="about" className="snap-center bg-white">
        <Company data={companyData} />
      </section>
      <section id="services" className="snap-end bg-white">
        <Services data={servicesData} />
      </section>
      <section id="contact" className="snap-start bg-white">
        <Contact />
      </section>
    </Fragment>
  );
}

export default Trid;
