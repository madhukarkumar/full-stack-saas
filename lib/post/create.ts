import { eleganceServerClient } from "@/lib/elegance/server-client";
import { Post } from "@/types/post";

interface CreatePostParams {
  postName: string;
  postDetails: string;
  userEmail: string;
  postImageURL: string;
  postURL: string;
}

export async function createPost(params: CreatePostParams): Promise<Post> {
  const { postName, postDetails, userEmail, postImageURL, postURL } = params;

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const result = await eleganceServerClient.controllers.insertOne({
    collection: "startupPosts",
    value: {
      postName,
      postDetails,
      userEmail,
      postImageURL,
      postURL,
      postVotes: 0,
      CreatedAt: createdAt,
      UpdatedAt: updatedAt,
    },
  });

  if (!('post_id' in result)) {
    throw new Error('Failed to create post: Missing post_id in the result');
  }

  return result as Post;
}
