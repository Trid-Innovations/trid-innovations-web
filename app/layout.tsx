import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
