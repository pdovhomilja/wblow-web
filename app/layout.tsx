import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whistleblower Online",
  description: "Whistleblower Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex flex-col w-full h-screen">
            <div>
              <Header />
            </div>
            <div className="flex max-w-7xl mx-auto h-full my-5">{children}</div>
            <div>
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
