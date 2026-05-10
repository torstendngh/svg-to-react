import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/tailwind-utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SVG → React",
  description: "Paste an SVG and instantly get a typed React component. Supports TSX and JSX output, currentColor replacement, and one-click download.",
  keywords: ["svg", "react", "tsx", "jsx", "icon", "component", "converter"],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    lang="en"
    className={cn(
      geistSans.variable,
      geistMono.variable,
      "h-full antialiased",
      "bg-zinc-950 text-zinc-50",
    )}
  >
    <body className="min-h-full flex flex-col">{children}</body>
  </html>
);

export default RootLayout;
