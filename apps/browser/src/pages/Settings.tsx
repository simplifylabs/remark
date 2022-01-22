import React, { useState, useEffect } from "react";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/solid";
import Title from "@browser/components/Title";
import User from "@browser/util/user";
import App from "@browser/util/app";

interface ISettingsProps {
  back: () => void;
}

export default function Settings(props: ISettingsProps) {
  const [clearedShow, setClearedShow] = useState(false);
  const [clearedSmart, setClearedSmart] = useState(false);
  const [clearedHide, setClearedHide] = useState(false);
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await User.isAuthenticated();
      setSignedOut(!res.isAuthenticated);
    })();
  }, []);

  function clearShow() {
    if (clearedShow) return;
    setClearedShow(true);
  }

  function clearSmart() {
    if (clearedSmart) return;
    setClearedSmart(true);
  }

  function clearHide() {
    if (clearedSmart) return;
    setClearedHide(true);
  }

  function signOut() {
    setSignedOut(true);
    User.logout(true);
  }

  function signIn() {
    window.open(`${App.webUrl}auth/signin`);
  }

  return (
    <div className="relative w-full h-full overflow-y-auto flex flex-col justify-start items-center pt-4 thin-scrollbar">
      <ArrowLeftIcon
        onClick={() => props.back()}
        className="text-gray-500 dark:text-gray-200 drop-shadow-md w-5 h-5 cursor-pointer absolute top-2 left-2"
      />
      <Title title="Settings" subtitle="Remark" />
      <div className="flex flex-col gap-5 items-center w-full bg-white dark:bg-background-form rounded-2xl p-6 shadow-sm">
        <Option>
          <Label>Default Show Button</Label>
          <div className="relative">
            <select className="bg-white dark:bg-background-form text-black dark:text-white py-[0.4rem] rounded-md pl-3 pr-8 focus:ring-2 focus:ring-brand focus:outline-none border-gray-200 dark:border-gray-700 border shadow-sm">
              <option value="always">Always</option>
              <option value="smart">Smart</option>
              <option value="never">Never</option>
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400 pointer-events-none" />
          </div>
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
        <Option>
          <Label>Clear Whitelist</Label>
          <button
            onClick={clearShow}
            className={`${
              clearedShow ? "btn-disabled" : "btn-primary"
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
            onClick={clearHide}
            className={`${
              clearedHide ? "btn-disabled" : "btn-primary"
            } text-sm px-4 py-2`}
          >
            Clear
          </button>
        </Option>
      </div>
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
