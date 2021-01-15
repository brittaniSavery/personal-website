import { createInstance, MatomoProvider } from "@datapunt/matomo-tracker-react";
import type { AppProps } from "next/app";
import React from "react";
import "../styles/global.scss";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const instance = createInstance({
    urlBase: "https://analytics.averyincorporated.com",
    siteId: 1,
  });

  return (
    <MatomoProvider value={instance}>
      <Component {...pageProps} />
    </MatomoProvider>
  );
}
