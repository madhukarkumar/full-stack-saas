import { Suspense } from "react";
import { getPosts } from "@/lib/post/get-many";
import { PostsGrid } from "@/components/post/grid";
import { Button } from "@/components/ui/button";
import CreatePostModal from "@/components/post/create-modal";
import PostModal from "@/components/post/modal";

export const revalidate = 60; // Revalidate this page every 60 seconds

async function Posts() {
  const posts = await getPosts({ limit: 50 }); // Fetch 50 posts initially
  return <PostsGrid posts={posts} />;
}

export default function HomePage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">The Hype Board</h1>
      <div className="mb-4 flex justify-between">
        <Button className="ml-auto">Create Post</Button>
      </div>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
    </main>
  );
}
