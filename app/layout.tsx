import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";
import { HeaderWrapper } from "./HeaderWrapper";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

const title = `AI Startup Leaderboard`;
export const metadata: Metadata = {
  title: {
    default: title,
    template: `${title} - %s`,
  },
  description: "Full stack Next.js app with SingleStore, Elegance SDK & NextJS for real-time intelligent apps",
  openGraph: {
    images: [
      {
        url: '/images/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'AI Startup Leaderboard',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
          <HeaderWrapper />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
