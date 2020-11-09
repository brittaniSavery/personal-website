import React from "react";
import fs from "fs";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { getPosts, MAIN_DIRECTORY, sortPostsByDate } from "../lib/post";

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
  const files = fs.readdirSync(MAIN_DIRECTORY);
  const posts = await getPosts(files);
  posts.sort((a, b) => sortPostsByDate(a, b));

  return { props: { posts: posts } };
};
