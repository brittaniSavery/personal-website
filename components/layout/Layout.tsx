import { useMatomo } from "@datapunt/matomo-tracker-react";
import { useEffect } from "react";
import Footer from "./Footer";
import MetaTags from "./MetaTags";
import Navigation from "./Navigation";

type LayoutProps = BasicProps & {
  meta?: AllMeta;
};

export default function Layout({ meta, children }: LayoutProps): JSX.Element {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") trackPageView({});
  }, []);

  return (
    <>
      {meta && <MetaTags {...meta} />}

      <div className="container is-max-desktop bsa-container">
        <Navigation />
        <main className="content bsa-margin">{children}</main>
      </div>
      <Footer />
    </>
  );
}
