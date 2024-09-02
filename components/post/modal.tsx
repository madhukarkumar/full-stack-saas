import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Post } from "@/types/post";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, post }) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{post.postName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative h-64 w-full">
            <Image
              src={post.postImageURL}
              alt={post.postName}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <p className="text-sm text-gray-500">{post.postDetails}</p>
          <p className="text-sm font-semibold">User Email: {post.userEmail}</p>
          <Button asChild>
            <a
              href={post.postURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Post
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
