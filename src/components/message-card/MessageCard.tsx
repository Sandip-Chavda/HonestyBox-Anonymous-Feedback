"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Message } from "@/model/User";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import toast from "react-hot-toast";
import dayjs from "dayjs";

interface MessageCardProps {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const formattedCreatedAt = dayjs(message.createdAt).format(
    "MMM D, YYYY h:mm A"
  );

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );

      toast.success("Message deleted successfully...");
      // if you not use as string use //@ts-ignore
      onMessageDelete(message._id as string);
    } catch (error) {
      toast.error("Failed to delete message, try again later!");
    }
  };

  return (
    <Card className="bg-slate-200 dark:bg-gray-950 border-[1.2px] border-[#804dff]">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm md:text-base break-all overflow-hidden">
            {message.content}
          </CardTitle>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-700 dark:text-gray-300">
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-[1.5px] border-[#804dff] hover:bg-[#804dff] dark:text-white hover:text-white text-black">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white hover:bg-red-700"
                  onClick={handleDeleteConfirm}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2">
          {/* {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")} */}
          {formattedCreatedAt}
        </div>
      </CardHeader>
    </Card>
  );
};

export default MessageCard;
