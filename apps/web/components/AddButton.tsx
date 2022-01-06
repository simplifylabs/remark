import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useExtension from "@hooks/useExtension";
import Browser from "@util/browser";
import Extension from "@util/extension";

interface IAddButtonProps {
  className?: string;
  reinstall?: boolean;
  dynamic?: boolean;
}

export default function AddButton(props: IAddButtonProps) {
  const router = useRouter();

  const { send, installed } = useExtension({ required: false });

  const [browser, setBrowser] = useState("Browser");
  const [loading, setLoading] = useState(true);
  const [supported, setSupported] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setBrowser(Browser.alias);
    setSupported(Extension.isSupported);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && supported && installed) {
      send("AUTHENTICATED").then((data) => {
        setAuthenticated(data.isAuthenticated);
      });
    }
  }, [loading, supported, installed]);

  if (typeof window == "undefined") return null;
  if (!supported || (props.dynamic && installed && authenticated))
    return (
      <button
        onClick={() =>
          !supported ? router.push("/#download") : router.push("/profile")
        }
        className={`btn-disabled ${props.className ? props.className : ""}`}
      >
        {!supported ? "Incompatible Browser" : "Installed"}
      </button>
    );
  return (
    <>
      <button
        onClick={() =>
          !installed || !props.dynamic
            ? window.open(Extension.url)
            : window.open("/auth/signin")
        }
        className={`btn-primary whitespace-pre transition-all ${
          loading ? "opacity-0" : "opacity-1"
        } ${props.className ? props.className : ""}`}
      >
        {props.reinstall
          ? "Reinstall"
          : !installed || !props.dynamic
          ? `+  Add to ${browser}`
          : "Sign In"}
      </button>
    </>
  );
}
