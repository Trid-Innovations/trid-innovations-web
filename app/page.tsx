import Header from "@/components/organisms/header";
import { HeaderData } from "@/typings";
import { fetchHeaderData } from "@/utils/fetchHeaderData";

export default async function Home() {
  const headerData: HeaderData = await fetchHeaderData();
  return (
    <div className="text-white h-screen snap-y snap-mandatory overflow-y-scroll z-0 overflow-x-hidden  scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 scrollbar-thin">
      <Header data={headerData} />
      {/* <section id="hero" className="snap-center">
        <Hero info={info} />
      </section> */}
    </div>
  );
}
