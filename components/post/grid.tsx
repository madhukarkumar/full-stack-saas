"use client";

import { useEffect, useState } from "react";

import { PostCard } from "@/components/post/card";
import { Post as PostType } from "@/types/post";

// Ensure the Post type includes the upvotes property
interface LocalPost extends PostType {
  upvotes: number; // Add this line
}

export function PostsGrid() {
  const [posts, setPosts] = useState<LocalPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      const data: LocalPost[] = await response.json();
      // Explicitly sort posts by upvotes in descending order
      const sortedPosts = data.sort((a, b) => b.upvotes - a.upvotes);
      setPosts(sortedPosts);
    }
    fetchPosts();
  }, []);

  // Function to create rows of posts
  const createRows = (posts: LocalPost[], columns: number) => {
    const rows = [];
    for (let i = 0; i < posts.length; i += columns) {
      rows.push(posts.slice(i, i + columns));
    }
    return rows;
  };

  const columns = 3; // Number of columns in the grid
  const rows = createRows(posts, columns);

  return (
    <div className="grid gap-6">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {row.map((post) => (
            <PostCard
              key={post.post_id}
              post={post}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
