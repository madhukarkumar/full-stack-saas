"use client";

import { useEffect, useState } from "react";

import { PostCard } from "@/components/post/card";
import { Post } from "@/types/post";

export function PostsGrid() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      const data = await response.json();
      // Sort posts by upvotes in descending order
      const sortedPosts = data.sort((a: Post, b: Post) => b.upvotes - a.upvotes);
      setPosts(sortedPosts);
    }
    fetchPosts();
  }, []);

  // Function to create rows of posts
  const createRows = (posts: Post[], columns: number) => {
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
        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {row.map((post) => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </div>
      ))}
    </div>
  );
}