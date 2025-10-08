

import Header from "@/app-components/header";
import Footer from "@/app-components/footer";
import NavLinks from "@/app-components/nav-links";
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
