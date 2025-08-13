import type { Metadata } from "next";
import { inter } from "@/lib/font"
import "./globals.css";
import Header from "@/app-components/header";
import Footer from "@/app-components/footer";
import NavLinks from "@/app-components/nav-links";
export const metadata: Metadata = {
  title: "The Style Fashion Groups",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <Header/>
       <NavLinks/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
