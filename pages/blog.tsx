import React from "react";
import fs from "fs";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Link from "next/link";

type Props = {
  posts: PostDetails[];
};

export default function BlogList({ posts }: Props): JSX.Element {
  return (
    <Layout>
      <div className="columns is-multiline">
        {posts.map(({ title, slug }) => (
          <div key={slug} className="column is-one-third">
            <Link href={`/post/${slug}`}>
              <a>{title}</a>
            </Link>
          </div>
        ))}
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

  return { props: { posts: posts } };
};
