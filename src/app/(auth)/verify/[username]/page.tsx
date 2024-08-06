"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const VerifyAccountPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setLoading(true);

    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast.success("User verified successfully");

      router.replace(`/sign-in`);
      setLoading(false);
    } catch (error) {
      console.error("Unexpacted error occured ", error);

      setLoading(false);

      toast.error("Something went wrong please try again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-950 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 dark:bg-gray-800 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">
            Enter the verification code sent to your email.
          </p>
        </div>

        {/* Form componet */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col items-center justify-center w-full mx-auto"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-center flex items-center justify-center mb-4">
                    Enter Your Verification OTP Here
                  </FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <InputOTP
                      className="w-full flex items-center justify-center text-center"
                      {...field}
                      maxLength={6}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          className="dark:border dark:border-white/60"
                          index={0}
                        />
                        <InputOTPSlot
                          className="dark:border dark:border-white/60"
                          index={1}
                        />
                        <InputOTPSlot
                          className="dark:border dark:border-white/60"
                          index={2}
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          className="dark:border dark:border-white/60"
                          index={3}
                        />
                        <InputOTPSlot
                          className="dark:border dark:border-white/60"
                          index={4}
                        />
                        <InputOTPSlot
                          className="dark:border dark:border-white/60"
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="" type="submit">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
        {/* Form componet */}
      </div>
    </div>
  );
};

export default VerifyAccountPage;
