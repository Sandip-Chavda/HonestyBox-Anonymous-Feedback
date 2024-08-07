import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";
import DarkModeProviders from "@/context/DarkModeProvider";
import ThemeSwitcher from "@/components/darkmode-theme-switcher/ThemeSwitcher";
import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HonestyBox",
  description: "HonestyBox - Anonymous or secret opnion share platefomr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <DarkModeProviders>
            <Navbar />

            {children}
            <div className="fixed bottom-12 right-8 z-10 w-fit">
              <ThemeSwitcher />
            </div>
            <Toaster position="top-right" />
          </DarkModeProviders>
        </body>
      </AuthProvider>
    </html>
  );
}
