import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

const title = `AI Startup Leaderboard`;
export const metadata: Metadata = {
  title: {
    default: title,
    template: `${title} - %s`,
  },
  description: "Full stack Next.js app with SingleStore, Elegance SDK & NextJS for real-time intelligent apps",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <Analytics />
      <body
        className={cn(
          inter.className,
          "flex h-full w-full min-w-80 max-w-full flex-col overflow-y-auto overflow-x-hidden",
        )}
      >
        <Header className="fixed left-0 right-0 top-0 z-50" />
        <main className="flex-grow pb-16 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
