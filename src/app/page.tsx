import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Home</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="destructive" type="submit">
          Sign Out
        </Button>
      </form>
      <div>{JSON.stringify(session?.user)}</div>
    </main>
  );
}
