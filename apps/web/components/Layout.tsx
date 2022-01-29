import DialogBox from "@web/components/Dialog";
import Registry from "@web/registry";
import Head from "next/head";
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
      <Head>
        {/* Primary Meta Tags */}
        <title>Remark: Uncensored Comments, anywhere.</title>
        <meta name="title" content="Remark: Uncensored Comments, anywhere." />
        <meta
          name="description"
          content="Remark is a browser extension that let's you write comments anywhere on the web, completely uncensored."
        />
        <meta name="keywords" content="Uncensored, Comments, Remark" />
        <meta name="language" content="English" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="theme-color" content="#6366f1" />

        {/* Open Graph Tags */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${Server.url}${router.pathname}`} />
        <meta
          property="og:title"
          content="Remark: Uncensored Comments, anywhere."
        />
        <meta
          property="og:description"
          content="Remark is a browser extension that let's you write comments anywhere on the web, completely uncensored."
        />
        <meta
          key="og:image"
          property="og:image"
          content={`${Server.url}social.jpg`}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={Server.url} />
        <meta
          property="twitter:title"
          content="Remark: Uncensored Comments, anywhere."
        />
        <meta
          property="twitter:description"
          content="Remark is a browser extension that let's you write comments anywhere on the web, completely uncensored."
        />
        <meta property="twitter:image" content={`${Server.url}social.jpg`} />

        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link rel="icon" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <DialogBox />
      {props.children}
    </>
  );
}
