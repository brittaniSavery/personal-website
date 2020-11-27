import React from "react";
import fs from "fs";

import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import MarkdownParser from "../../components/MarkdownParser";
import {
  FULL_PATH,
  getPostBySlug,
  getPublishDateDisplay,
  IMG_PATH,
} from "../../lib/post";
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
        src={`${IMG_PATH}/${thumbnail}`}
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
  const files = fs.readdirSync(FULL_PATH);

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
  const post = await getPostBySlug(Array.isArray(slug) ? slug[0] : slug);

  return {
    props: post,
  };
};
