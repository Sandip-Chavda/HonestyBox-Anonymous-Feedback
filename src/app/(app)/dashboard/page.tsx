"use client";

import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/message-card/MessageCard";

const DashboardPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { watch, register, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");

      // console.log(".............", response.data.isAcceptingMessage);

      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error) {
      console.error("Error in accepting messages!", error);

      // const axiosErorr = error as AxiosError<ApiResponse>;

      toast.error("Something went wrong to accept message!");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        console.log(response.data.messages);
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.success("Messages refreshed");
        }
      } catch (error) {
        // const axiosError = error as AxiosError<ApiResponse>;
        toast.success("There is no new messages");
      } finally {
        setLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setLoading, setMessages]
  );

  // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  // Handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success("Message accepting status updated successfully...");
    } catch (error) {
      // const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Failed update message accepting status, please try again!");
    }
  };

  if (!session || !session.user) {
    return (
      <div className="dark:text-white text-black">
        Please login to view dashboard, <Link href="/sing-in">Sign in</Link>
      </div>
    );
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);

    toast.success("Link copied to clipboard.");
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 dark:bg-gray-800 bg-white border shadow-md rounded-lg w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-base font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center gap-5">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full rounded-lg py-2.5 px-5 text-[#804dff] font-semibold dark:bg-gray-950 bg-slate-200"
          />
          <Button
            className="bg-[#804dff] text-white hover:bg-[#6f36ff] font-medium"
            onClick={copyToClipboard}
          >
            Copy
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2 flex">
          Accept Messages:{" "}
          {acceptMessages ? (
            <p className="bg-green-500 px-2 ml-2 rounded-xl">On</p>
          ) : (
            <p className="bg-red-500 px-2 ml-2 rounded-xl">Off</p>
          )}
        </span>
      </div>
      <Separator className="bg-[#804dff]" />

      <Button
        className="mt-4 bg-[#804dff] text-white hover:bg-[#6f36ff]"
        variant="default"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" /> Refreshing...
          </>
        ) : (
          <>
            <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
          </>
        )}
      </Button>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
