import type { AppProps } from "next/app";
import GlobalContexts from "../contexts";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContexts>
      <Component {...pageProps} />
    </GlobalContexts>
  );
}

export default MyApp;
