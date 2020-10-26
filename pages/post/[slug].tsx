import React from "react";
import fs from "fs";

import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import MarkdownParser from "../../components/MarkdownParser";

export default function Post({ title, content }: PostDetails): JSX.Element {
  return (
    <Layout>
      <h1>{title}</h1>
      <MarkdownParser content={content} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(`${process.cwd()}/content/posts`);

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const { attributes, html } = await import(
    "../../content/posts/" + slug + ".md"
  );

  return {
    props: {
      ...attributes,
      content: html,
    },
  };
};
