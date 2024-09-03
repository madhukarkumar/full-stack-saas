"use client";

import React, { useState } from "react";

import CreatePostModal from "@/components/post/create-modal";
import { PostsGrid } from "@/components/post/grid";
import PostModal from "@/components/post/modal";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";

interface HomePageClientProps {
  initialPosts: Post[];
}

export default function HomePageClient({ initialPosts }: HomePageClientProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState(initialPosts);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openPostModal = (post: Post) => setSelectedPost(post);
  const closePostModal = () => setSelectedPost(null);

  const handleCreatePostSuccess = async () => {
    // Here you would typically fetch the updated list of posts
    // For now, we'll just close the modal
    closeCreateModal();
    // In a real application, you might want to refresh the posts list here
    // const updatedPosts = await fetchUpdatedPosts();
    // setPosts(updatedPosts);
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">The Hype Board</h1>
      <div className="mb-4 flex justify-between">
        <Button
          className="ml-auto"
          onClick={openCreateModal}
        >
          Create Post
        </Button>
      </div>
      <PostsGrid
        posts={posts}
        onPostClick={openPostModal}
        isLoading={false}
      />

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSuccess={handleCreatePostSuccess}
      />
      {selectedPost && (
        <PostModal
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={closePostModal}
        />
      )}
    </main>
  );
}
