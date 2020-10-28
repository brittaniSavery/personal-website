import React from "react";
import Head from "next/head";
import Navigation from "./Navigation";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Brittani S Avery</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fff" />
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
