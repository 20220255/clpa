

import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar/Navbar";
import BottomNavbar from "@/components/bottomNavbar/BottomNavbar";
import Providers from "./providers";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CLPA",
  description: "Customer Loyalty Points App",
  keywords: ["Points Rewards", "self service laundry", "laundry", "snapwash", "lagro laundry"],

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body className={roboto.className}>
          <div className="container">
            <Providers>
              <Navbar />
              {children}
              <BottomNavbar />
            </Providers>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
