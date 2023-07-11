import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button, buttonVariants } from "../ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import CustomUserButton from "./CustomUserButton";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 border-b shadow-sm backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 border-slate-300 dark:border-slate-700">
      <div className="container flex items-center justify-between w-full mx-auto max-w-7xl">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Text Similarity v1.0
        </Link>

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="items-center hidden gap-4 md:flex">
          <Link
            href="/documentation"
            className={buttonVariants({ variant: "ghost" })}>
            Documentation
          </Link>

          <Link href="/about" className={buttonVariants({ variant: "ghost" })}>
            About
          </Link>

          <SignedIn>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href="/dashboard">
              Dashboard
            </Link>
            <ThemeToggle />

            <CustomUserButton />
          </SignedIn>

          <SignedOut>
            <ThemeToggle />

            <SignInButton mode="modal">
              <Button>Giriş Yap</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
