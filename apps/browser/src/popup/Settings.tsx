import React, { useState, useEffect } from "react";
import Title from "@browser/components/Title";
import Switch from "@browser/components/Switch";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import Darkmode from "@browser/util/darkmode";
import useDarkmode from "@browser/hooks/useDarkmode";
import Domain from "@browser/util/domain";
import User from "@browser/util/user";
import Tab from "@browser/util/tab";
import App from "@browser/util/app";

interface IProps {
  back: () => void;
}

export default function Settings(props: IProps) {
  const isDark = useDarkmode();
  const [cleared, setCleared] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  // const [manually, setManually] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await User.isAuthenticated();
      setSignedOut(!res.isAuthenticated);
    })();
  }, []);

  function clear() {
    if (cleared) return;
    setCleared(true);
    Domain.clearBlockedDomains();
  }

  function signOut() {
    setSignedOut(true);
    User.logout(true);
  }

  function signIn() {
    Tab.open(`${App.webUrl}auth/signin`);
  }

  return (
    <div className="relative w-[22rem] h-[18rem] flex flex-col items-center">
      <ChevronLeftIcon
        onClick={props.back}
        className="absolute top-3 left-3 w-6 h-6 text-black opacity-30 transition-all cursor-pointer dark:text-white hover:opacity-60"
      />
      <div className="mt-auto"></div>
      <Title title="Settings" subtitle="Remark" />
      <div className="flex flex-col gap-5 items-center px-12 w-full">
        <Option>
          <Label>Darkmode</Label>
          <Switch
            checked={isDark}
            onChange={(to: boolean) => Darkmode.toggle(to)}
          />
        </Option>
        {/* 
        <Option>
          <Label>Manually Enable</Label>
          <Switch
            checked={manually}
            onChange={(to: boolean) => setManually(to)}
          />
        </Option>
        */}
        <Option>
          <Label>Clear Blocked</Label>
          <button
            onClick={clear}
            className={`${
              cleared ? "btn-disabled" : "btn-primary"
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
      </div>
      <div className="mb-auto"></div>
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
    <label className="text-gray-600 dark:text-gray-400">{props.children}</label>
  );
}
