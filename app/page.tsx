import React from "react";

import { getPosts } from "@/lib/post/get-many";

import HomePageClient from "./home-page-client";

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function HomePage() {
  const posts = await getPosts({ limit: 50 }); // Fetch 50 posts initially

  return <HomePageClient initialPosts={posts} />;
}
