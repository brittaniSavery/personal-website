import { GetStaticProps } from "next";
import React from "react";
import Layout from "../components/Layout";

type NewsletterProps = {
  meta: GeneralMeta;
};

export default function Newsletter({ meta }: NewsletterProps): JSX.Element {
  return (
    <Layout meta={meta}>
      <h1>Join the Newsletter</h1>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input
            className="input is-medium"
            type="text"
            placeholder="Email Address"
          />
        </p>
        <p className="control">
          <button className="button is-primary is-medium">Join</button>
        </p>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.WEBSITE;

  const meta: GeneralMeta = {
    url: url + "/newsletter",
    type: "website",
    title: "Join the Newsletter",
    fullTitle: "Brittani S Avery's Newsletter",
    description:
      "Join the newsletter to have backstage access to her writing process, coding projects, sneak peaks, and much more!",
    //thumbnail: `${url}/images/${attributes.thumbnail}`,
  };

  return {
    props: { meta: meta },
  };
};
