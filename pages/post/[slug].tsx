import React from "react";
import fs from "fs";
import dynamic from "next/dynamic";

import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";

export default function Post({ title, slug }: PostDetails): JSX.Element {
  const Content = dynamic(() =>
    import(`../../content/posts/${slug}.md`).then((mod) => mod.react)
  );

  return (
    <Layout>
      <h1>{title}</h1>
      <Content />
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
  const { attributes } = await import("../../content/posts/" + slug + ".md");

  return {
    props: {
      ...attributes,
      slug,
    },
  };
};
