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
import { fetchContactData } from "@/utils/fetchContactData";
import Footer from "../organisms/footer";
import Hero from "../organisms/hero";

async function Trid() {
  const pageInfo = await fetchPageInfo();
  const aboutData = await fetchAboutData();
  const servicesData = await fetchServices();
  const companyData = await fetchCompanyData();
  const contactData = await fetchContactData();
  return (
    <Fragment>
      <section id="home" className="lg:snap-center w-full  bg-secondary-trid">
        <Home data={pageInfo} />
      </section>
      <section id="hero" className="lg:snap-end bg-white">
        <Hero data={pageInfo} />
      </section>
      <section id="about" className="lg:snap-end bg-secondary-trid">
        <About data={aboutData} />
      </section>

      <section id="services" className="lg:snap-end bg-white">
        <Services data={servicesData} />
      </section>
      <section id="contact" className="lg:snap-start  bg-primary-trid/10">
        <Contact data={contactData} />
      </section>
      <section id="footer" className="lg:snap-end ">
        <Footer />
      </section>
    </Fragment>
  );
}

export default Trid;
