import Darkmode from "@util/darkmode";
import { useEffect, useState } from "react";

export default function useDarkmode() {
  const [isDark, setIsDark] = useState<boolean>(Darkmode.isDark);

  useEffect(() => {
    Darkmode.onChange(onChange);
    return () => Darkmode.offChange(onChange);
  }, []);

  function onChange(to: boolean) {
    setIsDark(to);
  }

  return isDark;
}

export function useAutoDarkmode() {
  useEffect(() => {
    Darkmode.read();
  }, []);
}
