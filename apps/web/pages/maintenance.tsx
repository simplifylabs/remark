import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function Maintance() {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title="We're Offline!"
        description="Our servers are currently under maintenance."
      />
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="flex flex-col gap-1 px-8 text-left md:px-0">
          <h1 className="text-4xl font-extrabold md:text-5xl">
            We&apos;ll be back soon!
          </h1>
          <p className="mt-2 text-lg text-gray-700 md:text-xl">
            Our servers are currently under maintenance.
            <br />
            Please try again later!
          </p>
          <div className="mt-10 flex w-full items-center justify-center">
            <button
              onClick={() => router.back()}
              className="btn-primary w-min px-12"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
