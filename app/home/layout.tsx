
import { inter } from "@/lib/font"
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NavLinks from "@/components/nav-links";


export default function Layout({
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
