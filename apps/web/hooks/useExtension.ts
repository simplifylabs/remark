declare global {
  interface Window {
    browser?: typeof chrome;
  }
}

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Extension from "@util/extension";
import Browser, { BrowserType } from "@util/browser";

interface Options {
  required: boolean;
}

export default function useExtension(options: Options = { required: true }) {
  const router = useRouter();

  const [installed, setInstalled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!Extension.isSupported || !Extension.id) {
      if (options.required) router.push("/");
      setInstalled(false);
      setLoading(false);
      return;
    }

    if (Browser.type == BrowserType.Firefox) {
      let gotPong = false;

      send("PING").then((data) => {
        if (data.success) {
          gotPong = true;
          setInstalled(true);
        } else setInstalled(false);
      });

      setTimeout(() => {
        if (!gotPong) {
          if (options.required) router.push(Extension.url as string);
          setInstalled(false);
        }

        setLoading(false);
      }, 2500);
    } else {
      send("PING").then((data) => {
        if (!data || !data.success) {
          if (options.required) router.push(Extension.url as string);
          setInstalled(false);
        } else setInstalled(true);

        setLoading(false);
      });
    }
  }, []);

  function send(type: string, data: any = {}) {
    return new Promise<any>((res) => {
      if (!Extension.supported) return res({ success: false });

      if (Browser.type == BrowserType.Firefox) {
        window.postMessage({ type: `REMARK:${type}`, ...data }, "*");
        on(`RE:REMARK:${type}`, res);
      } else {
        if (!chrome || !chrome.runtime) {
          if (options.required) router.push(Extension.url as string);
          res({ success: false });
          return;
        }

        chrome.runtime.sendMessage(Extension.id, { type, ...data }, (data) =>
          res(data)
        );
      }
    });
  }

  function on(type: string, cb: (data: any) => void) {
    window.addEventListener("message", handler);

    function handler(event: MessageEvent) {
      if (
        event.source !== window ||
        !event.data ||
        !event.data.type ||
        event.data.type !== type
      )
        return;

      cb(event.data);
      window.removeEventListener("message", handler);
    }
  }

  return { send, on, installed, loading };
}
