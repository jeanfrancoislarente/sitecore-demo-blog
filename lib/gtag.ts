import { IS_PRODUCTION } from "./constants";

export const GA_TRACKING_ID = "G-QKTJM6MS1W"; // This is your GA Tracking ID

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: any;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (IS_PRODUCTION && typeof window !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
