"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";

import CreatePostModal from "@/components/post/create-modal";
import { PostsGrid } from "@/components/post/grid";
import PostModal from "@/components/post/modal";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";

export default function PostsPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { isSignedIn } = useAuth();

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
    } finally {
      setIsLoading(false);
    }
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

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSuccess = () => {
    // Refresh the posts after successful creation
    fetchPosts();
    handleCloseCreateModal();
  };

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Trending Startups</h1>
        <Button onClick={handleOpenCreateModal}>Create Post</Button>
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
        onClose={handleCloseCreateModal}
        onSuccess={handleCreateSuccess}
        isAuthenticated={isSignedIn ?? false}
      />
    </main>
  );
}
