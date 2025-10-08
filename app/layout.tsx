import type { Metadata } from "next";
import { inter } from "@/lib/font"
// import "./globals.css";
import { Toaster } from "react-hot-toast";
import SWRProvider from "./provider";
// export const metadata: Metadata = {
//   title: "The Style Fashion Groups",
//   description: "",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.className}`}
//       >
//         {children}
//         <Toaster/>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
// import { SWRConfig } from "swr";
// import { apiRequest } from "@/lib/api";
import "./globals.css";

// const fetcher = (url: string) => apiRequest(url, "GET");

export const metadata: Metadata = {
  title: "The Style Fashion Groups",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <SWRProvider
        >
          {children}
           <Toaster/>
        </SWRProvider>
      </body>
    </html>
  );
}
