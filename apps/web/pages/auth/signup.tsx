import { useState } from "react";
import { useRouter } from "next/router";
import useTitle from "@web/hooks/useTitle";
import useExtension from "@web/hooks/useExtension";
import Link from "next/link";
import Alert from "@web/components/Alert";
import Input from "@web/components/Input";

export default function SignUp() {
  useTitle("Sign Up");
  const { send } = useExtension();

  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  const [username, setUsername] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirm, setConfirm] = useState<string | undefined>();

  async function submit(e: any) {
    e.preventDefault();

    const res = await send("REGISTER", {
      username,
      email,
      password,
      confirm,
    });

    if (res.error) return setError(res.error);
    if (res.redirect) return router.push(res.redirect);
    if (!res.success) return setError("Something unexpected happened");

    send("CLOSE", {
      url: window.location.href,
    }).then((res) => !res.success && router.push("/"));
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen min-h-screen">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-5xl font-extrabold">Sign Up</h1>
        <p className="text-lg text-gray-700">
          Already have an account?{" "}
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
          name="Username"
          autoComplete="nickname"
          set={setUsername}
          min={3}
          max={20}
        />
        <Input type="email" name="Email" autoComplete="email" set={setEmail} />
        <Input
          type="password"
          name="New Password"
          autoComplete="new-password"
          set={setPassword}
          min={6}
          max={128}
        />
        <Input
          type="password"
          name="Confirm Password"
          autoComplete="new-password"
          set={setConfirm}
          min={6}
          max={128}
        />
        {error && <Alert type="ERROR" text={error} />}
        <input className="mt-2 btn-primary" type="submit" value="Submit" />
      </form>
    </div>
  );
}
