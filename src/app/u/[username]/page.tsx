"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";

function UserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestButtonLoading, setIsSuggestButtonLoading] = useState(false);
  const [text, setText] = useState("");
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });
  const watchContent = form.watch("content");

  const { data: session } = useSession();

  const initialMessageString =
    "You are a great software engineer known for your impressive skills and achievements in the field.||I greatly admire you for your exceptional skills and expertise.||Hey, would you like to join our team? There's so much to learn for all of us.";
  const params = useParams<{ username: string }>();
  const specialChar = "||";

  const StringSplit = (sentence: string): string[] => {
    return sentence.split(specialChar);
  };

  async function onMessageSubmmit(data: z.infer<typeof messageSchema>) {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/send-message", {
        username: params.username,
        content: data.content,
      });
      if (response.data.success) {
        toast.success("Message sent successfully...");
      }

      form.setValue("content", "");
    } catch (error: any) {
      console.log(error);
      toast.error("User not accepting messages or try again!");
    } finally {
      setIsLoading(false);
    }
  }

  function handleTextMessage(data: string) {
    form.setValue("content", data);
  }

  async function onSuggestMessage() {
    const a = "notavailable";

    if (a === "notavailable") {
      // toast.error("AI suggested message will available soon!");

      toast("Sorry, this is unavailable for now!", {
        icon: "😔🙇🏻",
      });

      return;
    }

    setIsSuggestButtonLoading(true);
    try {
      const result = await axios.post("/api/suggest-messages");
      const response = result.data.message;
      console.log("New suggested messages:", response);
      setText(response); // This should trigger a re-render with new messages
    } catch (error: any) {
      console.error("Error suggesting messages:", error);
      toast.error("Something went wrong while generate message");
    } finally {
      setIsSuggestButtonLoading(false);
    }
  }

  return (
    <div className="container mx-auto my-8 p-6 border dark:bg-gray-700 rounded-lg shadow-lg max-w-4xl">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Send Anonymous Message to{" "}
        <span className="text-4xl !font-bold text-[#804dff] dark:text-[#9267ff]">
          @{params.username}
        </span>
      </h1>
      <Form {...form}>
        <form
          className=" space-y-4"
          onSubmit={form.handleSubmit(onMessageSubmmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <>
                <FormLabel>
                  Write your message here without revealing your identity
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a message with a minimum of 10 characters..."
                    className="resize-none bg-slate-200 dark:bg-gray-950"
                    {...field}
                  />
                </FormControl>
              </>
            )}
          ></FormField>
          {isLoading ? (
            <Button
              disabled
              className="bg-[#804dff] text-white hover:bg-[#6f36ff]"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </Button>
          ) : (
            <Button
              className="bg-[#804dff] text-white hover:bg-[#6f36ff]"
              type="submit"
              disabled={isLoading || !watchContent}
            >
              Send Message
            </Button>
          )}
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <Separator className="bg-[#804dff]" />

        <div className="space-y-4">
          <div className="text-center text-2xl font-bold">
            Generate message using AI
          </div>

          <Button
            className="my-4 bg-[#804dff] text-white hover:bg-[#6f36ff]"
            onClick={onSuggestMessage}
            disabled={isSuggestButtonLoading}
          >
            Generate Messages
          </Button>
        </div>
        <Card className="bg-slate-200 dark:bg-gray-950">
          <CardHeader className="font-bold text-lg">
            AI Generated Messages
          </CardHeader>

          <CardContent className="flex flex-col space-y-4">
            <p className="text-sm -mt-5 mb-2">
              Click on any message below to select it.
            </p>

            {(text ? StringSplit(text) : StringSplit(initialMessageString)).map(
              (data, index) => (
                <Button
                  className="bg-transparent border text-black w-full text-left whitespace-normal h-auto py-2 transition-all duration-200 border-[#804dff] dark:text-white hover:bg-[#804dff] hover:text-white"
                  key={index}
                  onClick={() => handleTextMessage(data)}
                >
                  {data}
                </Button>
              )
            )}
          </CardContent>
        </Card>
      </div>
      {/* <Separator className="my-6 bg-[#804dff] " /> */}
      <Separator className="bg-[#804dff] h-[1.4px] mb-6" />

      <div className="text-center">
        {session ? (
          <>
            <div className="mb-6 text-center text-2xl font-bold">
              Explore dashboard and share your link
            </div>
            <div className="flex items-center justify-center gap-3">
              <Link href={"/"}>
                <Button className="bg-transparent border-[1.5px] border-[#804dff] hover:bg-[#804dff] dark:text-white hover:text-white text-black">
                  Home
                </Button>
              </Link>
              <Link href={"/dashboard"}>
                <Button className="bg-[#804dff] text-white hover:bg-[#6f36ff] font-medium">
                  Dashboard
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 text-center text-2xl font-bold">
              Get your anonymous feedback board
            </div>
            <div className="flex items-center justify-center gap-3">
              <Link href={"/sign-up"}>
                <Button className="bg-transparent border-[1.5px] border-[#804dff] hover:bg-[#804dff] dark:text-white hover:text-white text-black">
                  Create account
                </Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button className="bg-[#804dff] text-white hover:bg-[#6f36ff] font-medium">
                  DemoUser Login
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserPage;
