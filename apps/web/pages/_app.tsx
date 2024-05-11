import type { AppProps } from "next/app";
import { wrapper } from "@web/state";
import { DefaultSeo } from "next-seo";
import { Server } from "@web/util/api";
import Layout from "@web/components/Layout";
import { useRouter } from "next/router";
import "@web/styles/app.css";

function Remark({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Remark"
        defaultTitle="Remark: Uncensored Comments, anywhere."
        description="Remark is a browser extension that let's you write comments anywhere on the web, completely uncensored."
        twitter={{
          cardType: "summary_large_image",
        }}
        openGraph={{
          title: "Remark: Uncensored Comments, anywhere.",
          description:
            "Remark is a browser extension that let's you write comments anywhere on the web, completely uncensored.",
          type: "website",
          locale: "en_US",
          url: `${Server.url.slice(0, -1)}${router.pathname}`,
          site_name: "Remark",
          images: [
            {
              url: `${Server.url}social.jpg`,
              width: 2560,
              height: 1280,
              alt: "Remark",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: "Uncensored, Comments, Remark",
          },
          {
            name: "language",
            content: "English",
          },
          {
            name: "theme-color",
            content: "#6366f1",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "manifest",
            href: "/manifest.json",
          },
          {
            rel: "apple-touch-icon",
            sizes: "57x57",
            href: "/favicon/apple-icon-57x57.png",
          },
          {
            rel: "apple-touch-icon",
            sizes: "60x60",
            href: "/favicon/apple-icon-60x60.png",
          },
          {
            rel: "apple-touch-icon",
            sizes: "72x72",
            href: "/favicon/apple-icon-72x72.png",
          },
          {
            rel: "apple-touch-icon",
            sizes: "76x76",
            href: "/favicon/apple-icon-76x76.png",
          },
          {
            rel: "apple-touch-icon",
            sizes: "114x114",
            href: "/favicon/apple-icon-114x114.png",
          },
          {
            rel: "apple-touch-icon",
            sizes: "120x120",
            href: "/favicon/apple-icon-120x120.png",
          },
          {
            rel: "apple-touch-icon",
            sizes: "144x144",
            href: "/apple-icon-144x144.png",
          },
          {
            rel: "apple-touch-icon",
            sizes: "152x152",
            href: "/favicon/apple-icon-152x152.png",
          },
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/favicon/apple-icon-180x180.png",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href: "/favicon/android-icon-192x192.png",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon/favicon-32x32.png",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "96x96",
            href: "/favicon/favicon-96x96.png",
          },
        ]}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default wrapper.withRedux(Remark);
