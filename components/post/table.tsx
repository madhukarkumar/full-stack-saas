"use client";

import { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Post } from "@/types/post";

export function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Post Name</TableHead>
          <TableHead>User Email</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Votes</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.post_id}>
            <TableCell>{post.postName}</TableCell>
            <TableCell>{post.userEmail}</TableCell>
            <TableCell>{post.postURL}</TableCell>
            <TableCell>{post.postVotes}</TableCell>
            <TableCell>{new Date(post.CreatedAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
