import { Metadata } from "next";

import { getBooks } from "@/lib/book/get-many";
import { ChatContainer } from "@/components/chat/container";

export const metadata: Metadata = { title: "Chat" };

export default async function ChatPage() {
  const books = await getBooks();
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] pt-4 px-4">
      <ChatContainer books={books} />
    </div>
  );
}
