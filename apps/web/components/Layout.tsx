import DialogBox from "@web/components/Dialog";
import Registry from "@web/registry";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { useRouter } from "next/router";
import { Server } from "@web/util/api";

interface ILayoutProps {
  children: any;
}

export default function Layout(props: ILayoutProps) {
  const store = useStore();
  const router = useRouter();

  useEffect(() => {
    Registry.set(store);
  }, [store]);

  return (
    <>
      <DialogBox />
      {props.children}
    </>
  );
}
