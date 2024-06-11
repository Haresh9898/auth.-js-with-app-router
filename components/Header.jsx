import { signOut } from "@/app/auth";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import Link from "next/link";
import React from "react";

const { auth } = NextAuth(authConfig);

const Header = async () => {
  const session = await auth();
  return (
    <>
      <div className="container  p-5 flex items-center justify-between">
        <h1 className="text-xl">Logo</h1>
        <ul className="flex items-center gap-3 justify-around">
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
      </div>
    </>
  );
};

export default Header;
