import { PostsGrid } from "@/components/post/grid";

export default function PostsPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Trending Startups</h1>
      <PostsGrid />
    </main>
  );
}