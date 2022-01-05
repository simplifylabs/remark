import React, { useState, useEffect } from "react";
import { CogIcon } from "@heroicons/react/outline";
import Title from "@components/Title";
import Switch from "@components/Switch";
import Domain from "@util/domain";
import Tab from "@util/tab";
import App from "@util/app";
import User from "@util/user";

interface IProps {
  settings: () => void;
}

export default function Home(props: IProps) {
  const [blocked, setBlocked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    (async () => {
      let { blocked, disabled } = await Domain.isDomainBlocked();
      setBlocked(blocked);
      setDisabled(disabled);

      const res = await User.isAuthenticated();
      setSignedOut(!res.isAuthenticated);
    })();
  }, []);

  function onToggle(to: boolean) {
    Domain.setDomainBlocked(to);
    setBlocked(to);
  }

  return (
    <div className="relative w-[18rem] h-[12rem] flex flex-col justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        onClick={() => Tab.open(`${App.webUrl}profile`)}
        fill="currentColor"
        className={`absolute top-3 left-3 w-[1.375rem] h-[1.375rem] text-black opacity-30 transition-all cursor-pointer dark:text-white hover:opacity-60 ${
          signedOut && "hidden"
        }`}
      >
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
      </svg>
      <CogIcon
        onClick={props.settings}
        className="absolute top-3 right-3 w-6 h-6 text-black opacity-30 transition-all cursor-pointer dark:text-white hover:opacity-60"
      />
      <Title title="Domain" subtitle="Block" />
      <Switch big disabled={disabled} checked={blocked} onChange={onToggle} />
    </div>
  );
}
