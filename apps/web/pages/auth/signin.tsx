import { useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import useExtension from "@web/hooks/useExtension";
import Link from "next/link";
import Alert from "@web/components/Alert";
import Google from "@web/components/Google";
import Input from "@web/components/Input";

export default function SignIn() {
  const { send } = useExtension();

  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  async function submit(e: any) {
    e.preventDefault();

    const res = await send("LOGIN", {
      email,
      password,
    });

    if (res.error) return setError(res.error);
    if (res.redirect) return router.push(res.redirect);
    if (!res.success) return setError("Something unexpected happened");

    if (sessionStorage.getItem("auto") == "true")
      return router.push("/welcome");
    send("CLOSE").then((res) => !res.success && router.push("/"));
  }

  return (
    <>
      <NextSeo title="Sign In" description="Sign In to your Remark account" />
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-5xl font-extrabold">Sign In</h1>
          <p className="text-lg text-gray-700">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup">
              <a className="text-lg">Sign Up</a>
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
          <Input
            type="password"
            name="Password"
            autoComplete="current-password"
            set={setPassword}
            min={6}
            max={128}
          />
          {error && <Alert type="ERROR" text={error} />}
          <input className="btn-primary mt-2" type="submit" value="Submit" />
          <div className="mt-2 flex flex-row justify-center">
            <Link href="/auth/forgot" passHref>
              <a className="text-md">Forgot Password?</a>
            </Link>
          </div>
          <Google />
        </form>
      </div>
    </>
  );
}
