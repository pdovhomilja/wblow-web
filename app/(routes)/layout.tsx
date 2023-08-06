import Header from "@/components/Header";
import type { Metadata } from "next";

import Footer from "@/components/Footer";

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
    <main className="flex flex-col w-full h-screen">
      <div>
        <Header />
      </div>
      <div className="flex max-w-7xl mx-auto h-full my-5">{children}</div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
