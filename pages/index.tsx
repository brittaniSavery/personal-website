import React from "react";
import Layout from "../components/Layout";
import MarkdownParser from "../components/MarkdownParser";
import fs from "fs";
import { GetStaticProps } from "next";
import { html as home } from "../content/home.md";
import { getPosts, MAIN_DIRECTORY, sortPostsByDate } from "../lib/post";
import PostCard from "../components/PostCard";

type HomeProps = {
  recentPosts: PostDetails[];
};

export default function Home({ recentPosts }: HomeProps): JSX.Element {
  return (
    <Layout>
      <MarkdownParser content={home} />
      <div className="columns">
        {recentPosts.map((post) => (
          <div key={post.slug} className="column is-half">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(MAIN_DIRECTORY);
  const posts = await getPosts(files);
  posts.sort((a, b) => sortPostsByDate(a, b));

  return { props: { recentPosts: posts.slice(0, 2) } };
};
