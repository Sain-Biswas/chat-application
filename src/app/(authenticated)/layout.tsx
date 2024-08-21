import CurrentUserDropdown from "@/components/dashboard/CurrentUserDropdown";
import SideBarLinkButton from "@/components/dashboard/SideBarLinkButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { HomeIcon, StarIcon } from "@radix-ui/react-icons";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col-reverse md:flex-row">
      <aside className="flex h-10 w-screen flex-col items-center border-2 border-red-500 p-1 md:h-screen md:w-16 md:justify-between md:py-2">
        <TooltipProvider>
          <SideBarLinkButton text="Dashboard" link="/dashboard">
            <HomeIcon />
          </SideBarLinkButton>
        </TooltipProvider>

        <div className="flex flex-col gap-2">
          <TooltipProvider>
            <SideBarLinkButton text="Starred" link="/starred">
              <StarIcon />
            </SideBarLinkButton>
          </TooltipProvider>
          <Separator />
          <CurrentUserDropdown />
        </div>
      </aside>
      <main className="flex-grow border-2 border-pink-500">
        <ScrollArea className="h-[calc(100vh-2.5rem)] md:h-screen">
          {children}
        </ScrollArea>
      </main>
    </div>
  );
}
