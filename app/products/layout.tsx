

import Header from "@/components/header";
import Footer from "@/components/footer";
import NavLinks from "@/components/nav-links";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen">
      <Header/>
       <NavLinks/>
       {children}
       <Footer/>
    </div>
  );
}
