import { useRouter } from "next/router";
import {
  useGoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Toast } from "@web/util/dialog";
import useExtension from "@web/hooks/useExtension";

export default function Google() {
  const router = useRouter();
  const { send } = useExtension();

  const { signIn: googleSignIn } = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    scope: `openid email`,
    onFailure: console.error,
    onSuccess: onSuccess,
  });

  async function onSuccess(
    data: GoogleLoginResponse | GoogleLoginResponseOffline
  ) {
    // @ts-ignore
    if (!data || !data.tokenObj || !data.tokenObj.id_token)
      return Toast.error("Failed to load Google token");

    // @ts-ignore
    if (!data || !data.profileObj || !data.profileObj.email)
      return Toast.error("Failed to load Google token");

    // @ts-ignore
    const token = data.tokenObj.id_token;
    // @ts-ignore
    const email = data.profileObj.email;

    const res = await send("GOOGLE", { token });

    if (res.redirect) return router.push(res.redirect);
    if (res.body.error && res.body.error == "USERNAME_REQUIRED") {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", email);
      return router.push(`/auth/google`);
    }
    if (res.error) return Toast.error(res.error);
    if (!res.success) return Toast.error("Something unexpected happened");

    if (sessionStorage.getItem("auto") == "true")
      return router.push("/welcome");
    send("CLOSE").then((res) => !res.success && router.push("/"));
  }

  return (
    <>
      <div className="w-full flex justify-between items-center gap-5 my-2">
        <div className="bg-gray-200 w-full h-0.5"></div>
        <p className="text-gray-400 whitespace-nowrap">Or</p>
        <div className="bg-gray-200 w-full h-0.5"></div>
      </div>
      <div
        onClick={googleSignIn}
        className="w-full cursor-pointer h-10 bg-white py-2 border rounded shadow-sm border-gray-300 hover:shadow transition-all flex justify-center items-center gap-3"
      >
        <svg
          className="w-5 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 48 48"
        >
          <defs>
            <path
              id="a"
              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
            />
          </defs>
          <clipPath id="b">
            <use xlinkHref="#a" overflow="visible" />
          </clipPath>
          <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
          <path
            clipPath="url(#b)"
            fill="#EA4335"
            d="M0 11l17 13 7-6.1L48 14V0H0z"
          />
          <path
            clipPath="url(#b)"
            fill="#34A853"
            d="M0 37l30-23 7.9 1L48 0v48H0z"
          />
          <path
            clipPath="url(#b)"
            fill="#4285F4"
            d="M48 48L17 24l-4-3 35-10z"
          />
        </svg>
        <label className="text-gray-500 pointer-events-none select-none">
          Continue with Google
        </label>
      </div>
    </>
  );
}
