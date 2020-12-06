import { GetStaticProps } from "next";
import React from "react";
import Layout from "../components/Layout";
import MarkdownParser from "../components/MarkdownParser";
import PostCard from "../components/PostCard";
import { attributes, html as home } from "../content/home.md";
import { getPostsByDate } from "../lib/postsHelper";

type HomeProps = {
  url: string;
  recentPosts: Post[];
};

export default function Home({ url, recentPosts }: HomeProps): JSX.Element {
  const meta: GeneralMeta = {
    url: url,
    type: "website",
    fullTitle: `Brittani S Avery. ${attributes.title}`,
    title: attributes.title,
    description: attributes.description,
    thumbnail: `${url}/images/${attributes.thumbnail}`,
  };
  return (
    <Layout meta={meta}>
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

  return {
    props: { url: process.env.WEBSITE, recentPosts: posts.slice(0, 2) },
  };
};
