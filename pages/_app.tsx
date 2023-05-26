import "../styles/index.css";
import "../styles/bootstrap.css";
// TODO: Get rid of bootstrap by converting the little things that use it to Tailwind
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IS_PRODUCTION } from "../lib/constants";
import * as gtag from "../lib/gtag";
import { useEffect } from "react";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (IS_PRODUCTION) {
      const handleRouteChange = (url: string) => {
        console.log(url);
        gtag.pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {IS_PRODUCTION && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="googleAnalyticsScript"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      <Component {...pageProps} />
    </>
  );
}
