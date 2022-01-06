import { useState } from "react";
import { useRouter } from "next/router";
import useTitle from "@web/hooks/useTitle";
import useExtension from "@web/hooks/useExtension";
import Link from "next/link";
import Alert from "@web/components/Alert";
import Title from "@web/components/Title";
import Input from "@web/components/Input";

export default function Forgot() {
  useTitle("Forgot");
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

  if (sent)
    return (
      <div className="flex flex-col justify-center items-center px-5 w-screen min-h-screen">
        <Title
          title="Email Sent"
          subtitle="Password-Reset"
          primary
          titleClassName="text-4xl sm:text-5xl"
        />
        <p className="max-w-[23rem] text-lg text-gray-700 text-center">
          We've just sent you an email including a reset link. Please check your
          inbox!
        </p>
      </div>
    );
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen min-h-screen">
      <div className="flex flex-col gap-3 justify-center items-center">
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
        className="w-[90vw] sm:w-[22rem] bg-white rounded-xl shadow p-8 flex flex-col gap-2"
      >
        <Input type="email" name="Email" autoComplete="email" set={setEmail} />
        {error && <Alert type="ERROR" text={error} />}
        <input className="mt-2 btn-primary" type="submit" value="Send" />
      </form>
    </div>
  );
}
