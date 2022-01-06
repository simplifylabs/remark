import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toast } from "@web/util/dialog";
import useExtension from "@web/hooks/useExtension";
import useTitle from "@web/hooks/useTitle";
import Loader from "@web/components/Loader";
import Title from "@web/components/Title";
import AddButton from "@web/components/AddButton";
import API from "@web/util/api";

export default function Share() {
  useTitle("Share");
  const router = useRouter();

  const { installed, loading: checking } = useExtension({ required: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (checking || !router.isReady) return;

    if (installed) fetch(router.query.id);
    else setLoading(false);
  }, [installed, checking, router]);

  async function fetch(id?: any) {
    if (!id) return router.push("/");
    id = String(id);

    const res = await API.get(["comment", id, "url"]);

    if (res && res.success) return (window.location.href = res.url);
    if (!res) return router.push("/maintenance");
    Toast.error("Something unexpected happened!");
    router.push("/");
  }

  if (loading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader />
      </div>
    );
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col items-center text-center">
        <Title title="Not Installed" subtitle="Required Extension" primary />
        <p className="text-lg max-w-[80vw] sm:max-w-[30em] whitespace-pre-wrap break-words text-gray-700 mb-10">
          It seems like Remark isn&apos;t installed in your browser. Please
          install the Browser Extension to view the shared comment.
        </p>
        <AddButton className="md:py-4" />
      </div>
    </div>
  );
}
