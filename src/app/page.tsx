import { ModeToggle } from "@/components/mode-toggler";
import { Button } from "@/components/ui/button";
import { Link1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-4">
      <header className="flex w-full items-center justify-between">
        <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          WaveChat
        </div>
        <nav>
          <ModeToggle />
        </nav>
      </header>

      <section className="flex flex-col items-center gap-4">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 lg:text-4xl">
          The real-time chat application that don&apos;t spy on you.
        </h1>

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Join today to connect to people you care about without the worry of
          this world.
        </h3>

        <article className="flex gap-2">
          <Button variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button variant="default">
            <Link href="/signin">Sign In</Link>
          </Button>
        </article>
      </section>

      <footer className="flex items-center justify-center gap-2">
        <p className="text-sm font-medium leading-none">
          We are open source, visit ous and leave your valuable feedback and
          feature request on{" "}
        </p>
        <Button variant="link" className="p-0">
          <Link href="" target="_blank" className="flex gap-0.5">
            <p className="text-sm font-bold leading-none">Github</p>
            <Link1Icon />
          </Link>
        </Button>
      </footer>
    </main>
  );
}
