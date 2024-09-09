"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Markdown from "react-markdown";
import { z } from "zod";

import { eleganceClient } from "@/lib/elegance/client";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book } from "@/types/book";
import { ComponentProps } from "@/types/ui";

export type ChatContainerProps = ComponentProps<"div", { books: Book[] }>;

type Message = { content: string; role: "user" | "assistant"; createdAt: number };

const formSchema = z.object({
  content: z.string().min(1).max(1024),
});

type FormSchema = z.infer<typeof formSchema>;

const functions = [
  {
    name: "getPopularBooks",
    description: "Get a list of popular books",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

export function ChatContainer({ className, books, ...props }: ChatContainerProps) {
  const [activeBook, setActiveBook] = useState<Book["embeddingCollectionName"]>(
    books.length > 0 ? books[0].embeddingCollectionName : "",
  );

  const [messages, setMessages] = useState<Record<string, Message[]>>(() =>
    books.reduce(
      (acc, book) => ({
        ...acc,
        [book.embeddingCollectionName]: [],
      }),
      {} as Record<string, Message[]>,
    ),
  );

  const { execute, isLoading } = eleganceClient.hooks.useSearchChatCompletion();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit: SubmitHandler<FormSchema> = async (values) => {
    if (!activeBook) return;

    try {
      setMessages((messages) => ({
        ...messages,
        [activeBook]: [
          ...messages[activeBook],
          { createdAt: new Date().getTime(), content: values.content, role: "user" },
        ],
      }));

      const completion = await execute({
        collection: activeBook,
        model: "gpt-4o",
        systemRole:
          "You are a helpful assistant that can answer questions about the book. You can also provide summaries, explanations, and more.",
        prompt: values.content,
        maxContextLength: 5000,
      });

      if (completion?.content) {
        setMessages((messages) => ({
          ...messages,
          [activeBook]: [
            ...messages[activeBook],
            { createdAt: new Date().getTime(), content: completion.content!, role: "assistant" },
          ],
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
    }
  };

  const currentMessages = activeBook ? messages[activeBook] || [] : [];

  return (
    <div
      {...props}
      className={cn("mx-auto flex h-full w-full max-w-6xl flex-1 flex-col gap-4", className)}
    >
      <Card className="relative flex flex-1 flex-col">
        <div className="sticky top-20 z-10 flex items-center justify-center border-b bg-background p-4">
          <Select
            value={activeBook}
            onValueChange={setActiveBook}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select book" />
            </SelectTrigger>
            <SelectContent>
              {books.map((book) => (
                <SelectItem
                  key={book.id}
                  value={book.embeddingCollectionName}
                >
                  <h6 className="line-clamp-1 w-full max-w-64">{book.title}</h6>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-4">
            <ul className="flex flex-col gap-4">
              {currentMessages.map((message) => {
                const date = new Date(message.createdAt).toLocaleTimeString("en-US", { hour12: false });
                return (
                  <li
                    key={message.createdAt}
                    className={cn("max-w-[75%]", message.role === "user" && "self-end")}
                  >
                    <Card className="px-4 py-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium capitalize">{message.role}</h4>
                        <time
                          className="text-xs text-muted-foreground"
                          dateTime={date}
                        >
                          {date}
                        </time>
                      </div>
                      <div className="mt-1 w-full max-w-full [&_pre]:overflow-auto">
                        <Markdown>{message.content}</Markdown>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {isLoading && (
          <span className="absolute bottom-4 left-4 flex items-center gap-1 text-sm text-muted-foreground">
            <Loader className="size-5" />
            Assistant is replying...
          </span>
        )}
      </Card>

      <Form {...form}>
        <form
          className="relative"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="h-12 py-0 pl-4 pr-20 text-base"
                    placeholder="Message"
                    disabled={isLoading || !activeBook}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="absolute right-0 top-1/2 h-full -translate-y-1/2 rounded-bl-none rounded-tl-none"
            disabled={isLoading || !activeBook}
          >
            <SendHorizontal />
          </Button>
        </form>
      </Form>
    </div>
  );
}
