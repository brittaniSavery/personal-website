import clsx from "clsx";
import { Feed } from "feed";
import fs from "fs";
import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import copyright from "../lib/copyright";
import { getPostsByDate } from "../lib/postsHelper";

type BlogProps = {
  posts: Post[];
  tags: string[];
  meta: GeneralMeta;
};

export default function Blog({ posts, tags, meta }: BlogProps): JSX.Element {
  const router = useRouter();
  const { tag, page } = router.query;

  const selectedTag = tag as string;
  const selectedPage = Number(page as string) || 1;
  const pageCount = 10;
  const postEnd = selectedPage * pageCount;
  const postStart = postEnd - pageCount;
  const totalSection = posts.filter(
    (post) => !selectedTag || post.tags.includes(selectedTag)
  );
  const pageSection = totalSection.slice(postStart, postEnd);

  return (
    <Layout meta={meta}>
      <h1>Blog</h1>
      <div className="bulma-tags are-medium">
        <Link href="/blog">
          <a className={clsx("bulma-tag", { "is-primary": !selectedTag })}>
            all posts
          </a>
        </Link>
        {tags.sort().map((tag) => (
          <Link key={tag} href={`/blog?tag=${tag}`}>
            <a
              className={clsx("bulma-tag", {
                "is-primary": selectedTag === tag,
              })}
            >
              {tag}
            </a>
          </Link>
        ))}
      </div>
      <div className="columns is-multiline">
        {pageSection.map((post) => (
          <div key={post.title} className="column is-half">
            <PostCard post={post} />
          </div>
        ))}
      </div>
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <div className="pagination-list">
          {Array(Math.ceil(totalSection.length / pageCount))
            .fill(1)
            .map((a, i) => {
              const page = a + i;
              const isCurrent = page === selectedPage;
              return (
                <div key={`page-${page}`}>
                  <Link
                    href={`/blog?page=${page}${
                      selectedTag ? `&tag=${tag}` : ""
                    }`}
                  >
                    <a
                      aria-label={`${!isCurrent && "Go to "} Page ${page}`}
                      className={clsx("pagination-link", {
                        "is-current": isCurrent,
                      })}
                    >
                      {page}
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
      </nav>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const meta: GeneralMeta = {
    title: "Blog",
    url: `${process.env.WEBSITE}/blog`,
    type: "website",
    description:
      "The thoughts and ramblings of Brittani S Avery on her code, writings, and much more.",
  };

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
      description: post.description,
      content: post.content,
      //image: post.thumbnail,
    });

    post.tags.forEach((tag) => tags.add(tag));
  });

  fs.writeFileSync(`${process.cwd()}/public/feed.xml`, feed.rss2());

  return { props: { posts: posts, tags: [...tags].sort(), meta: meta } };
};
