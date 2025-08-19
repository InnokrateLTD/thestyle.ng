import "@/app/globals.css";
// import { Toaster  } from "react-hot-toast";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <div className={`$inter.className box-border bg-[#ECEFF1]`}>
        {children}
      
      </div>
  );
}
