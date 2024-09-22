import authConfig from "@/auth.config";
import NextAuth from "next-auth";

export default async function Home() {
  const { auth } = NextAuth(authConfig);
  
  let session = null;

  try {
    const result = await auth();
    session = result?.user || null;
  } catch (error) {
    console.error("Error fetching auth session:", error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home page
      {session ? JSON.stringify(session) : null}
    </main>
  );
}
