import { GetStaticProps } from "next";
import React from "react";
import Layout from "../components/layout/Layout";
import MarkdownParser from "../components/MarkdownParser";
import { attributes, html as resume } from "../content/resume.md";

type ResumeProps = {
  meta: GeneralMeta;
};

export default function Resume({ meta }: ResumeProps): JSX.Element {
  return (
    <Layout meta={meta}>
      <MarkdownParser content={resume} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.WEBSITE;

  const meta: GeneralMeta = {
    url: url + "/resume",
    type: "website",
    title: attributes.title,
    description: attributes.description,
    thumbnail: `${url}/images/${attributes.thumbnail}`,
    thumbnailAlt: attributes.thumbnailAlt,
  };

  return {
    props: { meta: meta },
  };
};
