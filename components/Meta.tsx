import Head from "next/head";
import { BLOG_NAME } from "../lib/constants";

export default function Meta() {
  return (
    <Head>
      <link
        rel="shortcut icon"
        href="https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/global/logo/favicon.png"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={BLOG_NAME} />
    </Head>
  );
}
