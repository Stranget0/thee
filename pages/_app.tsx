import type { AppProps } from "next/app";
import Contexts from "../contexts";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Contexts>
      <Component {...pageProps} />
    </Contexts>
  );
}

export default MyApp;
