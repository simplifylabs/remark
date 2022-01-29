import type { AppProps } from "next/app";
import { wrapper } from "@web/state";
import Layout from "@web/components/Layout";
import "@web/styles/app.css";

function Remark({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(Remark);
