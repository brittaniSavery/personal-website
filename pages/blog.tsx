import { Feed } from "feed";
import fs from "fs";
import { GetStaticProps } from "next";
import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import TagGroup from "../components/TagGroup";
import copyright from "../lib/copyright";
import { getPostsByDate } from "../lib/postsHelper";

type BlogProps = {
  posts: Post[];
  tags: string[];
};

export default function Blog({ posts, tags }: BlogProps): JSX.Element {
  return (
    <Layout>
      <h1>Blog</h1>
      <TagGroup tags={tags} />

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

  const tags = new Set();
  posts.forEach((post) => {
    feed.addItem({
      date: new Date(post.publishDate),
      title: post.title,
      link: `${process.env.WEBSITE}/post/${post.slug}`,
      category: post.tags.map((tag) => ({ name: tag })),
      description: post.summary,
      content: post.content,
    });

    post.tags.forEach((tag) => tags.add(tag));
  });

  fs.writeFileSync(`${process.cwd()}/public/feed.xml`, feed.rss2());

  return { props: { posts: posts, tags: [...tags].sort() } };
};
