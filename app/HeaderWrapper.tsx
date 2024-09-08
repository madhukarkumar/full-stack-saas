"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/header";

export function HeaderWrapper() {
  const pathname = usePathname();
  const showPostButton = pathname !== "/";
  return <Header showPostButton={showPostButton} />;
}
