import Header from "@/components/organisms/header";
import { HeaderData } from "@/types/typings";
import { fetchHeaderData } from "@/client/fetchHeaderData";
import TridTemplate from "@/components/templates";
import Footer from "@/components/organisms/footer";
import { fetchFooterData } from "@/client/fetchFooterData";

export default async function Home() {
  return <TridTemplate />;
}
