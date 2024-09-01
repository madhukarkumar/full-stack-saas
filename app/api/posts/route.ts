import { NextRequest, NextResponse } from "next/server";

import { getPosts } from "@/lib/post/get-many";

function handleError(error: unknown) {
  console.error(error);
  const _error = typeof error === "object" && error && "message" in error ? `${error.message}` : "Error";
  return NextResponse.json({ error: _error }, { status: 500 });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = +(searchParams.get("offset") ?? 0);
    const limit = +(searchParams.get("limit") ?? 10);
    const posts = await getPosts({ offset, limit });
    return NextResponse.json(posts);
  } catch (error) {
    return handleError(error);
  }
}