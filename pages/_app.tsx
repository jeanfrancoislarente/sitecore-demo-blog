import "../styles/index.css";
import "../styles/bootstrap.css";
// TODO: Get rid of bootstrap by converting the little things that use it to Tailwind
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
