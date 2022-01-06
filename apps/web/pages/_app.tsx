import type { AppProps } from "next/app";
import { wrapper } from "@state";
import Layout from "@components/Layout";
import "@styles/app.css";

function Remark({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(Remark);
