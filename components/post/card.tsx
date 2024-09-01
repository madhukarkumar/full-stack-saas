"use client";

import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [votes, setVotes] = useState(post.postVotes);

  const handleUpvote = async () => {
    try {
      const response = await fetch(`/api/posts/${post.post_id}/upvote`, {
        method: 'POST',
      });
      if (response.ok) {
        setVotes(votes + 1);
      } else {
        console.error('Failed to upvote');
      }
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  // Generate a random image URL
  const imageUrl = `https://picsum.photos/seed/${post.post_id}/400/300`;

  return (
    <Card className="w-full">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={post.postName}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.postName}</h2>
        <p className="text-sm text-gray-600 mb-4">{post.postDetails}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={handleUpvote}>
          <ChevronUp className="mr-1 h-4 w-4" />
          Upvote {votes}
        </Button>
        <a href={post.postURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          View
        </a>
      </CardFooter>
    </Card>
  );
}