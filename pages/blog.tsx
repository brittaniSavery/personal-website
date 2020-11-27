import fs from "fs";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { FULL_PATH, getPostsByDate } from "../lib/post";

type Props = {
  posts: PostDetails[];
};

export default function BlogList({ posts }: Props): JSX.Element {
  return (
    <Layout>
      <h1>Blog</h1>
      <div className="columns is-multiline">
        {posts.map((post) => (
          <div key={post.title} className="column is-half">
            <Link href={`/post/${post.slug}`}>
              <a>
                <PostCard post={post} />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(FULL_PATH);
  return { props: { posts: await getPostsByDate(files) } };
};
