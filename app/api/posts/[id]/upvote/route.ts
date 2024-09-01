import { NextRequest, NextResponse } from "next/server";
import { updatePostVotes } from "@/lib/post/update-votes";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("Upvote route called with params:", params);
  
  try {
    const postId = parseInt(params.id, 10);
    if (isNaN(postId)) {
      console.error("Invalid post ID:", params.id);
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    console.log("Calling updatePostVotes with postId:", postId);
    await updatePostVotes(postId);
    console.log("updatePostVotes completed successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in upvote route:", error);
    let errorMessage = "Failed to update post votes";
    let statusCode = 500;

    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      errorMessage = error.message;

      if (error.message.includes("updateMany method not found")) {
        statusCode = 503; // Service Unavailable
        errorMessage = "Database service is currently unavailable";
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}