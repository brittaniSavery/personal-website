import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import MarkdownParser from "../../components/MarkdownParser";
import PostCard from "../../components/PostCard";
import TagGroup from "../../components/TagGroup";
import {
  FULL_PATH,
  getPostBySlug,
  getRelatedPosts,
} from "../../lib/postsHelper";

type PostProps = {
  main: Post;
  related: Post[];
};

export default function Post({ main, related }: PostProps): JSX.Element {
  return (
    <Layout>
      <img
        className="bsa-post-img"
        src={main.thumbnail}
        alt={main.thumbnailAlt}
      />
      <h1 className="mb-2">{main.title}</h1>
      <div className="pb-4">
        <p className="mb-2">{main.formattedDate} &middot; Brittani S Avery</p>
        <TagGroup className="pb-2" tags={main.tags} />
      </div>
      <MarkdownParser content={main.content} />
      <h2>Related Posts</h2>
      <p>
        If you enjoyed this post, check these related posts. Or better yet, join
        my{" "}
        <Link href="/newsletter">
          <a>newsletter</a>
        </Link>{" "}
        to get updates right to your inbox!
      </p>
      <div className="columns">
        {related.map((post) => (
          <div key={post.title} className="column is-half">
            <PostCard post={post} />
          </div>
        ))}
      </div>
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
  const related = await getRelatedPosts(post);

  return {
    props: { main: post, related: related },
  };
};
