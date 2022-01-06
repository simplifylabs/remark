import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTitle from "@web/hooks/useTitle";
import useExtension from "@web/hooks/useExtension";
import Link from "next/link";
import Alert from "@web/components/Alert";
import Input from "@web/components/Input";

export default function Reset() {
  useTitle("Reset");
  const { send } = useExtension();

  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  const [password, setPassword] = useState<string | undefined>();
  const [confirm, setConfirm] = useState<string | undefined>();

  useEffect(() => {
    if (router.isReady && !router.query.token) router.push("/");
  }, [router]);

  async function submit(e: any) {
    e.preventDefault();

    const res = await send("RESET", {
      token: router.query.token,
      confirm,
      password,
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
        <h1 className="text-5xl font-extrabold">Reset</h1>
        <p className="text-lg text-gray-700">
          Already know your password?{" "}
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
        <input className="mt-2 btn-primary" type="submit" value="Send" />
      </form>
    </div>
  );
}