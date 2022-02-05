import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFilePicker } from "use-file-picker";
import { PlusIcon, PencilIcon } from "@heroicons/react/outline";
import { Server } from "@web/util/api";
import useExtension from "@web/hooks/useExtension";
import useTitle from "@web/hooks/useTitle";
import { Toast } from "@web/util/dialog";
import Alert from "@web/components/Alert";
import Input from "@web/components/Input";
import Loader from "@web/components/Loader";

type Field = "AVATAR" | "USERNAME" | "EMAIL";

interface IMe {
  id: string;
  avatar: boolean;
  username: string;
  email: string;
}

export default function Profile() {
  useTitle("Profile");
  const { loading: checking, send } = useExtension();
  const router = useRouter();

  const [openFileSelector, { plainFiles, filesContent }] = useFilePicker({
    accept: [".png", ".jpg", ".jpeg"],
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 5,
    readAs: "DataURL",
  });

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [changed, setChanged] = useState<Field[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initial, setInitial] = useState<IMe>();

  const [id, setId] = useState<string>("");
  const [avatar, setAvatar] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isGoogle, setIsGoogle] = useState<boolean>(false);

  useEffect(() => {
    if (checking) return;

    (async () => {
      const res = await send("ME", {});

      if (res.success) {
        setInitial(res.body);

        setId(res.body.id);
        setEmail(res.body.email);
        setUsername(res.body.username);
        setIsGoogle(res.body.googleId !== null);

        setChanged([]);
        setLoading(false);
        return;
      }

      handle(res);
    })();
  }, [checking]);

  useEffect(() => {
    if (plainFiles && filesContent && filesContent.length > 0) {
      setAvatar(filesContent[0].content);
      change("AVATAR");
    } else setAvatar(undefined);
  }, [filesContent, plainFiles]);

  async function submit() {
    setSuccess(undefined);
    setError(undefined);

    const res = await send("UPDATE", {
      changed,
      avatar,
      email,
      username,
    });

    if (res && res.success) {
      setInitial({
        id,
        avatar: initial?.avatar || changed.includes("AVATAR"),
        username,
        email,
      });
      setChanged([]);
      return setSuccess("Successfully updated!");
    }
    handle(res);
  }

  function handle(res: any) {
    if (res.redirect) return router.push(res.redirect);

    if (res.body && res.body.error == "ACCESS_TOKEN_INVALID")
      return router.push("/auth/signin");

    if (res.error) {
      if (loading) return Toast.error(res.error);
      return setError(res.error);
    }

    if (loading) return Toast.error("Something unexpected happened!");
    setError("Something unexpected happened!");
  }

  function change(of: Field, key?: keyof IMe, to?: string) {
    let tmp = [...changed];

    if (key && initial && initial[key] == to) {
      tmp = tmp.filter((value) => value !== of);
    } else {
      if (tmp.includes(of)) return;
      tmp.push(of);
    }

    setChanged(tmp);
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
        <h1 className="text-5xl font-extrabold">Profile</h1>
        <p className="text-lg text-gray-700">Update your Profile</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (changed.length > 0) submit();
        }}
        className="flex w-[90vw] flex-col gap-2 rounded-xl bg-white p-8 shadow sm:w-[22rem]"
      >
        <div className="mb-4 flex w-full justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              openFileSelector();
            }}
            style={{
              backgroundImage: avatar
                ? `url("${avatar}")`
                : initial?.avatar
                ? `url("${Server.cdn}avatar/light/100x100/${id}${
                    process.env.NODE_ENV == "development" ? ".jpg" : ""
                  }")`
                : undefined,
            }}
            className="group flex h-24 w-24 items-center justify-center rounded-full border border-gray-300 bg-cover bg-center bg-no-repeat shadow-sm"
          >
            {!avatar && !initial?.avatar && (
              <PlusIcon className="h-5 w-5 text-gray-500" />
            )}

            {(avatar || initial?.avatar) && (
              <PencilIcon className="h-5 w-5 text-white opacity-0 drop-shadow-md transition-opacity group-hover:opacity-100" />
            )}
          </button>
        </div>
        <Input
          type="text"
          name="Username"
          initial={username}
          autoComplete="off"
          set={(value) => {
            change("USERNAME", "username", value);
            setUsername(value);
          }}
        />
        <Input
          type="email"
          name="Email"
          initial={email}
          autoComplete="off"
          disabled={isGoogle}
          set={(value) => {
            change("EMAIL", "email", value);
            setEmail(value);
          }}
        />
        {error && <Alert type="ERROR" text={error} />}
        {success && <Alert type="SUCCESS" text={success} />}
        <input
          className={`mt-2 ${
            changed.length > 0 ? "btn-primary" : "btn-disabled"
          }`}
          type="submit"
          value="Save"
        />
      </form>
    </div>
  );
}
