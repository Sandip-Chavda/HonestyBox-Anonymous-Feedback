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
    <div className="container mx-auto my-8 p-6 bg-white dark:bg-gray-700 rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form
          className=" space-y-6"
          onSubmit={form.handleSubmit(onMessageSubmmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <>
                <FormLabel>
                  {" "}
                  Send Anonymous Message to @{params.username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here "
                    className="resize-none "
                    {...field}
                  />
                </FormControl>
              </>
            )}
          ></FormField>
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading || !watchContent}>
              Send It
            </Button>
          )}
        </form>
      </Form>
      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            className="my-4"
            onClick={onSuggestMessage}
            disabled={isSuggestButtonLoading}
          >
            Suggest Message{" "}
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader className="font-bold">Suggested Messages</CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {(text ? StringSplit(text) : StringSplit(initialMessageString)).map(
              (data, index) => (
                <Button
                  className="bg-transparent border dark:bg-gray-300 text-black hover:bg-slate-100 w-full text-left whitespace-normal h-auto py-2 dark:hover:bg-black dark:hover:text-white transition-all duration-200 dark:hover:border-white"
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
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}

export default UserPage;
