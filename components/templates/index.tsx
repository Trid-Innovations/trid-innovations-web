import React, { Fragment } from "react";
import About from "../organisms/about";
import Services from "../organisms/services";
import Contact from "../organisms/contact";
import Home from "../organisms/home";
import { fetchPageInfo } from "@/client/homepageInfo";
import { fetchAboutData } from "@/client/fetchAboutData";
import { fetchServices } from "@/client/fetchServices";
import { fetchContactData } from "@/client/fetchContactData";
import Footer from "../organisms/footer";
import Hero from "../organisms/hero";

async function Trid() {
  const pageInfo = await fetchPageInfo();
  const aboutData = await fetchAboutData();
  const servicesData = await fetchServices();
  const contactData = await fetchContactData();
  return (
    <Fragment>
      <section id="home" className=" w-full  bg-secondary-trid">
        <Home data={pageInfo} />
      </section>
      <section id="hero" className=" bg-white">
        <Hero data={pageInfo} />
      </section>
      <section id="about" className=" bg-secondary-trid">
        <About data={aboutData} />
      </section>

      <section id="services" className=" bg-white">
        <Services data={servicesData} />
      </section>
      <section id="contact" className="  bg-primary-trid/10">
        <Contact data={contactData} />
      </section>
      <section id="footer" className="">
        <Footer />
      </section>
    </Fragment>
  );
}

export default Trid;
