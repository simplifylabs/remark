import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import useExtension from "@web/hooks/useExtension";
import Alert from "@web/components/Alert";
import Input from "@web/components/Input";
import Link from "next/link";

export default function Google() {
  const { send } = useExtension();

  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    if (!token || !email) router.push("/auth/signup");
    setEmail(email);
  }, []);

  async function submit(e: any) {
    e.preventDefault();

    const res = await send("GOOGLE", {
      username,
      token: sessionStorage.getItem("token"),
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
      <NextSeo title="Sign Up" description="Sign Up with Google" />
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-5xl font-extrabold">Sign Up</h1>
          <p className="text-lg text-gray-700">
            Want to use another account?{" "}
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
            type="text"
            name="Email"
            autoComplete="off"
            value={email}
            set={() => null}
            disabled
          />
          <Input
            type="text"
            name="Username"
            autoComplete="nickname"
            set={setUsername}
            min={3}
            max={20}
          />
          {error && <Alert type="ERROR" text={error} />}
          <input className="btn-primary mt-2" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
