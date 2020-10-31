import React from "react";
import fs from "fs";

import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import MarkdownParser from "../../components/MarkdownParser";
import { getPublishDateDisplay, IMG_DIRECTORY } from "../../lib/post";
import TagGroup from "../../components/TagGroup";

export default function Post({
  title,
  content,
  tags,
  thumbnail,
  thumbnailAlt,
  publishDate,
}: PostDetails): JSX.Element {
  return (
    <Layout>
      <img
        className="bsa-post-img"
        src={`${IMG_DIRECTORY}/${thumbnail}`}
        alt={thumbnailAlt}
      />
      <h1 className="mb-2">{title}</h1>
      <div className="pb-4">
        <p className="mb-2">
          {getPublishDateDisplay(publishDate)} &middot; Brittani S Avery
        </p>
        <TagGroup className="pb-2" tags={tags} />
      </div>
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
