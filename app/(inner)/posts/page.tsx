"use client";

import { useState, useEffect } from "react";

import { PostsGrid } from "@/components/post/grid";
import PostModal from "@/components/post/modal";
import { Post } from "@/types/post";

export default function PostsPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Trending Startups</h1>
      <PostsGrid
        onPostClick={handlePostClick}
        posts={posts}
        isLoading={isLoading}
      />
      {selectedPost && (
        <PostModal
          isOpen={!!selectedPost}
          onClose={handleCloseModal}
          post={selectedPost}
        />
      )}
    </main>
  );
}
