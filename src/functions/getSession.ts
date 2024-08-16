import { auth } from "@/lib/auth";

export default async function getSession() {
  const session = await auth();
  return session;
}
