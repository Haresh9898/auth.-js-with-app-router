import { auth, signOut } from "../auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileBtn from "./components/ProfileBtn";
import { getUserProfile } from "./actions";

const page = async () => {
 const respone = await getUserProfile();
  return (
    <>
      {/* {
        JSON.stringify(session.user)
      } */}
      <div className="w-full md:w-1/2 mx-auto lg:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="my-4">
              <span className="bold">Name : </span>{respone?.name}
            </p>
            <p className="my-4">
              <span className="bold ">Email : </span>{respone?.email}
            </p>
            <p className="my-4">
              <span className="bold ">Education : </span>{respone?.education}
            </p>
            <p className="my-4">
              <span className="bold ">Registered at : </span>{String(respone?.createdAt).split("T")[0]}
            </p>
            <ProfileBtn />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default page;
