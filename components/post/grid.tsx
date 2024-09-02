"use client";

import { Loader } from "@/components/loader";
import { PostCard } from "@/components/post/card";
import { Post } from "@/types/post";

interface PostsGridProps {
  onPostClick: (post: Post) => void;
  posts: Post[];
  isLoading: boolean;
}

export function PostsGrid({ onPostClick, posts, isLoading }: PostsGridProps) {
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

  if (isLoading) {
    return <Loader />;
  }

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
              onClick={() => onPostClick(post)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
