"use client";

import { useState, useEffect, useCallback } from "react";

import CreatePostModal from "@/components/post/create-modal";
import { PostsGrid } from "@/components/post/grid";
import PostModal from "@/components/post/modal";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";

export default function HomePage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchPosts = useCallback(async () => {
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
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleRefresh = () => {
    fetchPosts();
  };

  const handleCreatePostSuccess = () => {
    fetchPosts();
    setIsCreateModalOpen(false);
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">The Hype Board</h1>
      <div className="mb-4 flex justify-between">
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Post</Button>
        
      </div>
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
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreatePostSuccess}
      />
    </main>
  );
}
