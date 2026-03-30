import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "NOIRVAULT - Premium Street Essentials",
  description: "Modern premium fashion brand for Gen Z and young adults."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
        <Providers>
          <Navbar />
          <main className="container-max py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
