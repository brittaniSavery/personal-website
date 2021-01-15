import { useMatomo } from "@datapunt/matomo-tracker-react";
import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import MetaTags from "./MetaTags";
import Navigation from "./Navigation";

type LayoutProps = BasicProps & {
  meta?: AllMeta;
};

export default function Layout({ meta, children }: LayoutProps): JSX.Element {
  const { trackPageView } = useMatomo();

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") trackPageView({});
  }, []);

  return (
    <>
      {meta && <MetaTags {...meta} />}

      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script src="https://code.iconify.design/1/1.0.7/iconify.min.js" />
      </Head>
      <div className="container is-max-desktop bsa-container">
        <Navigation />
        <main className="content bsa-margin">{children}</main>
      </div>
      <Footer />
    </>
  );
}
