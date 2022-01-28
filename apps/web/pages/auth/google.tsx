import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTitle from "@web/hooks/useTitle";
import useExtension from "@web/hooks/useExtension";
import Alert from "@web/components/Alert";
import Input from "@web/components/Input";
import Link from "next/link";

export default function Google() {
  useTitle("Sign Up");
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

    send("CLOSE").then((res) => !res.success && router.push("/"));
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen min-h-screen">
      <div className="flex flex-col gap-3 justify-center items-center">
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
        className="w-[90vw] sm:w-[22rem] bg-white rounded-xl shadow p-8 flex flex-col gap-2"
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
        <input className="mt-2 btn-primary" type="submit" value="Submit" />
      </form>
    </div>
  );
}
