import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import MarkdownParser from "../../components/MarkdownParser";
import PostCard from "../../components/posts/PostCard";
import SocialShare from "../../components/posts/SocialShare";
import TagGroup from "../../components/posts/TagGroup";
import {
  FULL_PATH,
  getPostBySlug,
  getRelatedPosts,
} from "../../lib/postsHelper";

type PostProps = {
  meta: PostMeta;
  main: Post;
  related: Post[];
};

export default function Post({ meta, main, related }: PostProps): JSX.Element {
  return (
    <>
      <Image
        width={960}
        height={540}
        className="bsa-post-img"
        src={main.thumbnail || "https://via.placeholder.com/940x534.jpg"}
        alt={main.thumbnailAlt}
      />
      <h1 className="mb-2">{main.title}</h1>
      <div className="pb-4">
        <p className="mb-2">{main.formattedDate} &middot; Brittani S Avery</p>
        <TagGroup tags={main.tags} />
        <SocialShare url={meta.url} title={main.title} />
      </div>
      <MarkdownParser className="bsa-post-content" content={main.content} />
      <div className="mt-5">
        <SocialShare url={meta.url} title={main.title} />
      </div>
      <h2>Related Posts</h2>
      <p>
        If you enjoyed this post, check these related posts. Or better yet, join
        my{" "}
        <Link href="/newsletter">
          <a className="has-text-weight-semibold">newsletter</a>
        </Link>{" "}
        to get updates right to your inbox!
      </p>
      <div className="columns">
        {related.map((post) => (
          <div key={post.title} className="column is-half">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(FULL_PATH);

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const post = await getPostBySlug(Array.isArray(slug) ? slug[0] : slug);
  const meta: PostMeta = {
    title: post.title,
    description: post.meta?.description || post.description,
    publishDate: post.publishDate,
    type: "article",
    url: `${process.env.WEBSITE}/post/${post.slug}`,
    thumbnail: process.env.WEBSITE + post.thumbnail,
  };
  const related = await getRelatedPosts(post);

  return {
    props: { meta: meta, main: post, related: related },
  };
};
