import { db } from "@/database/db";
import { users } from "@/database/schema/users";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { compareSync } from "bcryptjs";
import { eq, InferSelectModel } from "drizzle-orm";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: InferSelectModel<typeof users> & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1);

        if (user.length < 1) {
          throw new Error("404");
        }

        const { password } = user[0];

        const isCorrectPasword = compareSync(
          credentials.password as string,
          password as string,
        );

        if (!isCorrectPasword) {
          throw new Error("406");
        }

        return user[0];
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
