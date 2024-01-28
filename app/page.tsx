import Header from "@/components/organisms/header";
import { HeaderData } from "@/types/typings";
import { fetchHeaderData } from "@/utils/fetchHeaderData";
import TridTemplate from "@/components/templates";
import Footer from "@/components/organisms/footer";
import { fetchFooterData } from "@/utils/fetchFooterData";

export default async function Home() {
  return <TridTemplate />;
}
