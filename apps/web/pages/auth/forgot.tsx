import { useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import useExtension from "@web/hooks/useExtension";
import Link from "next/link";
import Alert from "@web/components/Alert";
import Title from "@web/components/Title";
import Input from "@web/components/Input";

export default function Forgot() {
  const { send } = useExtension();

  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>();

  async function submit(e: any) {
    e.preventDefault();

    const res = await send("FORGOT", {
      email,
    });

    if (res.success) return setSent(true);
    if (res.error) return setError(res.error);
    if (res.redirect) return router.push(res.redirect);
    setError("Something unexpected happened");
  }

  return (
    <>
      <NextSeo
        title="Forgot Password"
        description="Forgot your password? Reset it here"
      />
      {sent ? (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center px-5">
          <Title
            title="Email Sent"
            subtitle="Password-Reset"
            primary
            titleClassName="text-4xl sm:text-5xl"
          />
          <p className="max-w-[23rem] text-center text-lg text-gray-700">
            We&apos;ve just sent you an email including a reset link. Please
            check your inbox!
          </p>
        </div>
      ) : (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-5xl font-extrabold">Forgot</h1>
            <p className="text-lg text-gray-700">
              Already know your password?{" "}
              <Link href="/auth/signin">
                <a className="text-lg">Sign In</a>
              </Link>
            </p>
          </div>
          <form
            onSubmit={submit}
            className="flex w-[90vw] flex-col gap-2 rounded-xl bg-white p-8 shadow sm:w-[22rem]"
          >
            <Input
              type="email"
              name="Email"
              autoComplete="email"
              set={setEmail}
            />
            {error && <Alert type="ERROR" text={error} />}
            <input className="btn-primary mt-2" type="submit" value="Send" />
          </form>
        </div>
      )}
    </>
  );
}
