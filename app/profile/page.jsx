import { auth, signOut } from "../auth";

const page = async() => {
  const session = await auth()
  return (
    <>
      <div>Profile</div>
      {
        JSON.stringify(session.user)
      }
     
    </>
  );
};

export default page;
