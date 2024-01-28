import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";

const roboto = Roboto({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "TRID Innovations",
  description:
    "We help you Power your Decisions with data! With our expertise in Data Analysis and Reporting, take your business to data-driven success. Make wise decisions, unlock the key to growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div
          className={`relative flex flex-col h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden  scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 scrollbar-thin`}
        >
          <Header />

          <main className="z-20 ">{children}</main>
          <div className="sticky bottom-0 z-0 w-full">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
