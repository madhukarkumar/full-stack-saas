import { writeFile } from "fs/promises";
import path from "path";

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { createPost } from "@/lib/post/create";
import { getPosts } from "@/lib/post/get-many";

export const dynamic = "force-dynamic";

function handleError(error: unknown) {
  console.error(error);
  const _error = typeof error === "object" && error && "message" in error ? `${error.message}` : "Error";
  return NextResponse.json({ error: _error }, { status: 500 });
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const offset = +(searchParams.get("offset") ?? 0);
    const limit = +(searchParams.get("limit") ?? 10);
    const posts = await getPosts({ offset, limit });
    return NextResponse.json(posts);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const postName = formData.get("postName") as string;
    const postDetails = formData.get("postDetails") as string;
    const userEmail = formData.get("userEmail") as string;
    const postURL = formData.get("postURL") as string;
    const image = formData.get("image") as File;

    if (!postName || !postDetails || !userEmail || !postURL || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const imageFileName = `${Date.now()}_${image.name}`;
    const imagePath = path.join(process.cwd(), "public", "images", imageFileName);

    await writeFile(imagePath, buffer);

    const newPost = await createPost({
      postName,
      postDetails,
      userEmail,
      postImageURL: `/images/${imageFileName}`,
      postURL,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
