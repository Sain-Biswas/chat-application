import { ModeToggle } from "@/components/mode-toggler";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Link1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import GoogleAuthentication from "./GoogleAuthentication";
import authenticationSVG from "#/authentication.svg";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <section className="hidden min-h-screen flex-col items-center justify-between bg-accent p-4 lg:flex">
        <div className="w-full">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
            WaveChat
          </h1>
        </div>
        <div className="relative aspect-square max-w-96 flex-grow">
          <Image
            src={authenticationSVG}
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <blockquote className="mt-6 border-l-2 border-accent-foreground pl-6 text-center italic">
          Connect with people you care about
        </blockquote>
      </section>
      <section className="flex min-h-screen flex-col justify-between p-2 md:p-4">
        <nav className="flex w-full justify-between lg:justify-end">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:hidden">
            WaveChat
          </h1>
          <ModeToggle />
        </nav>
        <article className="flex justify-center">
          <Card className="max-w-96 flex-grow border-none shadow-none">
            {children}
            <CardFooter className="">
              <GoogleAuthentication />
            </CardFooter>
          </Card>
        </article>
        <article className="text-center text-xs lg:text-sm">
          We are open source, you can visit{" "}
          <Button variant="link">
            {" "}
            <Link
              href="https://github.com/Sain-Biswas/chat-application"
              target="_blank"
              className="flex items-center gap-1"
            >
              <p>Github</p> <Link1Icon />
            </Link>{" "}
          </Button>{" "}
          for more information.
        </article>
      </section>
    </main>
  );
}
