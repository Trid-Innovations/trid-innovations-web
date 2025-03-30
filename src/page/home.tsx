import About from "../components/About";
import Articles from "../components/Articles";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import TopHeader from "../components/TopHeader";
import { Language } from "../types";

interface HomePageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function Home({ language, setLanguage }: HomePageProps) {
  return (
    <>
      <TopHeader />
      <Header language={language} setLanguage={setLanguage} />
      <Hero />
      <Services />
      <About />
      <Articles />
      <Contact />
      <Footer />
    </>
  );
}
