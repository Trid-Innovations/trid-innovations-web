import Header from "@/components/organisms/header";
import { HeaderData } from "@/typings";
import { fetchHeaderData } from "@/utils/fetchHeaderData";
import TridTemplate from "@/components/templates";
import Footer from "@/components/organisms/footer";
import { fetchFooterData } from "@/utils/fetchFooterData";

export default async function Home() {
  const headerData: HeaderData = await fetchHeaderData();
  const footerData = await fetchFooterData();
  return (
    <div className="relative flex flex-col h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden  scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 scrollbar-thin">
      <Header data={headerData} />

      <main className="z-20 ">
        <TridTemplate />
      </main>
      <div className="sticky bottom-0 z-0 w-full">
        <Footer data={footerData} />
      </div>
    </div>
    // <div className="relative z-10 h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden  scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 scrollbar-thin">
    //   <Header data={headerData} />
    //   <TridTemplate />
    //   <Footer data={footerData} />
    // </div>
  );
}
