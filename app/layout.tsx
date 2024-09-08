import { ClerkProvider } from "@clerk/nextjs";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
