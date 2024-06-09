import Loader from "@/components/Loader";

const loading = () => {
  return (
    <div className="container  flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  );
};

export default loading;
