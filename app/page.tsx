import Header from "@/components/organisms/header";
import { HeaderData } from "@/typings";
import { fetchHeaderData } from "@/utils/fetchHeaderData";
import TridTemplate from "@/components/templates";
import Footer from "@/components/organisms/footer";

export default async function Home() {
  const headerData: HeaderData = await fetchHeaderData();
  return (
    <div className="relative h-screen snap-y snap-mandatory overflow-y-scroll z-0 overflow-x-hidden  scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 scrollbar-thin">
      <Header data={headerData} />
      <TridTemplate />
      <Footer />
    </div>
  );
}
