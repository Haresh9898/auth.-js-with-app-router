import { signOut } from "@/app/auth";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeBtn } from "./ThemeBtn";

const { auth } = NextAuth(authConfig);

const Header = async () => {
  const session = await auth();
  return (
    <>
      <Sheet>
        <div className="container  p-5 flex items-center justify-between">
          <h1 className="text-xl">Logo</h1>
          <ul className="hidden md:flex items-center gap-3 justify-around">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/todo"}>Todo</Link>
            </li>
            {session?.user ? (
              <li>
                <Link href={"/profile"}>Profile</Link>
              </li>
            ) : null}
            {session?.user?.role == "admin" ? (
              <li>
                <Link href={"/admin/dashboard"}>Dashboard</Link>
              </li>
            ) : null}
            {session?.user ? null : (
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
            )}
          </ul>
          <div className="flex items-center gap-5">
            <ThemeBtn />
            <SheetTrigger>
              <Menu className="md:hidden" />
            </SheetTrigger>
            {session?.user?.id && (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="px-2 py-1 bg-red-500 text-white rounded-sm hidden md:block"
                >
                  Logout
                </button>
              </form>
            )}
          </div>
        </div>
        <MobileHead />
      </Sheet>
    </>
  );
};

export default Header;

async function MobileHead() {
  const session = await auth();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetDescription>
          <ul className="flex flex-col justify-center gap-10  h-screen ">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/todo"}>Todo</Link>
            </li>
            {session?.user ? (
              <li>
                <Link href={"/profile"}>Profile</Link>
              </li>
            ) : null}
            {session?.user?.role == "admin" ? (
              <li>
                <Link href={"/admin/dashboard"}>Dashboard</Link>
              </li>
            ) : null}
            {session?.user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="px-2 py-1 bg-red-500 text-white rounded-sm "
                >
                  Logout
                </button>
              </form>
            ) : (
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
