import { eleganceServerClient } from "@/lib/elegance/server-client";
import { Book } from "@/types/book";

export function getPopularBooks() {
  return eleganceServerClient.controllers.query<Book[]>({
    query: `\
      SELECT id, title, author, rating
      FROM books
      ORDER BY rating DESC
      LIMIT 5;
    `,
  });
}
