import { eleganceServerClient } from "@/lib/elegance/server-client";
import { User } from "@/types/user";

export function createUser(value: Omit<User, 'ID' | 'CreatedAt' | 'UpdatedAt' | 'avatar'>) {
  return eleganceServerClient.controllers.insertOne({ collection: "users", value });
}
