import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* ... existing code ... */}
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/chat"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Chat
        </Link>
        <Link
          href="/settings"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Settings
        </Link>
        {/* ... rest of the code ... */}
      </nav>
      {/* ... rest of the code ... */}
    </header>
  );
}
