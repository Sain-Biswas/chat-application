import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ReactNode } from "react";

interface SideBarLinkButtonProps {
  children: ReactNode;
  text: string;
  link: string;
}

export default function SideBarLinkButton({
  children,
  text,
  link,
}: SideBarLinkButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <Link href={link}>{children}</Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="hidden md:block" side="right">
        <p className="scroll-m-20 text-xs font-semibold tracking-tight">
          {text}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
