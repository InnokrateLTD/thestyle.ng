import type { Metadata } from "next";
import { inter } from "@/lib/font"
import "./globals.css";
import { Toaster } from "react-hot-toast";
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
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
