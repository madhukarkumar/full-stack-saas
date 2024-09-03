"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import CreatePostModal from "@/components/post/create-modal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ComponentProps } from "@/types/ui";

export type HeaderProps = ComponentProps<"header">;

const links = [
  { title: "Home", href: ROUTES.ROOT },
  { title: "Post", href: "#" }, // We'll use "#" as a placeholder for now
  { title: "Login", href: ROUTES.CHAT },
];

export function Header({ className, ...props }: HeaderProps) {
  const pathname = usePathname();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const handleCreatePostSuccess = () => {
    setIsCreatePostModalOpen(false);
    // You might want to add additional logic here, such as refreshing the post list
  };

  const handlePostClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsCreatePostModalOpen(true);
  };

  return (
    <>
      <header
        {...props}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between",
          "border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800",
          className,
        )}
      >
        <Link
          href={ROUTES.ROOT}
          className="flex items-center"
        >
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
              <Link
                href={link.href}
                onClick={link.title === "Post" ? handlePostClick : undefined}
              >
                {link.title}
              </Link>
            </Button>
          ))}
        </nav>
      </header>
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSuccess={handleCreatePostSuccess}
      />
    </>
  );
}
