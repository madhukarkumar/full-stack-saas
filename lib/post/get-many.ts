import { eleganceServerClient } from "@/lib/elegance/server-client";
import { Post, PostRow } from "@/types/post";

export async function getPosts(filter: { offset?: number; limit?: number } = {}): Promise<Post[]> {
  const { offset = 0, limit = 10 } = filter;

  const posts = await eleganceServerClient.controllers.findMany<PostRow[]>({
    collection: "startupPosts",
    extra: `ORDER BY CreatedAt DESC LIMIT ${limit} OFFSET ${offset}`,
  });

  return posts.map(post => ({
    ...post,
    postDetails: post.postDetails.substring(0, 100) + (post.postDetails.length > 100 ? '...' : '') // Truncate details for the card view
  }));
}