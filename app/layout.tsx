import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { rubik } from "@/components/utils/Fonts";
import Image from "next/image";
import main from "../public/mainf.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Forge",
  description: "CodeForge-Home of Scripting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-white dark:bg-black`}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Navbar />
          <div className="mt-24">
            <div className="bgWrap">
              <Image
                alt="Main page background"
                src={main}
                placeholder="blur"
                quality={100}
                loading="lazy"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
