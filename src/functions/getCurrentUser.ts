import { db } from "@/database/db";
import { users } from "@/database/schema/users";
import { eq } from "drizzle-orm";
import getSession from "./getSession";

export default async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email as string))
    .limit(1);

  if (user.length < 1) return null;

  return user[0];
}
