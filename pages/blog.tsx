import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { getPostsByDate } from "../lib/postsHelper";
import fs from "fs";
import { Feed } from "feed";
import copyright from "../lib/copyright";

type Props = {
  posts: Post[];
};

export default function BlogList({ posts }: Props): JSX.Element {
  return (
    <Layout>
      <h1>Blog</h1>
      <div className="columns is-multiline">
        {posts.map((post) => (
          <div key={post.title} className="column is-half">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPostsByDate();

  const feed = new Feed({
    id: process.env.WEBSITE,
    link: process.env.WEBSITE,
    title: "Brittani S Avery's Personal Blog",
    description:
      "The thoughts and ramblings of Brittani S Avery on her code, writings, and much more.",
    language: "en-us",
    copyright: `${copyright} Brittani S Avery, all rights reserved.`,
  });

  posts.forEach((post) => {
    feed.addItem({
      date: new Date(post.publishDate),
      title: post.title,
      link: `${process.env.WEBSITE}/post/${post.slug}`,
      category: post.tags.map((tag) => ({ name: tag })),
      description: post.summary,
      content: post.content,
    });
  });

  fs.writeFileSync(`${process.cwd()}/public/feed.xml`, feed.rss2());

  return { props: { posts: posts } };
};
