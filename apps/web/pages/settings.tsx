import { useEffect, useState } from "react";
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
  const { send } = useExtension();
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("SMART");
  const [clearedWhite, setClearedWhite] = useState(false);
  const [clearedSmart, setClearedSmart] = useState(false);
  const [clearedBlack, setClearedBlack] = useState(false);
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await send("SETTINGS", { load: true });
      if (res.success) {
        setMode(res.settings.mode);
        setLoading(false);
        return;
      }
      handle(res);
    })();
  }, []);

  function handle(res: any) {
    if (res.success) return;
    if (res.error) return setError(res.error);
    if (res.redirect) return router.push(res.redirect);
    if (loading) return Toast.error("Something unexpected happened");
    setError("Something unexpected happened");
  }

  async function update(key: keyof ISettings, value: ISettings[typeof key]) {
    // eslint-disable-next-line
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

  function signOut() {
    setSignedOut(true);
  }

  function signIn() {
    router.push(`auth/signin`);
  }

  if (loading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen min-h-screen">
      <div className="flex flex-col gap-1 justify-center items-center">
        <h1 className="text-5xl font-extrabold">Settings</h1>
        <p className="text-lg text-gray-700">Update the Remark Settings</p>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[90vw] sm:w-[23rem] bg-white rounded-xl shadow p-8 flex flex-col gap-4"
      >
        <Option>
          <Label>Show by Default</Label>
          <select
            defaultValue={mode}
            onChange={(e) => updateMode(e.target.value as Mode)}
            className="bg-white dark:bg-background-form text-black dark:text-white py-[0.4rem] rounded-md pl-3 pr-10 focus:ring-2 focus:ring-brand focus:outline-none border-gray-200 dark:border-gray-700 border shadow-sm"
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
            } text-sm px-4 py-2`}
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
            } text-sm px-4 py-2`}
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
            } text-sm px-4 py-2`}
          >
            Clear
          </button>
        </Option>
        <Option>
          <Label>{signedOut ? "Sign In" : "Sign Out"}</Label>
          <button
            onClick={signedOut ? signIn : signOut}
            className={`btn-primary text-sm px-4 py-2`}
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
    <div className="flex flex-row justify-between items-center w-full">
      {props.children}
    </div>
  );
}

function Label(props: { children: string }) {
  return (
    <label className="text-base text-gray-600 dark:text-gray-300">
      {props.children}
    </label>
  );
}
