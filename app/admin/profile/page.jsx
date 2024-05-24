import { auth, signOut } from "@/app/auth";

const page = async () => {
  const session = await auth();
  return (
    <>
      <div>Admin Profile Page</div>
      {JSON.stringify(session?.user)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="p-2 rounded-sm border">
          Logout
        </button>
      </form>
    </>
  );
};

export default page;
