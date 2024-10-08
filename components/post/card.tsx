"use client";

import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Post } from "@/types/post";
import { useAuth } from "@clerk/nextjs";

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  const [votes, setVotes] = useState(post.postVotes);
  const { isSignedIn } = useAuth();

  const handleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    try {
      const response = await fetch(`/api/posts/${post.post_id}/upvote`, {
        method: "POST",
      });
      if (response.ok) {
        setVotes(votes + 1);
      } else {
        console.error("Failed to upvote");
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  return (
    <Card
      className="w-full cursor-pointer overflow-hidden rounded-lg border-2 border-gray-300 shadow-md"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.postImageURL}
            alt={post.postName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="mb-2 text-xl font-bold">{post.postName}</h2>
        <p className="mb-4 text-sm text-gray-600">{post.postDetails}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={isSignedIn ? handleUpvote : () => window.location.href = '/sign-up'}
          className="rounded-md"
        >
          <ChevronUp className="mr-1 h-4 w-4" />
          Upvote {votes}
        </Button>
        <a
          href={post.postURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
          onClick={(e) => e.stopPropagation()} // Prevent the card click event from firing
        >
          View
        </a>
      </CardFooter>
    </Card>
  );
}
