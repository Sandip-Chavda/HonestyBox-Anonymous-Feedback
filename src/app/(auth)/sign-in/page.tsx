"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn, SignInResponse } from "next-auth/react";

const SigninPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // console.log(data);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    // console.log(result)

    // if (result?.error) {
    //   toast.error("Incorrect username or password, try again!🚫");
    // }

    // if (result?.url) {
    //   router.replace("/dashboard");
    //   toast.success("Login Successfully...🎊");
    // }

    //----------Another way -------//
    handleResult(result);
  };

  const handleResult = (result: SignInResponse | undefined) => {
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast.error("Incorrect username or password, try again!🚫");
      } else {
        toast.success("Login Successfully...🎊");
      }
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  //----------- Demo user or Login ----------//

  const [loading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    setIsLoading(true);

    try {
      const demoCredentials = {
        identifier: "DemoUser",
        password: "cylonescorpion@gmail.com",
      };

      const result = await signIn("credentials", {
        redirect: false,
        ...demoCredentials,
      });
      handleResult(result);

      toast.success("Demo account login successfully...");
    } catch (error) {
      console.log("Error in demo login ", error);
      setIsLoading(false);
      toast.error("Failed to login with demo acccount!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-6">
            Sign in to HonestyBox
          </h1>
          <p className="mb-4">Welcome back! Please sign in to continue</p>
        </div>

        {/* Form Component */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com / Sandip"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="●●●●●●●●●●●"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                  </>
                ) : (
                  "Sign in →"
                )}
              </Button>

              <Button
                disabled={loading}
                type="button"
                onClick={handleDemoLogin}
                variant="outline"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                  </>
                ) : (
                  "Demo Account →"
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* Form Component */}
        <div className="text-center mt-4">
          <p>Don’t have an account?</p>
          <Link
            href="/sign-up"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
