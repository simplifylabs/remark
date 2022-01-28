import { useEffect, useState } from "react";
import useExtension from "@web/hooks/useExtension";

export default function Welcome() {
  const { loading: checking, send } = useExtension();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (checking) return;

    (async () => {
      // const settingsRes = await send("SETTINGS", { load: true });
      setLoading(false);
    })();
  }, [checking]);

  if (loading)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl">Welcome!</h1>
      </div>
    );
}
