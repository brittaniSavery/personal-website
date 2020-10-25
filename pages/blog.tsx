import React from "react";
import fs from "fs";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";

type Props = {
  posts: PostDetails[];
};

export default function BlogList({ posts }: Props): JSX.Element {
  return (
    <Layout>
      <div className="content bsa-margin">
        <h1>Blog</h1>
        <div className="columns is-multiline">
          {posts.map((post) => (
            <div key={post.title} className="column is-half">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(`${process.cwd()}/content/posts`);

  const imports = files.map(async (file) => {
    const filename = file.replace(".md", "");
    const { attributes } = await import("../content/posts/" + filename + ".md");

    return { ...attributes, slug: filename };
  });

  const posts = await Promise.all(imports);
  posts.sort((a: PostDetails, b: PostDetails) => {
    const aDate = new Date(a.publishDate);
    const bDate = new Date(b.publishDate);
    return aDate.valueOf() - bDate.valueOf();
  });

  return { props: { posts: posts } };
};
