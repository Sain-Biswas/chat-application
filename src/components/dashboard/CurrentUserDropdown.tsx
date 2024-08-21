"use client";
import { Users } from "@/database/schema/users";
import getCurrentUser from "@/functions/getCurrentUser";
import signOutUser from "@/functions/signOutUser";
import userStore from "@/store/userStore";
import { PersonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStore } from "zustand";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function CurrentUserDropdown() {
  const [user, setUser] = useState<Users | null>(useStore(userStore).user);
  const setStoreUser = useStore(userStore).setUser;

  useEffect(() => {
    if (user === null) {
      (async () => {
        const gotUser = await getCurrentUser();
        setStoreUser(gotUser);
        setUser(gotUser);
      })();
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mb-5" side="right" sideOffset={10}>
        <DropdownMenuLabel>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form
            action={async () => {
              await signOutUser()
                .then(() => toast.success("User sign out successfull"))
                .catch(() => toast.error("Something went wrong"));
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
