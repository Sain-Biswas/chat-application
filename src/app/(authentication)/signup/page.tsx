"use client";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export const signupSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be 8 characters long",
  }),
});

export default function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setIsCreating(true);
    await axios
      .post("/api/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      .then((response: AxiosResponse) =>
        toast.success(response.data.message, {
          description: response.data.description,
        }),
      )
      .catch((error: AxiosError) => toast.error("Internal Error"))
      .finally(() => setIsCreating(false));
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={signupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-600">*</span>{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-600">*</span>{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="sample@wave.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <span className="text-red-600">*</span>{" "}
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        size="icon"
                        onClick={(event) => {
                          event.preventDefault();
                          setShowPassword((curr) => !curr);
                        }}
                      >
                        {showPassword ? (
                          <EyeOpenIcon className="h-5 w-5" />
                        ) : (
                          <EyeClosedIcon className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating && (
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-t-2 text-transparent">
                  .
                </div>
              )}
              Submit
            </Button>
          </form>
        </Form>

        <div className="mb-2 mt-4 flex justify-center gap-1 text-xs text-muted-foreground">
          <p>
            already have an account?{" "}
            <Link href="/signin" className="hover:underline">
              Sign in
            </Link>{" "}
          </p>
        </div>
      </CardContent>
    </>
  );
}
