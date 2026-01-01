

import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar/Navbar";
import BottomNavbar from "@/components/bottomNavbar/BottomNavbar";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatwootWidget from "@/components/chatwoot/ChatwootWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Snapwash | Customer Loyalty Points",
  description: "Earn points with every wash. Get free washes with our loyalty rewards program!",
  keywords: ["Points Rewards", "self service laundry", "laundry", "snapwash", "lagro laundry", "loyalty points", "free wash"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900`}>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <BottomNavbar />
              <ChatwootWidget />
            </div>
          </Providers>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}

