import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [postName, setPostName] = useState("");
  const [postDetails, setPostDetails] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("postName", postName);
    formData.append("postDetails", postDetails);
    formData.append("userEmail", userEmail);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        onSuccess();
        handleClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create post");
      }
    } catch (error) {
      setError("Error creating post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setPostName("");
    setPostDetails("");
    setUserEmail("");
    setImage(null);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleClose}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 py-4"
        >
          {error && (
            <div
              className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div>
            <Label htmlFor="postName">Post Name</Label>
            <Input
              id="postName"
              value={postName}
              onChange={(e) => setPostName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="postDetails">Post Details</Label>
            <Input
              id="postDetails"
              value={postDetails}
              onChange={(e) => setPostDetails(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="userEmail">User Email</Label>
            <Input
              id="userEmail"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
