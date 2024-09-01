"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ComponentProps } from "@/types/ui";

export type HeaderProps = ComponentProps<"header">;

const links = [
  { title: "Home", href: ROUTES.ROOT },
  { title: "Post", href: ROUTES.USERS },
  { title: "Login", href: ROUTES.CHAT },
];

export function Header({ className, ...props }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header
      {...props}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between",
        "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700",
        "px-4 py-3 shadow-sm",
        className
      )}
    >
      <Link href={ROUTES.ROOT} className="flex items-center">
        <Logo />
      </Link>
      <nav className="flex items-center gap-2">
        {links.map((link) => (
          <Button
            key={link.title}
            asChild
            variant={pathname === link.href ? "default" : "ghost"}
            className="transition-colors"
          >
            <Link href={link.href}>{link.title}</Link>
          </Button>
        ))}
      </nav>
    </header>
  );
}
