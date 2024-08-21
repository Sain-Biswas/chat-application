"use server";

import { signOut } from "@/lib/auth";

export default async function signOutUser() {
  await signOut();
}
