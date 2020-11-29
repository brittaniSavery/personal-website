import { GetStaticProps } from "next";
import React from "react";
import Layout from "../components/Layout";
import MarkdownParser from "../components/MarkdownParser";
import PostCard from "../components/PostCard";
import { html as home } from "../content/home.md";
import { getPostsByDate } from "../lib/postsHelper";

type HomeProps = {
  recentPosts: Post[];
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
  const posts = await getPostsByDate();

  return { props: { recentPosts: posts.slice(0, 2) } };
};
