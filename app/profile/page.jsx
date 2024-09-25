import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getUserProfile } from "./actions";

const page = async () => {
 const response = await getUserProfile();
 const date = new Date(response?.createdAt);
const formattedDate = date.toLocaleString();
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
              <span className="bold">Name : </span>{response?.name}
            </p>
            <p className="my-4">
              <span className="bold ">Email : </span>{response?.email}
            </p>
            <p className="my-4">
              <span className="bold ">Education : </span>{response?.education}
            </p>
            <p className="my-4">
              <span className="bold ">Role : </span>{response?.role}
            </p>
            <p className="my-4">
              <span className="bold ">Registered at : </span>{formattedDate}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default page;
