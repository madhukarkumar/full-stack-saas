import { eleganceServerClient } from "@/lib/elegance/server-client";

export async function updatePostVotes(postId: number): Promise<void> {
  console.log("updatePostVotes called with postId:", postId);
  console.log("eleganceServerClient methods:", Object.keys(eleganceServerClient));
  console.log("eleganceServerClient.controllers methods:", Object.keys(eleganceServerClient.controllers || {}));

  try {
    if (typeof eleganceServerClient.controllers?.updateMany === 'function') {
      console.log("Executing updateMany using eleganceServerClient.controllers.updateMany");
      const result = await eleganceServerClient.controllers.updateMany({
        collection: "startupPosts",
        set: "postVotes = postVotes + 1",
        where: `post_id = ${postId}`,
      });
      console.log("Update result:", result);
    } else {
      throw new Error("updateMany method not found on eleganceServerClient.controllers");
    }
  } catch (error) {
    console.error("Error updating post votes:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
}