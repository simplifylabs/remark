import { useRouter } from "next/router";
import useTitle from "@web/hooks/useTitle";

export default function Maintance() {
  useTitle("We're Offline!");
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="flex flex-col gap-1 px-8 text-left md:px-0">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          We'll be back soon!
        </h1>
        <p className="mt-2 text-lg text-gray-700 md:text-xl">
          Our servers are currently under maintenance.
          <br />
          Please try again later!
        </p>
        <div className="flex justify-center items-center mt-10 w-full">
          <button
            onClick={() => router.back()}
            className="px-12 w-min btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
