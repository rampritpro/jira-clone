"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

import { useLogin } from "../api/use-login";
import { loginSchema } from "../schemas";
import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInCard = () => {
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      mutate(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Card className="h-full w-full md:w-[350px] border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Jira Sign In</CardTitle>
        <CardDescription>Sign in to your Jira account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.smith@email.com"
                      type="email"
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
                    <PasswordInput
                      placeholder="*******************"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton loading={isPending} type="submit" className="w-full">
              Sing In
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
      <Separator />
      <CardContent className="space-y-4 py-4 w-full">
        <Button className="w-full" variant={"outline"}>
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button className="w-full" variant={"outline"}>
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <CardFooter className="w-full pt-4">
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-700 underline" href={"/sign-up"}>
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
