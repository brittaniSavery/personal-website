import React from "react";
import fs from "fs";
import dynamic from "next/dynamic";

import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";

type FrontMatter = {
  title: string;
  publishDate: Date;
  tags: Array<string>;
  summary: string;
  thumbnail: string;
};

type Props = {
  attributes: FrontMatter;
  slug: string;
};

export default function Post({ attributes, slug }: Props): JSX.Element {
  const Content = dynamic(() =>
    import(`../../content/posts/${slug}.md`).then((mod) => mod.react)
  );

  return (
    <Layout>
      <h1>{attributes.title}</h1>
      <Content />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("content/posts");

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
      attributes,
      slug,
    },
  };
};
