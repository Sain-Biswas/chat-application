"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export default async function SignInServer(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return 200;
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      console.log(cause);
      switch (type) {
        case "CallbackRouteError": {
          const m = cause?.err?.message.toString();
          if (m === "404") return 404;
          else if (m === "406") return 406;
          else return 900;
        }
        default:
          return 909;
      }
    }
  }
}
