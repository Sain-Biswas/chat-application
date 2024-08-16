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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SignInServer from "@/functions/sign-in.server";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be 8 characters long",
  }),
});

export default function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const signinForm = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    setIsLoading(true);

    const response = await SignInServer(values.email, values.password);
    toast(response?.toString() || "Else");
    if (response === 200) router.push("/");
    setIsLoading(false);
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your credentials below to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <Form {...signinForm}>
          <form
            onSubmit={signinForm.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={signinForm.control}
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
              control={signinForm.control}
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-t-0 text-transparent">
                  .
                </div>
              )}
              Submit
            </Button>
          </form>
        </Form>

        <div className="mt-2 flex justify-center gap-1 text-xs text-muted-foreground">
          <p>
            don&apos;t have an account?{" "}
            <Link href="/signup" className="hover:underline">
              Sign up
            </Link>{" "}
          </p>
        </div>
      </CardContent>
    </>
  );
}
