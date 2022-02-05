import { useEffect, useState } from "react";
import { useGoogleLogout } from "react-google-login";
import { useRouter } from "next/router";
import { Toast } from "@web/util/dialog";
import useExtension from "@web/hooks/useExtension";
import useTitle from "@web/hooks/useTitle";
import Loader from "@web/components/Loader";
import Alert from "@web/components/Alert";

type Mode = "SHOW" | "SMART" | "HIDE";

interface ISettings {
  mode: Mode;
}

export default function Settings() {
  useTitle("Settings");
  const { loading: checking, send } = useExtension();
  const router = useRouter();

  const { signOut: googleSignOut } = useGoogleLogout({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    onFailure: console.error,
    onLogoutSuccess: () => null,
  });

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("SMART");
  const [clearedWhite, setClearedWhite] = useState(false);
  const [clearedSmart, setClearedSmart] = useState(false);
  const [clearedBlack, setClearedBlack] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  const [isGoogle, setIsGoogle] = useState<boolean>(false);

  useEffect(() => {
    if (checking) return;

    (async () => {
      const settingsRes = await send("SETTINGS", { load: true });

      if (!settingsRes.success) return handle(settingsRes);
      setMode(settingsRes.settings.mode);

      const authenticatedRes = await send("AUTHENTICATED");

      if (!authenticatedRes.success) return handle(authenticatedRes);
      setSignedOut(!authenticatedRes.isAuthenticated);

      if (authenticatedRes.isAuthenticated) {
        const meRes = await send("ME");
        if (!meRes.success) return handle(meRes);
        setIsGoogle(meRes.body.googleId !== null);
      }

      setLoading(false);
    })();
  }, [checking]);

  function handle(res: any) {
    if (res.success) return;
    if (res.error) return setError(res.error);
    if (res.redirect) return router.push(res.redirect);
    if (loading) return Toast.error("Something unexpected happened");
    setError("Something unexpected happened");
  }

  async function update(key: keyof ISettings, value: ISettings[typeof key]) {
    const update: any = {};
    update[key] = value;

    const res = await send("SETTINGS", {
      update,
    });

    if (!res.success) handle(res);
  }

  function updateMode(to: Mode) {
    update("mode", to);
    setMode(to);
  }

  async function clearWhite() {
    if (clearedWhite) return;
    setClearedWhite(true);
    handle(await send("CLEAR", { list: "WHITE" }));
  }

  async function clearSmart() {
    if (clearedSmart) return;
    setClearedSmart(true);
    handle(await send("CLEAR", { list: "SMART" }));
  }

  async function clearBlack() {
    if (clearedBlack) return;
    setClearedBlack(true);
    handle(await send("CLEAR", { list: "BLACK" }));
  }

  async function signOut() {
    if (isGoogle) googleSignOut();
    setSignedOut(true);
    handle(await send("LOGOUT"));
  }

  function signIn() {
    router.push(`auth/signin`);
  }

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-5xl font-extrabold">Settings</h1>
        <p className="text-lg text-gray-700">Update the Remark Settings</p>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-[90vw] flex-col gap-4 rounded-xl bg-white p-8 shadow sm:w-[23rem]"
      >
        <Option>
          <Label>Show by Default</Label>
          <select
            defaultValue={mode}
            onChange={(e) => updateMode(e.target.value as Mode)}
            className="focus:ring-brand rounded-md border border-gray-200 bg-white py-[0.4rem] pl-3 pr-10 text-black shadow-sm focus:outline-none focus:ring-2"
          >
            <option value="SHOW">Always</option>
            <option value="SMART">Smart</option>
            <option value="HIDE">Never</option>
          </select>
        </Option>
        <Option>
          <Label>Clear Whitelist</Label>
          <button
            onClick={clearWhite}
            className={`${
              clearedWhite ? "btn-disabled" : "btn-primary"
            } px-4 py-2 text-sm`}
          >
            Clear
          </button>
        </Option>
        <Option>
          <Label>Clear Smartlist</Label>
          <button
            onClick={clearSmart}
            className={`${
              clearedSmart ? "btn-disabled" : "btn-primary"
            } px-4 py-2 text-sm`}
          >
            Clear
          </button>
        </Option>
        <Option>
          <Label>Clear Blacklist</Label>
          <button
            onClick={clearBlack}
            className={`${
              clearedBlack ? "btn-disabled" : "btn-primary"
            } px-4 py-2 text-sm`}
          >
            Clear
          </button>
        </Option>
        <Option>
          <Label>{signedOut ? "Sign In" : "Sign Out"}</Label>
          <button
            onClick={signedOut ? signIn : signOut}
            className={`btn-primary px-4 py-2 text-sm`}
          >
            {signedOut ? "Sign In" : "Sign Out"}
          </button>
        </Option>
        {error && <Alert type="ERROR" text={error} />}
      </form>
    </div>
  );
}

function Option(props: { children: any }) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      {props.children}
    </div>
  );
}

function Label(props: { children: string }) {
  return <label className="text-gray-700">{props.children}</label>;
}
