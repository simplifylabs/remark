import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "@web/components/Loader";
import { Toast } from "@web/util/dialog";
import useExtension from "@web/hooks/useExtension";

export default function Callback() {
  const router = useRouter();
  const { send } = useExtension();

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.id) error("Invalid callback url");
    fetch(String(router.query.token));
  }, [router]);

  async function fetch(token: string) {
    const res = await send("GOOGLE", { token });

    if (res.redirect) return router.push(res.redirect);
    if (!res.succes) return error(res.error);

    send("CLOSE").then((res) => !res.success && router.push("/"));
  }

  function error(text?: string) {
    if (text) Toast.error(text);
    else Toast.error("Something unexpected happened");

    router.push("/auth/signin");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
}
