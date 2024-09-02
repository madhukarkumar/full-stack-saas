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

  const postData = {
    postName,
    postDetails,
    userEmail: userEmail.slice(0, 255),
    postURL: postURL.slice(0, 255),
    postVotes: 0,
    postImageURL: postImageURL.slice(0, 255),
  };

  console.log("Attempting to create post with data:", JSON.stringify(postData, null, 2));

  try {
    const result = await eleganceServerClient.controllers.insertOne({
      collection: "startupPosts",
      value: postData,
    });

    console.log("Insert result:", JSON.stringify(result, null, 2));

    if (!result || typeof result !== "object") {
      throw new Error("Failed to create post: Invalid result from insertOne");
    }

    // Use type assertion to treat result as any
    const anyResult = result as any;

    const createdPost: Post = {
      ...postData,
      post_id: anyResult.post_id ?? anyResult.insertedId ?? anyResult._id ?? anyResult.id,
      CreatedAt: anyResult.CreatedAt ?? new Date().toISOString(),
      UpdatedAt: anyResult.UpdatedAt ?? new Date().toISOString(),
    };

    if (!createdPost.post_id) {
      throw new Error("Failed to create post: Unable to determine post_id");
    }

    console.log("Created post:", JSON.stringify(createdPost, null, 2));

    return createdPost;
  } catch (error) {
    console.error("Error creating post:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
}
