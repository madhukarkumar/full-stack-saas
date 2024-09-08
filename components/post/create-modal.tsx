"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isAuthenticated: boolean;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSuccess, isAuthenticated }) => {
  const [postName, setPostName] = useState("");
  const [postDetails, setPostDetails] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [postURL, setPostURL] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/sign-up");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("postName", postName);
    formData.append("postDetails", postDetails);
    formData.append("userEmail", userEmail);
    formData.append("postURL", postURL);
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
    setPostURL("");
    setImage(null);
    onClose();
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] || null);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleClose}
    >
      <DialogContent className="font-['Proxima Nova', sans-serif] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isAuthenticated ? "Create a New Post" : "Sign Up to Create a Post"}
          </DialogTitle>
        </DialogHeader>
        {isAuthenticated ? (
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
              <Label
                htmlFor="postName"
                className="block text-sm font-medium text-gray-700"
              >
                Post Name
              </Label>
              <Input
                id="postName"
                value={postName}
                onChange={(e) => setPostName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <Label
                htmlFor="postDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Post Details
              </Label>
              <Input
                id="postDetails"
                value={postDetails}
                onChange={(e) => setPostDetails(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <Label
                htmlFor="userEmail"
                className="block text-sm font-medium text-gray-700"
              >
                User Email
              </Label>
              <Input
                id="userEmail"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <Label
                htmlFor="postURL"
                className="block text-sm font-medium text-gray-700"
              >
                Post URL
              </Label>
              <Input
                id="postURL"
                type="url"
                value={postURL}
                onChange={(e) => setPostURL(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <input
                ref={fileInputRef}
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <Button
                type="button"
                onClick={handleImageUpload}
                className="mr-2"
              >
                {image ? "Change Image" : "Upload Image"}
              </Button>
              {image && <span className="text-sm text-gray-600">{image.name}</span>}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </form>
        ) : (
          <div className="py-4">
            <p className="mb-4 text-center">You need to sign up or sign in to create a post.</p>
            <Button
              onClick={() => router.push("/sign-up")}
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </Button>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
