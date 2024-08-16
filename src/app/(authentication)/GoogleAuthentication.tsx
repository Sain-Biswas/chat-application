import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

export default function GoogleAuthentication() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="w-full"
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t-2" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>
      <Button type="submit" variant="outline" className="flex w-full gap-2">
        <GoogleIcon className="h-4 w-4" />
        <p>Google</p>
      </Button>
    </form>
  );
}
