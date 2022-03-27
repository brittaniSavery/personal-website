import { createInstance, MatomoProvider } from "@datapunt/matomo-tracker-react";
import Iconify, {
  IconifyJSON,
} from "@iconify/iconify/dist/iconify.without-api";
import notoIcons from "@iconify/json/json/noto.json";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import "../styles/global.scss";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const instance = createInstance({
    urlBase: "https://analytics.averyincorporated.com",
    siteId: 1,
  });

  const collection = notoIcons as IconifyJSON;
  Iconify.addCollection(collection);

  return (
    <MatomoProvider value={instance}>
      <Layout meta={pageProps.meta}>
        <Component {...pageProps} />
      </Layout>
    </MatomoProvider>
  );
}
